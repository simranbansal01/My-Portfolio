import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import ProjectRow from './ProjectRow'

export default function Work() {
  return (
    <section id="work" className="relative bg-cream px-5 pb-8 pt-24 sm:px-8 sm:pt-32">
      <div className="mb-16 flex items-end justify-between sm:mb-24">
        <h2 className="font-display text-[11vw] italic leading-none text-ink sm:text-6xl md:text-7xl">Work</h2>
        <p className="hidden max-w-[14rem] text-right text-sm text-ink/50 sm:block">
          A handful of things I&rsquo;ve built, shaped or rescued. Click one to go in deeper.
        </p>
      </div>

      {projects.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <Link
        to="/experiments"
        className="group relative block border-t border-b border-ink/15 py-8 sm:py-12"
      >
        <div className="flex items-baseline gap-4 sm:gap-8">
          <span className="text-xs text-ink/40 sm:text-sm">05</span>
          <h3 className="font-display text-[9vw] italic leading-none text-ink transition-colors duration-300 group-hover:text-rust sm:text-6xl md:text-7xl">
            Experiments
          </h3>
        </div>
        <p className="mt-4 max-w-md text-sm text-ink/60 sm:ml-16">
          Smaller ideas, prototypes, concepts and random things I&rsquo;ve built.
        </p>
      </Link>
    </section>
  )
}
