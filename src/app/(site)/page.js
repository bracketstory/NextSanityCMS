"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Reveal from '../../components/Reveal';
import { SiAirbnb, SiStripe, SiCoinbase, SiDoordash } from 'react-icons/si';
import { client } from '../../lib/sanityClient';

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

export default function Home() {
  const [companies, setCompanies] = useState(fallbackCompanies);
  const [criteria, setCriteria] = useState(fallbackCriteria);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    client.fetch(`{
      "fetchedCompanies": *[_type == "company"] | order(order asc, _createdAt asc) {name, iconName, color},
      "fetchedCriteria": *[_type == "criteria"] | order(order asc, _createdAt asc) {title, description}
    }`)
      .then(({ fetchedCompanies, fetchedCriteria }) => {
        if (fetchedCompanies && fetchedCompanies.length > 0) setCompanies(fetchedCompanies);
        if (fetchedCriteria && fetchedCriteria.length > 0) setCriteria(fetchedCriteria);
      })
      .catch(console.error); // Silently fallback on failure
  }, []);
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <Reveal delay={0.1} className="inline-block border border-brand-500/20 bg-brand-50 text-brand-600 px-5 py-2 rounded-full text-sm font-bold mb-6">
                W27 Applications Open • Deadline: Sept 15
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 text-gray-900">
                  We fund the <br />
                  <span className="text-brand-500">outliers.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                  SampleVC TestFunds LLC is a startup fund and program. Since 2005, we have invested in 4,000+ companies including Stripe, Airbnb, and DoorDash.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="flex flex-wrap gap-4">
                <Link href="/apply" className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-0.5">
                  Apply for Winter 2027
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.5} className="hidden lg:block">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">The Standard Deal</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">$500,000 Investment</div>
                      <div className="text-gray-600">On an MFN SAFE. No complex terms, no board seats required.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">7% Equity</div>
                      <div className="text-gray-600">Standard post-money valuation cap structure used across all deals.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">12-Week Program</div>
                      <div className="text-gray-600">Intense mentorship, weekly dinners, culminating in a global Demo Day.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            <Reveal delay={0}>
              <div className="text-4xl md:text-6xl font-black text-gray-900 mb-2">4,000<span className="text-brand-500">+</span></div>
              <div className="text-gray-500 font-medium">Funded Startups</div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-4xl md:text-6xl font-black text-gray-900 mb-2">$600<span className="text-brand-500">B</span></div>
              <div className="text-gray-500 font-medium">Combined Valuation</div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-4xl md:text-6xl font-black text-gray-900 mb-2">150<span className="text-brand-500">+</span></div>
              <div className="text-gray-500 font-medium">Billion-Dollar Cos</div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-4xl md:text-6xl font-black text-gray-900 mb-2">90<span className="text-brand-500">+</span></div>
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

      {/* Video */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal className="inline-block border border-brand-500/20 bg-brand-50 text-brand-600 px-5 py-2 rounded-full text-sm font-bold mb-6">
            Inside the Program
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Hear from the outliers.</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See what it takes to build a category-defining company during our intense 12-week accelerator. YCombinator has done an amazing video which we follow closely, and it will undeniably help anyone who is starting a startup.
            </p>
          </Reveal>
          
          <Reveal delay={0.2} className="relative aspect-video bg-gray-50 border border-gray-200 p-2 md:p-4 rounded-3xl">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-black">
              {isMounted && <iframe className="w-full h-full" id="yt-player" src={`https://www.youtube-nocookie.com/embed/zBUhQPPS9AY?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&autoplay=0&origin=${window.location.origin}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
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

          <div className="grid md:grid-cols-4 gap-8">
            <Reveal delay={0} className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 mb-4 overflow-hidden rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Michael Chen</h3>
              <p className="text-brand-600 text-sm font-medium">Managing Partner</p>
              <p className="text-xs text-gray-500 mt-2">ex-Founder of DataScale (Acq. by Google)</p>
            </Reveal>
            
            <Reveal delay={0.1} className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 mb-4 overflow-hidden rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Sarah Jenkins</h3>
              <p className="text-brand-600 text-sm font-medium">Group Partner</p>
              <p className="text-xs text-gray-500 mt-2">ex-CEO of HealthSync</p>
            </Reveal>

            <Reveal delay={0.2} className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 mb-4 overflow-hidden rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">David Osei</h3>
              <p className="text-brand-600 text-sm font-medium">Group Partner</p>
              <p className="text-xs text-gray-500 mt-2">ex-CTO of FinFront</p>
            </Reveal>

            <Reveal delay={0.3} className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 mb-4 overflow-hidden rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Elena Rostova</h3>
              <p className="text-brand-600 text-sm font-medium">Visiting Partner</p>
              <p className="text-xs text-gray-500 mt-2">Founder of AI Labs</p>
            </Reveal>
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
