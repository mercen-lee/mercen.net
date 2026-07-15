import { loadPortfolio } from '../lib/content';
import { generateResumePdf } from '../lib/resume-pdf';

export const prerender = true;

export async function GET(): Promise<Response> {
  const portfolio = await loadPortfolio('ko');
  const pdf = await generateResumePdf(portfolio, 'ko');

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Disposition': 'inline; filename="seokho-lee-resume.pdf"',
      'Content-Type': 'application/pdf',
    },
  });
}
