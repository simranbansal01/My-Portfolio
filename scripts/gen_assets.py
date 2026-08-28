"""Generates the cutout sticker + marquee badge PNGs used by the portfolio.

Pure stdlib: shapes are signed distance functions, sampled with analytic
anti-aliasing, then written out as RGBA PNGs. Run with:  python3 scripts/gen_assets.py
"""

import math
import os
import struct
import zlib

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
STICKER_DIR = os.path.join(ROOT, "src", "assets", "stickers")
BADGE_DIR = os.path.join(ROOT, "src", "assets", "badges")

INK = (24, 22, 20)
CREAM = (247, 239, 226)
PAPER = (232, 220, 200)
RED = (226, 82, 59)
MUSTARD = (233, 185, 73)
TEAL = (47, 111, 107)
VIOLET = (124, 108, 224)
OLIVE = (110, 139, 61)
SKY = (128, 176, 214)


# ---------------------------------------------------------------- canvas ----

class Canvas:
    def __init__(self, w, h):
        self.w = w
        self.h = h
        self.px = [[0.0, 0.0, 0.0, 0.0] for _ in range(w * h)]

    def paint(self, sdf, color, clip=None, alpha=1.0, softness=0.5):
        w, h = self.w, self.h
        r, g, b = (c / 255.0 for c in color)
        for y in range(h):
            fy = y + 0.5
            row = y * w
            for x in range(w):
                d = sdf(x + 0.5, fy)
                if d > softness:
                    continue
                cov = softness - d
                if cov > 1.0:
                    cov = 1.0
                cov *= alpha
                if clip is not None:
                    cov *= clip[row + x]
                    if cov <= 0.0:
                        continue
                p = self.px[row + x]
                ia = 1.0 - cov
                p[0] = r * cov + p[0] * ia
                p[1] = g * cov + p[1] * ia
                p[2] = b * cov + p[2] * ia
                p[3] = cov + p[3] * ia

    def mask(self, sdf):
        out = [0.0] * (self.w * self.h)
        for y in range(self.h):
            fy = y + 0.5
            row = y * self.w
            for x in range(self.w):
                cov = 0.5 - sdf(x + 0.5, fy)
                out[row + x] = 0.0 if cov <= 0.0 else (1.0 if cov >= 1.0 else cov)
        return out

    def png_bytes(self):
        raw = bytearray()
        for y in range(self.h):
            raw.append(0)
            row = y * self.w
            for x in range(self.w):
                p = self.px[row + x]
                a = p[3]
                if a <= 0.0:
                    raw += b"\x00\x00\x00\x00"
                    continue
                raw.append(min(255, max(0, int(p[0] / a * 255 + 0.5))))
                raw.append(min(255, max(0, int(p[1] / a * 255 + 0.5))))
                raw.append(min(255, max(0, int(p[2] / a * 255 + 0.5))))
                raw.append(min(255, max(0, int(a * 255 + 0.5))))

        def chunk(tag, data):
            return (struct.pack(">I", len(data)) + tag + data
                    + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

        head = struct.pack(">IIBBBBB", self.w, self.h, 8, 6, 0, 0, 0)
        return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", head)
                + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b""))


def write(canvas, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as fh:
        fh.write(canvas.png_bytes())
    print("wrote", os.path.relpath(path, ROOT), len(canvas.px))


# ------------------------------------------------------------------ sdfs ----

def circle(cx, cy, r):
    return lambda x, y: math.hypot(x - cx, y - cy) - r


def ring(cx, cy, r, t):
    return lambda x, y: abs(math.hypot(x - cx, y - cy) - r) - t * 0.5


def box(cx, cy, hw, hh, radius=0.0, angle=0.0):
    ca, sa = math.cos(-angle), math.sin(-angle)

    def f(x, y):
        dx, dy = x - cx, y - cy
        rx, ry = dx * ca - dy * sa, dx * sa + dy * ca
        qx, qy = abs(rx) - (hw - radius), abs(ry) - (hh - radius)
        outside = math.hypot(max(qx, 0.0), max(qy, 0.0))
        return outside + min(max(qx, qy), 0.0) - radius

    return f


def capsule(x1, y1, x2, y2, r):
    vx, vy = x2 - x1, y2 - y1
    vv = vx * vx + vy * vy or 1e-6

    def f(x, y):
        t = ((x - x1) * vx + (y - y1) * vy) / vv
        t = 0.0 if t < 0.0 else (1.0 if t > 1.0 else t)
        return math.hypot(x - (x1 + vx * t), y - (y1 + vy * t)) - r

    return f


def triangle(p0, p1, p2):
    pts = [p0, p1, p2]
    area = ((p1[0] - p0[0]) * (p2[1] - p0[1]) - (p1[1] - p0[1]) * (p2[0] - p0[0]))
    if area < 0:
        pts.reverse()

    def f(x, y):
        d = -1e9
        for i in range(3):
            ax, ay = pts[i]
            bx, by = pts[(i + 1) % 3]
            ex, ey = bx - ax, by - ay
            n = math.hypot(ex, ey) or 1e-6
            d = max(d, ((x - ax) * ey - (y - ay) * ex) / n)
        return d

    return f


def burst(cx, cy, r, spikes, depth):
    def f(x, y):
        dx, dy = x - cx, y - cy
        a = math.atan2(dy, dx)
        return math.hypot(dx, dy) - (r + depth * math.cos(spikes * a))

    return f


def union(*fs):
    return lambda x, y: min(f(x, y) for f in fs)


def offset(f, k):
    return lambda x, y: f(x, y) - k


def subtract(a, b):
    return lambda x, y: max(a(x, y), -b(x, y))


# -------------------------------------------------------------- stickers ----

CUT = 13  # die-cut cream border width


def sticker(size, silhouette, fill, details):
    c = Canvas(size, size)
    c.paint(offset(silhouette, CUT + 3), (198, 186, 168), alpha=0.55)
    c.paint(offset(silhouette, CUT), CREAM)
    c.paint(silhouette, fill)
    inside = c.mask(silhouette)
    for sdf, color, alpha in details:
        c.paint(sdf, color, clip=inside, alpha=alpha)
    return c


def sticker_ledger():
    s = 300
    sil = box(150, 150, 92, 108, radius=10, angle=math.radians(-8))
    rows = []
    for i in range(5):
        y = 74 + i * 34
        rows.append((box(150, y, 62 - (18 if i == 4 else 0), 5, radius=4,
                         angle=math.radians(-8)), INK, 0.85))
    rows.append((box(150, 46, 66, 7, radius=5, angle=math.radians(-8)), RED, 1.0))
    return sticker(s, sil, CREAM, rows)


def sticker_coin():
    s = 260
    sil = circle(130, 130, 96)
    det = [
        (ring(130, 130, 74, 7), CREAM, 1.0),
        (capsule(104, 96, 104, 164, 7), CREAM, 1.0),
        (capsule(104, 96, 148, 96, 7), CREAM, 1.0),
        (capsule(104, 126, 148, 126, 7), CREAM, 1.0),
        (capsule(148, 96, 104, 130, 7), CREAM, 0.0),
        (capsule(104, 130, 152, 168, 7), CREAM, 1.0),
    ]
    return sticker(s, sil, MUSTARD, det)


def sticker_chart():
    s = 280
    sil = box(140, 140, 104, 84, radius=18, angle=math.radians(6))
    bars = []
    heights = [34, 62, 46, 84]
    for i, hgt in enumerate(heights):
        x = 86 + i * 36
        bars.append((box(x, 186 - hgt / 2, 12, hgt / 2, radius=6,
                         angle=math.radians(6)), CREAM, 1.0))
    bars.append((capsule(76, 90, 210, 66, 5), MUSTARD, 1.0))
    return sticker(s, sil, TEAL, bars)


def sticker_spark():
    s = 260
    arms = []
    for i in range(6):
        a = math.pi * i / 6
        dx, dy = math.cos(a) * 82, math.sin(a) * 82
        arms.append(capsule(130 - dx, 130 - dy, 130 + dx, 130 + dy, 17))
    sil = union(*arms)
    return sticker(s, sil, VIOLET, [(circle(130, 130, 26), CREAM, 1.0)])


def sticker_stamp():
    s = 300
    sil = burst(150, 150, 96, 16, 9)
    det = [
        (ring(150, 150, 70, 6), CREAM, 1.0),
        (capsule(112, 152, 140, 180, 11), CREAM, 1.0),
        (capsule(140, 180, 192, 118, 11), CREAM, 1.0),
    ]
    return sticker(s, sil, RED, det)


def sticker_note():
    s = 280
    sil = box(140, 140, 96, 96, radius=8, angle=math.radians(7))
    det = [
        (triangle((214, 214), (214, 150), (150, 214)), (214, 174, 60), 1.0),
        (box(140, 84, 62, 6, radius=4, angle=math.radians(7)), INK, 0.8),
        (box(126, 116, 48, 6, radius=4, angle=math.radians(7)), INK, 0.8),
        (box(132, 148, 54, 6, radius=4, angle=math.radians(7)), INK, 0.8),
    ]
    return sticker(s, sil, MUSTARD, det)


def sticker_arrow():
    s = 260
    sil = union(
        capsule(56, 150, 168, 150, 26),
        triangle((150, 100), (150, 200), (222, 150)),
    )
    det = [(capsule(84, 150, 140, 150, 7), CREAM, 1.0)]
    return sticker(s, sil, OLIVE, det)


STICKERS = {
    "ledger": sticker_ledger,
    "coin": sticker_coin,
    "chart": sticker_chart,
    "spark": sticker_spark,
    "stamp": sticker_stamp,
    "note": sticker_note,
    "arrow": sticker_arrow,
}


# ---------------------------------------------------------------- badges ----

BS = 168
BC = BS / 2


def badge(bg, details):
    c = Canvas(BS, BS)
    c.paint(circle(BC, BC, 80), CREAM)
    c.paint(circle(BC, BC, 74), bg)
    inside = c.mask(circle(BC, BC, 74))
    for sdf, color, alpha in details:
        c.paint(sdf, color, clip=inside, alpha=alpha)
    return c


def badge_rings(bg):
    return badge(bg, [(ring(BC, BC, 40, 8), CREAM, 1.0), (circle(BC, BC, 16), CREAM, 1.0)])


def badge_bars(bg):
    det = []
    for i, hgt in enumerate((26, 46, 34, 56)):
        det.append((box(BC - 33 + i * 22, BC + 30 - hgt / 2, 7, hgt / 2, radius=5), CREAM, 1.0))
    return badge(bg, det)


def badge_wave(bg):
    det = []
    pts = [(BC - 44 + i * 11, BC + 22 * math.sin(i * 0.9)) for i in range(9)]
    for a, b in zip(pts, pts[1:]):
        det.append((capsule(a[0], a[1], b[0], b[1], 6), CREAM, 1.0))
    return badge(bg, det)


def badge_grid(bg):
    det = []
    for r in range(3):
        for col in range(3):
            det.append((circle(BC - 30 + col * 30, BC - 30 + r * 30, 9), CREAM, 1.0))
    return badge(bg, det)


def badge_check(bg):
    return badge(bg, [
        (capsule(BC - 30, BC + 2, BC - 8, BC + 26, 9), CREAM, 1.0),
        (capsule(BC - 8, BC + 26, BC + 32, BC - 28, 9), CREAM, 1.0),
    ])


def badge_arrows(bg):
    return badge(bg, [
        (capsule(BC - 34, BC - 16, BC + 22, BC - 16, 6), CREAM, 1.0),
        (triangle((BC + 14, BC - 32), (BC + 14, BC), (BC + 38, BC - 16)), CREAM, 1.0),
        (capsule(BC + 34, BC + 18, BC - 22, BC + 18, 6), CREAM, 1.0),
        (triangle((BC - 14, BC + 2), (BC - 14, BC + 34), (BC - 38, BC + 18)), CREAM, 1.0),
    ])


def badge_stack(bg):
    det = []
    for i in range(3):
        det.append((box(BC, BC - 26 + i * 26, 40, 8, radius=6), CREAM, 1.0))
    return badge(bg, det)


def badge_burst(bg):
    return badge(bg, [(burst(BC, BC, 34, 12, 8), CREAM, 1.0), (circle(BC, BC, 14), bg, 1.0)])


BADGES = [
    ("netsuite", badge_rings, TEAL),
    ("razorpay", badge_wave, VIOLET),
    ("asc606", badge_check, OLIVE),
    ("sox", badge_burst, RED),
    ("jde", badge_stack, INK),
    ("upi", badge_arrows, SKY),
    ("gaap", badge_grid, MUSTARD),
    ("automation", badge_bars, TEAL),
    ("modeling", badge_bars, VIOLET),
    ("controls", badge_rings, RED),
]


def main():
    for name, fn in STICKERS.items():
        write(fn(), os.path.join(STICKER_DIR, name + ".png"))
    for name, fn, color in BADGES:
        write(fn(color), os.path.join(BADGE_DIR, name + ".png"))


if __name__ == "__main__":
    main()
