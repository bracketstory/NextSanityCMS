"use client";
import { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaBrain, FaGlobe } from 'react-icons/fa';
import Reveal from '../../../components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../../../lib/sanityClient';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <h3 className="font-bold text-gray-900">{question}</h3>
        <motion.svg 
          animate={{ rotate: isOpen ? 45 : 0 }} 
          className="w-5 h-5 text-gray-500" 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </motion.svg>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 bg-white text-gray-600"
          >
            <div className="py-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fallbackFaqs = [
  {
    question: "Do I need a co-founder?",
    answer: "No. While we prefer teams of 2 or 3, we have successfully funded and supported hundreds of solo founders."
  },
  {
    question: "Is the program remote?",
    answer: "We strongly encourage founders to move to San Francisco for the duration of the 12-week program. The serendipity of in-person interactions is incredibly valuable."
  },
  {
    question: "What if I just have an idea?",
    answer: "That's perfectly fine. We fund startups at all stages, from literally just an idea on a napkin to companies with millions in revenue."
  },
  {
    question: "When will I hear back?",
    answer: "If you apply by the deadline, you will receive a decision (either an interview invite or a rejection) by October 15th."
  },
  {
    question: "Do I need to live in the US?",
    answer: "No, we fund companies from anywhere in the world. However, you must be able to attend weekly sessions and events virtually in Pacific Time."
  }
];

const fallbackDeals = [
  { title: "$500,000 Investment", description: "Standard terms: 7% equity on a post-money SAFE. No complex terms.", iconName: "FaMoneyBillWave" },
  { title: "Intense Mentorship", description: "12 weeks of direct guidance from partners who have built billion-dollar companies.", iconName: "FaBrain" },
  { title: "Global Network", description: "Instant access to 4,000+ founders. The most powerful network in tech.", iconName: "FaGlobe" }
];

const iconMap = {
  FaMoneyBillWave,
  FaBrain,
  FaGlobe
};

export default function Apply() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [deals, setDeals] = useState(fallbackDeals);

  useEffect(() => {
    client.fetch(`{
      "fetchedFaqs": *[_type == "faq"] | order(order asc, _createdAt asc),
      "fetchedDeals": *[_type == "deal"] | order(order asc, _createdAt asc)
    }`).then(({ fetchedFaqs, fetchedDeals }) => {
      if (fetchedFaqs && fetchedFaqs.length > 0) setFaqs(fetchedFaqs);
      if (fetchedDeals && fetchedDeals.length > 0) setDeals(fetchedDeals);
    }).catch(console.error); // Silently fallback on failure
  }, []);

  return (
    <div className="bg-[#fafafa]">
      {/* Header / Hero */}
      <header className="pt-32 pb-16 bg-white border-b border-gray-200 text-center px-6">
        <Reveal className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900">Apply for Winter 2027</h1>
          <p className="text-xl text-gray-600 mb-8">The deadline to apply is September 15th at 8:00 PM PT. Late applications will be reviewed on a rolling basis.</p>
        </Reveal>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-16 relative">
        
        {/* Left Column: Info & FAQs */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Benefits / Deal */}
          <Reveal>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">The Deal</h2>
            <ul className="space-y-6">
              {deals.map((deal, i) => {
                const IconComponent = iconMap[deal.iconName] || FaGlobe;
                return (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{deal.title}</div>
                      <div className="text-gray-600">{deal.description}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* FAQs */}
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-7" id="form">
          <Reveal delay={0.2} className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Thanks for applying!</h2>
                <p className="text-gray-600 text-lg">We will get back to you.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Enrollment Form</h2>
                <p className="text-gray-500 mb-8">Please fill out all required fields. We read every single application.</p>
                
                <form action="#" method="POST" className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                  
                  {/* Section: Founder */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">1. Founder Profile</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                        <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                        <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile</label>
                      <input type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                    </div>
                  </div>

                  {/* Section: Company */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">2. Startup Details</h3>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name *</label>
                      <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Company Website (if any)</label>
                      <input type="url" placeholder="https://" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">What is your company going to make? *</label>
                      <p className="text-xs text-gray-500 mb-2">Describe what you do in 50 words or less.</p>
                      <textarea required rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors"></textarea>
                    </div>
                  </div>

                  {/* Section: Pitch */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">3. The Pitch</h3>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Why did you pick this idea to work on? *</label>
                      <textarea required rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">How do you know people need what you're making? *</label>
                      <textarea required rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Video Pitch URL (Optional)</label>
                      <p className="text-xs text-gray-500 mb-2">Unlisted YouTube link. Max 1 minute long.</p>
                      <input type="url" placeholder="https://youtube.com/..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-0.5">
                      Submit Application
                    </button>
                  </div>

                </form>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
