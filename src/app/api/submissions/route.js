import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const submissionsFile = path.join(process.cwd(), 'data', 'submissions.json');
const requiredFields = ['firstName', 'lastName', 'email', 'companyName', 'companyDescription', 'whyIdea', 'customerNeed'];

async function readSubmissions() {
  try {
    const contents = await readFile(submissionsFile, 'utf8');
    return JSON.parse(contents);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return [];
  }
}

export async function GET() {
  const submissions = await readSubmissions();
  return Response.json({ submissions });
}

export async function POST(request) {
  const body = await request.json();
  const missingFields = requiredFields.filter((field) => !String(body[field] || '').trim());

  if (missingFields.length > 0) {
    return Response.json({ error: 'Please complete all required fields.', missingFields }, { status: 400 });
  }

  const submission = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    status: 'New',
    firstName: String(body.firstName).trim(),
    lastName: String(body.lastName).trim(),
    email: String(body.email).trim(),
    linkedin: String(body.linkedin || '').trim(),
    companyName: String(body.companyName).trim(),
    companyWebsite: String(body.companyWebsite || '').trim(),
    companyDescription: String(body.companyDescription).trim(),
    whyIdea: String(body.whyIdea).trim(),
    customerNeed: String(body.customerNeed).trim(),
    videoPitch: String(body.videoPitch || '').trim(),
  };

  const submissions = await readSubmissions();
  submissions.push(submission);
  await mkdir(path.dirname(submissionsFile), { recursive: true });
  await writeFile(submissionsFile, `${JSON.stringify(submissions, null, 2)}\n`, 'utf8');

  return Response.json({ submission }, { status: 201 });
}