import { readFile } from 'node:fs/promises';
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

  return Response.json({
    status: 'accepted',
    message: 'Demo accepted. No application data was stored.',
  });
}