"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaBriefcase, FaEnvelope, FaExternalLinkAlt, FaSearch, FaUsers } from 'react-icons/fa';
import Reveal from '../../../components/Reveal';

const fields = [
  ['companyDescription', 'What they are building'],
  ['whyIdea', 'Why this idea'],
  ['customerNeed', 'Customer need'],
];

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function Detail({ label, value }) {
  return (
    <div className="border-t border-gray-100 pt-4">
      <dt className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{label}</dt>
      <dd className="whitespace-pre-line leading-relaxed text-gray-700">{value || 'Not provided'}</dd>
    </div>
  );
}

function SubmissionCard({ submission, isOpen, onToggle }) {
  return (
    <article className={`overflow-hidden rounded-3xl border bg-white transition-shadow ${isOpen ? 'border-brand-500/40 shadow-lg shadow-brand-500/5' : 'border-gray-200 shadow-sm'}`}>
      <button type="button" onClick={onToggle} className="w-full p-6 text-left sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-lg font-black text-brand-600">
              {submission.firstName[0]}{submission.lastName[0]}
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{submission.firstName} {submission.lastName}</h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600">{submission.status}</span>
              </div>
              <p className="flex items-center gap-2 text-sm text-gray-500"><FaBriefcase className="text-brand-500" /> {submission.companyName}</p>
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <p className="text-sm font-semibold text-gray-700">{formatDate(submission.submittedAt)}</p>
            <p className="mt-1 text-xs text-gray-400">{isOpen ? 'Collapse details' : 'View full application'}</p>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 bg-[#fafafa] px-6 pb-7 pt-6 sm:px-7">
          <div className="mb-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={`mailto:${submission.email}`} className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-500"><FaEnvelope className="text-brand-500" /> {submission.email}</a>
            {submission.linkedin && <a href={submission.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-500"><FaExternalLinkAlt className="text-brand-500" /> LinkedIn</a>}
            {submission.companyWebsite && <a href={submission.companyWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-500"><FaExternalLinkAlt className="text-brand-500" /> Company website</a>}
          </div>
          <dl className="grid gap-6 md:grid-cols-3">
            {fields.map(([key, label]) => <Detail key={key} label={label} value={submission[key]} />)}
          </dl>
          {submission.videoPitch && <div className="mt-6"><Detail label="Video pitch" value={submission.videoPitch} /></div>}
          <p className="mt-7 border-t border-gray-200 pt-4 text-xs text-gray-400">Submission ID: {submission.id}</p>
        </div>
      )}
    </article>
  );
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/submissions', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load submissions.');
        return response.json();
      })
      .then(({ submissions: savedSubmissions }) => setSubmissions(savedSubmissions.reverse()))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return submissions;
    return submissions.filter((submission) => [submission.firstName, submission.lastName, submission.companyName, submission.email].some((value) => value.toLowerCase().includes(normalizedQuery)));
  }, [query, submissions]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-gray-200 bg-white px-6 pb-14 pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-brand-500"><FaArrowLeft /> Back to site</Link>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-500">W27 intake</p>
                <h1 className="text-5xl font-black tracking-tight text-gray-900 md:text-6xl">Submissions<span className="text-brand-500">.</span></h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">Every founder application, in one calm place. Review the signal, then open the full story.</p>
              </div>
              <Link href="/apply" className="inline-flex w-fit items-center rounded-full bg-brand-500 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-600">New application</Link>
            </div>
          </Reveal>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><FaUsers /></div><p className="text-3xl font-black text-gray-900">{submissions.length}</p><p className="mt-1 text-sm font-medium text-gray-500">Total applications</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /></div><p className="text-3xl font-black text-gray-900">{submissions.filter(({ status }) => status === 'New').length}</p><p className="mt-1 text-sm font-medium text-gray-500">Ready for review</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:col-span-2 lg:col-span-1"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600"><FaBriefcase /></div><p className="text-3xl font-black text-gray-900">{new Set(submissions.map(({ companyName }) => companyName)).size}</p><p className="mt-1 text-sm font-medium text-gray-500">Companies represented</p></div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Applicant queue <span className="text-gray-400">({filteredSubmissions.length})</span></h2>
          <label className="relative block sm:w-72">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search applicants..." className="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900" />
          </label>
        </div>

        {isLoading && <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">Loading applications...</div>}
        {!isLoading && error && <div className="rounded-3xl border border-red-200 bg-red-50 p-12 text-center text-red-700">{error}</div>}
        {!isLoading && !error && filteredSubmissions.length === 0 && <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center"><p className="text-xl font-bold text-gray-900">{query ? 'No matching applications' : 'No applications yet'}</p><p className="mt-2 text-gray-500">{query ? 'Try a different name, company, or email.' : 'Submitted applications will appear here.'}</p></div>}
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} isOpen={openId === submission.id} onToggle={() => setOpenId(openId === submission.id ? null : submission.id)} />)}
        </div>
      </main>
    </div>
  );
}