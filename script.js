(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav glass background on scroll
  var nav = document.getElementById('nav');
  function updateNavBackground() {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  updateNavBackground();
  window.addEventListener('scroll', updateNavBackground, { passive: true });

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  function closeMobileNav() {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Nav scroll-spy
  var sections = document.querySelectorAll('main section[id]');
  var navLinkMap = {};
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    navLinkMap[link.getAttribute('href').slice(1)] = link;
  });

  if ('IntersectionObserver' in window) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinkMap).forEach(function (id) {
            navLinkMap[id].classList.remove('is-active');
          });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { spyObserver.observe(section); });
  }

  // Count-up metrics
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var value = Math.round(target * easeOutExpo(progress));
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var countEls = document.querySelectorAll('[data-count-to]');
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { countObserver.observe(el); });
  } else {
    countEls.forEach(animateCount);
  }

  // Timeline progress line
  var timeline = document.getElementById('timeline');
  var timelineProgress = document.getElementById('timelineProgress');
  var ticking = false;
  function updateTimelineProgress() {
    ticking = false;
    if (!timeline || !timelineProgress) return;
    var rect = timeline.getBoundingClientRect();
    var viewportMid = window.innerHeight * 0.6;
    var progress = (viewportMid - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    timelineProgress.style.height = (progress * 100) + '%';
  }
  function requestTimelineUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTimelineProgress);
    }
  }
  updateTimelineProgress();
  window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
  window.addEventListener('resize', requestTimelineUpdate);

  // Cursor glow (desktop only, respects reduced motion)
  var supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (supportsFinePointer && !reduceMotion) {
    var glow = document.getElementById('cursorGlow');
    var glowTicking = false;
    var lastX = 0, lastY = 0;
    document.addEventListener('mousemove', function (e) {
      lastX = e.clientX;
      lastY = e.clientY;
      glow.classList.add('is-active');
      if (!glowTicking) {
        glowTicking = true;
        requestAnimationFrame(function () {
          glow.style.transform = 'translate3d(' + lastX + 'px,' + lastY + 'px,0)';
          glowTicking = false;
        });
      }
    }, { passive: true });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('is-active');
    });
  }
})();
