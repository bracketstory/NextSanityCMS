"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../../components/Reveal';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SiAirbnb, SiStripe, SiCoinbase, SiDoordash } from 'react-icons/si';
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuQuote } from 'react-icons/lu';
import { client } from '../../lib/sanityClient';

function RollingMetric({ value, prefix = '', suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const formattedValue = value.toLocaleString('en-US');
  const digits = formattedValue.split('');

  return (
    <div ref={ref} className="mb-2 text-4xl font-black text-gray-900 md:text-6xl">
      <span className="inline-flex items-baseline tabular-nums" aria-hidden="true">
        {prefix}
        <span className="inline-flex">
          {digits.map((character, index) => {
            if (!/\d/.test(character)) {
              return <span key={`${character}-${index}`}>{character}</span>;
            }

            const targetRow = 10 + Number(character);
            const targetOffset = `-${(targetRow / 20) * 100}%`;

            return (
              <span key={`${character}-${index}`} className="inline-block h-[1em] overflow-hidden align-bottom">
                <motion.span
                  className="flex flex-col"
                  initial={{ y: '0%' }}
                  animate={isInView ? { y: targetOffset } : { y: '0%' }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 2.8,
                    delay: prefersReducedMotion ? 0 : delay + (digits.length - index - 1) * 0.12,
                    ease: [0.12, 0.8, 0.25, 1],
                  }}
                >
                  {Array.from({ length: 20 }, (_, digit) => (
                    <span key={digit} className="h-[1em] shrink-0 leading-none">{digit % 10}</span>
                  ))}
                </motion.span>
              </span>
            );
          })}
        </span>
        {suffix && <span className="text-brand-500">{suffix}</span>}
      </span>
      <span className="sr-only">{prefix}{formattedValue}{suffix}</span>
    </div>
  );
}

const fallbackCompanies = [
  { name: 'Airbnb', iconName: 'SiAirbnb', color: 'hover:text-[#FF5A5F]' },
  { name: 'Stripe', iconName: 'SiStripe', color: 'hover:text-[#008CDD]' },
  { name: 'Coinbase', iconName: 'SiCoinbase', color: 'hover:text-[#0052FF]' },
  { name: 'DoorDash', iconName: 'SiDoordash', color: 'hover:text-[#FF3008]' }
];

const fallbackCriteria = [
  { title: "Placeholder Title 1", description: "This is a placeholder description. Please add real content in the Sanity Studio." },
  { title: "Placeholder Title 2", description: "This is a placeholder description. Please add real content in the Sanity Studio." },
  { title: "Placeholder Title 3", description: "This is a placeholder description. Please add real content in the Sanity Studio." },
  { title: "Placeholder Title 4", description: "This is a placeholder description. Please add real content in the Sanity Studio." }
];

const iconMap = {
  SiAirbnb,
  SiStripe,
  SiCoinbase,
  SiDoordash
};

const founderStories = [
  {
    quote: 'The first check gave us room to stop pitching and start listening to the people who needed our product.',
    name: 'A founder building in climate',
    detail: 'Illustrative founder perspective',
    number: '01',
  },
  {
    quote: 'The best part was having other founders in the room who understood the messy middle, not just the milestones.',
    name: 'A founder building in healthcare',
    detail: 'Illustrative founder perspective',
    number: '02',
  },
  {
    quote: 'We left with sharper questions, a tighter product, and the confidence to keep going when the answers changed.',
    name: 'A founder building in software',
    detail: 'Illustrative founder perspective',
    number: '03',
  },
];

export default function Home() {
  const [companies, setCompanies] = useState(fallbackCompanies);
  const [criteria, setCriteria] = useState(fallbackCriteria);
  const [activeStory, setActiveStory] = useState(0);
  const [storyDirection, setStoryDirection] = useState('next');

  const changeStory = (direction) => {
    setStoryDirection(direction);
    setActiveStory((currentStory) => (
      currentStory + (direction === 'next' ? 1 : -1) + founderStories.length
    ) % founderStories.length);
  };

  useEffect(() => {
    client.fetch(`{
      "fetchedCompanies": *[_type == "company"] | order(order asc, _createdAt asc) {name, iconName, color},
      "fetchedCriteria": *[_type == "criteria"] | order(order asc, _createdAt asc) {title, description}
    }`)
      .then(({ fetchedCompanies, fetchedCriteria }) => {
        if (fetchedCompanies && fetchedCompanies.length > 0) setCompanies(fetchedCompanies);
        if (fetchedCriteria && fetchedCriteria.length > 0) setCriteria(fetchedCriteria);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-[#14231c] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 py-10 lg:min-h-[570px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-12">
            <div className="max-w-xl">
              <Reveal delay={0.1}>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Capital for the fearless</p>
                <p className="mb-6 inline-flex items-center gap-2 border border-brand-100/30 px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-100">
                  <span className="h-2 w-2 rounded-full bg-brand-500" /> W27 applications open · Deadline Sept 15
                </p>
                <h1 className="text-6xl font-black leading-[0.94] md:text-7xl">
                  We fund the<br />
                  <span className="font-serif font-normal italic text-brand-500">outliers.</span>
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/75 md:text-xl">
                  Since 2005, we have backed 4,000+ companies, including Stripe, Airbnb, and DoorDash. Bring us the idea you can&apos;t leave alone.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href="/apply" className="inline-flex min-h-14 items-center gap-3 bg-brand-500 px-6 font-bold text-white transition-colors hover:bg-brand-600">
                    Apply for Winter 2027 <LuArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                  <a href="#companies" className="inline-flex items-center gap-2 font-semibold text-white/80 transition-colors hover:text-white">
                    Explore our founders <LuArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <figure className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-[460px]">
                <Image
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
                  alt="A team of founders working through ideas together"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-center"
                />
                <figcaption className="absolute bottom-0 left-0 bg-[#14231c] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white">
                  Built together, from day one
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 border-t border-white/20 py-6">
            <div className="border-r border-white/20 pr-3 sm:pr-6">
              <p className="text-2xl font-black sm:text-3xl">$500K</p>
              <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">Initial investment</p>
            </div>
            <div className="border-r border-white/20 px-3 sm:px-6">
              <p className="text-2xl font-black sm:text-3xl">7%</p>
              <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">Standard equity</p>
            </div>
            <div className="pl-3 sm:pl-6">
              <p className="text-2xl font-black sm:text-3xl">12 weeks</p>
              <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">Founder program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            <Reveal delay={0}>
              <RollingMetric value={4000} suffix="+" />
              <div className="text-gray-500 font-medium">Funded Startups</div>
            </Reveal>
            <Reveal delay={0.1}>
              <RollingMetric value={600} prefix="$" suffix="B" delay={0.1} />
              <div className="text-gray-500 font-medium">Combined Valuation</div>
            </Reveal>
            <Reveal delay={0.2}>
              <RollingMetric value={150} suffix="+" delay={0.2} />
              <div className="text-gray-500 font-medium">Billion-Dollar Cos</div>
            </Reveal>
            <Reveal delay={0.3}>
              <RollingMetric value={90} suffix="+" delay={0.3} />
              <div className="text-gray-500 font-medium">Acquisitions</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portfolio / Marquee */}
      <section id="companies" className="py-24 overflow-hidden relative bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Backed by SampleVC</h2>
            <p className="text-gray-600">Our founders have built some of the most impactful companies of our generation.</p>
          </Reveal>
        </div>

        <div className="flex overflow-hidden relative w-full mb-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap gap-8 py-4 px-4">
            {[...companies, ...companies, ...companies].map((company, i) => {
              const IconComponent = iconMap[company.iconName] || SiAirbnb;
              return (
                <div key={i} className={`flex items-center justify-center gap-2 px-8 py-6 bg-white border border-gray-200 w-64 h-24 rounded-2xl text-gray-400 transition-colors duration-300 ${company.color}`}>
                  <IconComponent className="w-8 h-8 shrink-0" />
                  <span className="font-bold text-xl">{company.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Stories */}
      <section id="founder-stories" className="py-24 bg-[#18221d] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <p className="text-brand-100 text-sm font-bold uppercase tracking-[0.18em] mb-5">After the first check</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">The work is yours.<br /><span className="text-brand-300">You don&apos;t do it alone.</span></h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">A good early partner makes the hard weeks feel more navigable, and the next step a little clearer.</p>
            <p className="mt-8 text-xs leading-relaxed text-gray-400">Illustrative copy for layout preview. Replace with approved quotes from funded founders before publishing.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative min-h-[340px] border border-white/15 bg-white/[0.04] p-7 sm:p-10 md:p-12">
              <div key={activeStory} className={`founder-story-enter-${storyDirection}`}>
                <LuQuote aria-hidden="true" className="text-brand-300 mb-8" size={34} strokeWidth={1.5} />
                <blockquote aria-live="polite" className="min-h-36 text-2xl md:text-3xl font-semibold leading-snug">
                  &ldquo;{founderStories[activeStory].quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-white/15 pt-6">
                <div key={`founder-story-attribution-${activeStory}`} className={`founder-story-enter-${storyDirection}`}>
                  <p className="font-bold">{founderStories[activeStory].name}</p>
                  <p className="mt-1 text-sm text-gray-400">{founderStories[activeStory].detail}</p>
                </div>
                <div className="flex items-center gap-3" aria-label="Founder story controls">
                  <span className="mr-2 font-mono text-sm text-gray-400">{founderStories[activeStory].number} / 03</span>
                  <button type="button" onClick={() => changeStory('previous')} className="w-11 h-11 grid place-items-center border border-white/25 hover:bg-white/10 transition-colors" aria-label="Previous founder story">
                    <LuArrowLeft size={18} />
                  </button>
                  <button type="button" onClick={() => changeStory('next')} className="w-11 h-11 grid place-items-center bg-brand-500 hover:bg-brand-600 transition-colors" aria-label="Next founder story">
                    <LuArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal className="inline-block border border-brand-500/20 bg-brand-50 text-brand-600 px-5 py-2 rounded-full text-sm font-bold mb-6">
            Inside the Program
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Hear from the outliers.</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See what it takes to build a category-defining company during our intense 12-week accelerator. YCombinator has done an amazing video which we follow closely, and it will undeniably help anyone who&apos;s starting a startup.
            </p>
          </Reveal>
          
          <Reveal delay={0.2} className="relative aspect-video bg-gray-50 border border-gray-200 p-2 md:p-4 rounded-3xl">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-black">
              <iframe className="w-full h-full" id="yt-player" src="https://www.youtube-nocookie.com/embed/zBUhQPPS9AY?rel=0&modestbranding=1&playsinline=1&autoplay=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900">What we look for.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            {criteria.map((c, i) => (
              <Reveal delay={i * 0.1} key={i}>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-brand-500 rounded-l-md pl-4">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {c.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-[#fafafa] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900">The Program.</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Reveal delay={0}>
              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-brand-100">1</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Application & Interview</h3>
              <p className="text-gray-600 leading-relaxed">
                We review thousands of applications twice a year. If selected, you'll have a 10-minute intense interview with our partners. We fund about 1.5% of applicants.
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-brand-100">2</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3 Months of Intensity</h3>
              <p className="text-gray-600 leading-relaxed">
                Move to SF. We invest $500K. You spend 3 months building your product and talking to users. We host weekly dinners with industry legends and offer office hours on demand.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 border border-brand-600">3</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Demo Day</h3>
              <p className="text-gray-600 leading-relaxed">
                Present to a carefully selected, invite-only audience of top-tier investors. Our founders typically raise their seed rounds within weeks of presenting.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-[#fafafa] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Built by Founders.</h2>
            <p className="text-xl text-gray-600 max-w-2xl">Every partner at SampleVC has built, scaled, and exited a successful technology company.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Michael Chen', role: 'Managing Partner', background: 'Founder, DataScale · acquired by Google', image: 'photo-1560250097-0b93528c311a' },
              { name: 'Sarah Jenkins', role: 'Group Partner', background: 'Former CEO, HealthSync', image: 'photo-1573496359142-b8d87734a5a2' },
              { name: 'David Osei', role: 'Group Partner', background: 'Former CTO, FinFront', image: 'photo-1519085360753-af0119f7cbe7' },
              { name: 'Elena Rostova', role: 'Visiting Partner', background: 'Founder, AI Labs', image: 'photo-1580489944761-15a19d654956' },
            ].map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08}>
                <article className="group h-full bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-gray-900/5">
                  <div className="aspect-[4/4.5] overflow-hidden bg-gray-200 relative">
                    <img src={`https://images.unsplash.com/${member.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85`} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800">{member.role}</span>
                    <span className="absolute bottom-4 right-4 w-10 h-10 bg-brand-500 text-white grid place-items-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" aria-hidden="true"><LuArrowUpRight size={18} /></span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-900">{member.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{member.background}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section id="apply" className="py-24 bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white">Build the future.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-brand-50 mb-10 max-w-2xl mx-auto">
              Applications for the Winter 2027 batch are open. The deadline to apply is September 15th at 8PM PT.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/apply" className="inline-block bg-white hover:bg-gray-100 text-brand-600 px-10 py-5 rounded-full text-xl font-bold transition-all hover:scale-105">
              Apply to SampleVC W27
            </Link>
            <p className="mt-6 text-sm text-brand-100">Takes ~2 hours to complete. No intro required.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
