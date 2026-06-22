import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import type {
  CareerItem,
  EducationItem,
  PortfolioData,
  ProjectItem,
} from './content';

const require = createRequire(import.meta.url);
const SVGtoPDF = require('svg-to-pdfkit') as (
  doc: PDFKit.PDFDocument,
  svg: string,
  x: number,
  y: number,
  options?: { width?: number; height?: number; preserveAspectRatio?: string },
) => void;

const PAGE_MARGIN_X = 52;
const PAGE_MARGIN_TOP = 54;
const PAGE_MARGIN_BOTTOM = 48;
const TIMELINE_LEFT_WIDTH = 148;
const ENTRY_LEFT_WIDTH = 142;
const ENTRY_BODY_GAP = 28;
const ENTRY_MARKER_OFFSET_X = 8;
const ENTRY_TITLE_SIZE = 14;
const ENTRY_META_SIZE = 8.6;
const ENTRY_SUBTITLE_SIZE = 9.8;
const ENTRY_BODY_SIZE = 9.2;
const ENTRY_BULLET_SIZE = 8.9;
const ENTRY_STACK_SIZE = 8.5;
const INTRO_TEXT_WIDTH = 464;
const CONTACT_ICON_SIZE = 12;
const CONTACT_ICON_Y = 1.05;
const CONTACT_TEXT_SIZE = 9.7;
const PILL_HEIGHT = 22;
const PILL_GAP = 7;
const PRIMARY_STACKS = [
  'TypeScript / React / Next.js',
  'Swift / SwiftUI',
  'Flutter / Dart',
  'Rust / Tauri',
  'PostgreSQL / SQLite',
  'AWS / Vercel / GitHub Actions',
] as const;
const REQUESTED_PROJECT_TITLES = ['Toongether', 'DodamDodam', 'Allermi', 'BL Agent', 'Desktop Fushi', 'FlowKit'] as const;

const fonts = {
  regular: 'WantedSansRegular',
  semibold: 'WantedSansSemiBold',
  bold: 'WantedSansBold',
} as const;

const fontPaths = {
  regular: path.resolve(process.cwd(), 'public/fonts/WantedSans-Regular.ttf'),
  semibold: path.resolve(process.cwd(), 'public/fonts/WantedSans-SemiBold.ttf'),
  bold: path.resolve(process.cwd(), 'public/fonts/WantedSans-Bold.ttf'),
};

const profileImagePath = path.resolve(process.cwd(), 'assets/images/personal/profile.jpg');
const iconPaths = {
  email: path.resolve(process.cwd(), 'assets/icons/mail.svg'),
  github: path.resolve(process.cwd(), 'assets/icons/brand-github.svg'),
  linkedin: path.resolve(process.cwd(), 'assets/icons/brand-linkedin.svg'),
  birth: path.resolve(process.cwd(), 'assets/icons/calendar-days.svg'),
} as const;

const colors = {
  text: '#262626',
  muted: '#777777',
  faint: '#a1a1a1',
  line: '#d9d9d9',
  lineStrong: '#2f2f2f',
  pillBorder: '#dedede',
  pillBg: '#fbfbfb',
  page: '#ffffff',
};

type Cursor = {
  y: number;
};

type TimelineRenderItem = {
  period: string;
  meta?: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  stacks?: string[];
};

type ProjectResumeRecord = {
  project: ProjectItem;
  roleItems: string[];
  contributionItems: string[];
};

type RichSegment = {
  bold: boolean;
  text: string;
};

export async function generateResumePdf(portfolio: PortfolioData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      margin: 0,
      size: 'A4',
      info: {
        Title: `${portfolio.main.name} Resume`,
        Author: portfolio.main.name,
        Subject: 'Software Developer Resume',
        Creator: 'mercen.net',
      },
    });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    try {
      registerFonts(doc);
      addPage(doc);
      drawResume(doc, portfolio);
      drawPageNumbers(doc);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function registerFonts(doc: PDFKit.PDFDocument): void {
  for (const [label, fontPath] of Object.entries(fontPaths)) {
    if (!fs.existsSync(fontPath)) {
      throw new Error(`Missing Wanted Sans font file for PDF resume: ${fontPath}`);
    }

    doc.registerFont(fonts[label as keyof typeof fonts], fontPath);
  }
}

function drawResume(doc: PDFKit.PDFDocument, portfolio: PortfolioData): void {
  const cursor: Cursor = { y: PAGE_MARGIN_TOP };

  drawHeader(doc, cursor, portfolio);

  drawSectionHeading(doc, cursor, '주요 개발 스택', { minFollowingHeight: 54 });
  drawPrimaryStackSection(doc, cursor);

  drawSectionHeading(doc, cursor, '소개', { minFollowingHeight: 90 });
  drawParagraphs(doc, cursor, htmlParagraphs(portfolio.main.html), {
    lineGap: 4,
    paragraphGap: 10,
    size: 10.2,
    width: INTRO_TEXT_WIDTH,
  });

  drawSectionHeading(doc, cursor, '학력', { minFollowingHeight: 78 });
  drawTimeline(doc, cursor, portfolio.educations.map(educationToTimelineItem));

  addPage(doc);
  cursor.y = PAGE_MARGIN_TOP;
  drawCareerPage(doc, cursor, portfolio.careers);

  const requestedProjects = selectRequestedProjects(portfolio.projects);
  addPage(doc);
  cursor.y = PAGE_MARGIN_TOP;
  drawProjectPage(doc, cursor, '팀 프로젝트', requestedProjects.slice(0, 3));

  addPage(doc);
  cursor.y = PAGE_MARGIN_TOP;
  drawProjectPage(doc, cursor, '개인 프로젝트', requestedProjects.slice(3, 6));

  drawSectionHeading(doc, cursor, '수상이력', { minFollowingHeight: 42 });
  for (const award of portfolio.awards) {
    drawCredentialRow(doc, cursor, {
      date: formatDate(award.date),
      title: award.name,
      detail: award.level,
    });
  }

  drawSectionHeading(doc, cursor, '자격 및 점수', { minFollowingHeight: 42 });
  for (const license of portfolio.licenses) {
    drawCredentialRow(doc, cursor, {
      date: formatDate(license.date),
      title: license.name,
      detail: [license.score ?? license.level, license.issuer].filter(Boolean).join(' / '),
    });
  }
}

function drawHeader(doc: PDFKit.PDFDocument, cursor: Cursor, portfolio: PortfolioData): void {
  const contentWidth = getContentWidth(doc);
  const photoWidth = 96;
  const photoHeight = 116;
  const photoX = PAGE_MARGIN_X + contentWidth - photoWidth;
  const startY = cursor.y;
  const textWidth = contentWidth - photoWidth - 28;

  doc
    .font(fonts.bold)
    .fontSize(30)
    .fillColor(colors.text)
    .text(portfolio.main.name, PAGE_MARGIN_X, startY, { width: textWidth });

  doc
    .font(fonts.semibold)
    .fontSize(11)
    .fillColor(colors.muted)
    .text('소프트웨어 개발자', PAGE_MARGIN_X, startY + 42, { width: textWidth });

  const contactRows = [
    { kind: 'email' as const, value: portfolio.main.email },
    { kind: 'github' as const, value: urlLastSegment(portfolio.main.github) },
    { kind: 'linkedin' as const, value: urlLastSegment(portfolio.main.linkedin) },
    { kind: 'birth' as const, value: portfolio.main.birth_date },
  ].filter((item): item is { kind: ContactIconKind; value: string } => Boolean(item.value));

  const contactStartY = startY + 66;
  const columnWidth = Math.floor((textWidth - 18) / 2);

  contactRows.forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    drawContactItem(
      doc,
      item.kind,
      item.value,
      PAGE_MARGIN_X + column * (columnWidth + 18),
      contactStartY + row * 24,
      columnWidth,
    );
  });

  if (fs.existsSync(profileImagePath)) {
    drawProfilePhoto(doc, photoX, startY - 4, photoWidth, photoHeight);
  }

  cursor.y = Math.max(startY + photoHeight + 22, contactStartY + Math.ceil(contactRows.length / 2) * 24 + 22);
}

function drawPrimaryStackSection(doc: PDFKit.PDFDocument, cursor: Cursor): void {
  const height = drawPills(doc, [...PRIMARY_STACKS], PAGE_MARGIN_X, cursor.y, getContentWidth(doc), {
    fontSize: 9,
    height: 22,
  });

  cursor.y += height + 16;
}

function drawProfilePhoto(doc: PDFKit.PDFDocument, x: number, y: number, width: number, height: number): void {
  doc.save();
  doc.roundedRect(x, y, width, height, 16).clip();
  doc.image(profileImagePath, x, y, {
    align: 'center',
    cover: [width, height],
    valign: 'center',
  });
  doc.restore();

  doc.roundedRect(x, y, width, height, 16).lineWidth(0.8).strokeColor(colors.line).stroke();
}

type ContactIconKind = 'email' | 'github' | 'linkedin' | 'birth';

function drawContactItem(
  doc: PDFKit.PDFDocument,
  kind: ContactIconKind,
  value: string,
  x: number,
  y: number,
  width: number,
): void {
  drawContactIcon(doc, kind, x, y + CONTACT_ICON_Y, CONTACT_ICON_SIZE);
  doc
    .font(fonts.regular)
    .fontSize(CONTACT_TEXT_SIZE)
    .fillColor(colors.text)
    .text(value, x + 22, y + 0.9, { width: width - 22, lineBreak: false });
}

function drawContactIcon(doc: PDFKit.PDFDocument, kind: ContactIconKind, x: number, y: number, size: number): void {
  const svg = loadIconSvg(kind);

  doc.save();
  SVGtoPDF(doc, svg, x, y, {
    height: size,
    preserveAspectRatio: 'xMidYMid meet',
    width: size,
  });
  doc.restore();
}

function drawSectionHeading(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  title: string,
  options: { minFollowingHeight?: number; rightText?: string } = {},
): void {
  ensureSpace(doc, cursor, 48 + (options.minFollowingHeight ?? 0));

  doc.font(fonts.bold).fontSize(15).fillColor(colors.text).text(title, PAGE_MARGIN_X, cursor.y, {
    lineBreak: false,
    width: getContentWidth(doc) / 2,
  });

  if (options.rightText) {
    doc.font(fonts.regular).fontSize(9.2).fillColor(colors.faint).text(options.rightText, PAGE_MARGIN_X, cursor.y + 3, {
      align: 'right',
      lineBreak: false,
      width: getContentWidth(doc),
    });
  }

  doc
    .moveTo(PAGE_MARGIN_X, cursor.y + 25)
    .lineTo(PAGE_MARGIN_X + getContentWidth(doc), cursor.y + 25)
    .lineWidth(1)
    .strokeColor(colors.lineStrong)
    .stroke();

  cursor.y += 43;
}

function drawParagraphs(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  paragraphs: string[],
  options: { size: number; lineGap: number; paragraphGap: number; width?: number },
): void {
  if (paragraphs.length === 0) return;

  const width = options.width ?? getContentWidth(doc);
  doc.font(fonts.regular).fontSize(options.size).fillColor(colors.text);
  const totalHeight = paragraphs.reduce((sum, paragraph, index) => {
    const paragraphHeight = measureInlineText(doc, paragraph, width, options);

    return sum + paragraphHeight + (index === paragraphs.length - 1 ? 0 : options.paragraphGap);
  }, 0);

  ensureSpace(doc, cursor, totalHeight + 14);

  for (const paragraph of paragraphs) {
    cursor.y = drawInlineText(doc, paragraph, PAGE_MARGIN_X, cursor.y, width, options);
    cursor.y += options.paragraphGap;
  }

  cursor.y += 16;
}

function drawTimeline(doc: PDFKit.PDFDocument, cursor: Cursor, items: TimelineRenderItem[]): void {
  for (const [index, item] of items.entries()) {
    const height = measureTimelineItem(doc, item);
    ensureSpace(doc, cursor, height + 16);

    const top = cursor.y;
    const dotX = PAGE_MARGIN_X + 7;
    const bodyX = PAGE_MARGIN_X + TIMELINE_LEFT_WIDTH;
    const bodyWidth = getContentWidth(doc) - TIMELINE_LEFT_WIDTH;

    doc.circle(dotX, top + 7, 4).lineWidth(1.5).strokeColor(colors.text).stroke();
    doc.moveTo(dotX, top + 17).lineTo(dotX, top + height).lineWidth(0.8).strokeColor(colors.line).stroke();
    if (index === items.length - 1) {
      doc.circle(dotX, top + height, 2.1).fillColor(colors.line).fill();
    }

    doc.font(fonts.semibold).fontSize(9.4).fillColor(colors.text).text(item.period, PAGE_MARGIN_X + 22, top, {
      width: TIMELINE_LEFT_WIDTH - 34,
    });

    if (item.meta) {
      doc.font(fonts.regular).fontSize(8.6).fillColor(colors.faint).text(item.meta, PAGE_MARGIN_X + 22, top + 18, {
        width: TIMELINE_LEFT_WIDTH - 34,
      });
    }

    let bodyY = top;
    doc.font(fonts.bold).fontSize(14).fillColor(colors.text).text(item.title, bodyX, bodyY, {
      width: bodyWidth,
    });
    bodyY += 19;

    if (item.subtitle) {
      doc.font(fonts.semibold).fontSize(9.8).fillColor(colors.text).text(item.subtitle, bodyX, bodyY, {
        width: bodyWidth,
      });
      bodyY += 17;
    }

    if (item.description) {
      bodyY = drawInlineText(doc, item.description, bodyX, bodyY + 2, bodyWidth, {
        size: 9.2,
        lineGap: 3,
      }) + 8;
    }

    if (item.stacks && item.stacks.length > 0) {
      const pillHeight = drawPills(doc, item.stacks.slice(0, 12), bodyX, bodyY, bodyWidth, {
        fontSize: 8.5,
        height: 20,
      });
      bodyY += pillHeight + 8;
    }

    for (const bullet of item.bullets ?? []) {
      bodyY = drawBullet(doc, bullet, bodyX, bodyY, bodyWidth) + 5;
    }

    cursor.y = Math.max(top + height + 14, bodyY + 8);
  }
}

function measureTimelineItem(doc: PDFKit.PDFDocument, item: TimelineRenderItem): number {
  const bodyWidth = getContentWidth(doc) - TIMELINE_LEFT_WIDTH;
  let height = 22;

  if (item.subtitle) height += 17;
  if (item.description) {
    height += measureInlineText(doc, item.description, bodyWidth, { lineGap: 3, size: 9.2 }) + 10;
  }
  if (item.stacks && item.stacks.length > 0) {
    height += measurePillRows(doc, item.stacks.slice(0, 12), bodyWidth, { fontSize: 8.5, height: 20 }) + 8;
  }
  for (const bullet of item.bullets ?? []) {
    height += measureInlineText(doc, bullet, bodyWidth - 12, { lineGap: 2, size: 8.9 }) + 5;
  }

  return Math.max(height, 58);
}

function drawCareerPage(doc: PDFKit.PDFDocument, cursor: Cursor, careers: CareerItem[]): void {
  drawSectionHeading(doc, cursor, '경력', { minFollowingHeight: 620 });

  const rowGap = 12;
  const availableHeight = doc.page.height - PAGE_MARGIN_BOTTOM - cursor.y;
  const rowHeight = Math.floor((availableHeight - rowGap * (careers.length - 1)) / careers.length);

  for (const [index, career] of careers.entries()) {
    drawCareerEntry(doc, cursor, career, rowHeight, index === careers.length - 1);
    cursor.y += rowGap;
  }
}

function drawCareerEntry(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  career: CareerItem,
  height: number,
  isLast: boolean,
): void {
  const x = PAGE_MARGIN_X;
  const y = cursor.y;
  const width = getContentWidth(doc);
  const bodyX = x + ENTRY_LEFT_WIDTH + ENTRY_BODY_GAP;
  const bodyWidth = width - ENTRY_LEFT_WIDTH - ENTRY_BODY_GAP;
  const markerX = x + ENTRY_LEFT_WIDTH + ENTRY_MARKER_OFFSET_X;

  doc.circle(markerX, y + 8, 3.2).lineWidth(1.2).strokeColor(colors.text).stroke();
  doc.moveTo(markerX, y + 18).lineTo(markerX, y + height - 4).lineWidth(0.65).strokeColor(colors.line).stroke();

  doc.font(fonts.semibold).fontSize(ENTRY_SUBTITLE_SIZE).fillColor(colors.text).text(formatPeriod(career.period), x, y + 1, {
    lineBreak: false,
    width: ENTRY_LEFT_WIDTH - 6,
  });

  if (career.locations && career.locations.length > 0) {
    doc.font(fonts.regular).fontSize(ENTRY_META_SIZE).fillColor(colors.faint).text(career.locations.join(' / '), x, y + 19, {
      width: ENTRY_LEFT_WIDTH - 6,
    });
  }

  doc.font(fonts.bold).fontSize(ENTRY_TITLE_SIZE).fillColor(colors.text).text(career.display_name ?? career.company, bodyX, y, {
    lineBreak: false,
    width: bodyWidth,
  });
  doc.font(fonts.semibold).fontSize(ENTRY_SUBTITLE_SIZE).fillColor(colors.text).text(career.role, bodyX, y + 18, {
    lineBreak: false,
    width: bodyWidth,
  });

  let bodyY = y + 40;
  if (career.description) {
    bodyY = drawInlineText(doc, career.description, bodyX, bodyY, bodyWidth, {
      lineGap: 1.8,
      size: ENTRY_BODY_SIZE,
    }) + 7;
  }

  const bullets = [...(career.responsibilities ?? []), ...(career.highlights ?? [])].slice(0, 4);
  for (const bullet of bullets) {
    if (bodyY > y + height - 42) break;
    bodyY = drawEntryBullet(doc, bullet, bodyX, bodyY, bodyWidth) + 4;
  }

  const stacks = career.stacks.map((stack) => stack.name).slice(0, 8);
  if (stacks.length > 0) {
    drawStackLine(doc, stacks, bodyX, y + height - 22, bodyWidth, ENTRY_STACK_SIZE);
  }

  if (!isLast) {
    doc
      .moveTo(bodyX, y + height)
      .lineTo(x + width, y + height)
      .lineWidth(0.45)
      .strokeColor(colors.line)
      .stroke();
  }

  cursor.y += height;
}

function drawProjectPage(doc: PDFKit.PDFDocument, cursor: Cursor, title: string, records: ProjectResumeRecord[]): void {
  drawSectionHeading(doc, cursor, title, { minFollowingHeight: 650 });

  const gap = 12;
  const rowHeight = Math.floor((doc.page.height - PAGE_MARGIN_BOTTOM - cursor.y - gap * 2) / 3);

  for (const [index, record] of records.entries()) {
    drawProjectResumeEntry(doc, cursor, record, rowHeight, index === records.length - 1);
    cursor.y += gap;
  }
}

function drawProjectResumeEntry(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  record: ProjectResumeRecord,
  height: number,
  isLast: boolean,
): void {
  const { project } = record;
  const x = PAGE_MARGIN_X;
  const y = cursor.y;
  const width = getContentWidth(doc);
  const leftWidth = ENTRY_LEFT_WIDTH;
  const rightX = x + leftWidth + ENTRY_BODY_GAP;
  const rightWidth = width - leftWidth - ENTRY_BODY_GAP;
  const markerX = x + leftWidth + ENTRY_MARKER_OFFSET_X;

  doc.circle(markerX, y + 8, 2.8).fillColor(colors.text).fill();
  doc.moveTo(markerX, y + 18).lineTo(markerX, y + height - 2).lineWidth(0.6).strokeColor(colors.line).stroke();

  doc.font(fonts.bold).fontSize(ENTRY_TITLE_SIZE).fillColor(colors.text).text(project.title, x, y, {
    lineBreak: false,
    width: leftWidth - 12,
  });

  const meta = [formatPeriod(project.period), project.team, project.award].filter(Boolean).join(' / ');
  let leftY = y + 44;
  if (meta) {
    doc.font(fonts.regular).fontSize(ENTRY_META_SIZE).fillColor(colors.faint);
    const metaHeight = doc.heightOfString(meta, {
      width: leftWidth - 12,
    });
    doc.text(meta, x, y + 19, {
      width: leftWidth - 12,
    });
    leftY = Math.max(leftY, y + 19 + metaHeight + 10);
  }

  if (project.description) {
    leftY = drawInlineText(doc, project.description, x, leftY, leftWidth - 12, {
      lineGap: 1.8,
      size: ENTRY_BODY_SIZE,
    }) + 9;
  }

  drawStackLine(doc, project.stacks.map((stack) => stack.name).slice(0, 7), x, leftY, leftWidth - 12, ENTRY_STACK_SIZE);

  const roleEnd = drawSmallSection(doc, '내 역할', record.roleItems.slice(0, 3), rightX, y, rightWidth, y + height - 8);
  drawSmallSection(doc, '기여', record.contributionItems.slice(0, 3), rightX, Math.max(roleEnd + 9, y + 96), rightWidth, y + height - 8);

  if (!isLast) {
    doc
      .moveTo(x, y + height)
      .lineTo(x + width, y + height)
      .lineWidth(0.45)
      .strokeColor(colors.line)
      .stroke();
  }

  cursor.y += height;
}

function drawSmallSection(
  doc: PDFKit.PDFDocument,
  title: string,
  items: string[],
  x: number,
  y: number,
  width: number,
  maxY: number,
): number {
  doc.font(fonts.bold).fontSize(ENTRY_BODY_SIZE).fillColor(colors.text).text(title, x, y, {
    lineBreak: false,
    width,
  });

  let bodyY = y + 14;
  for (const item of items) {
    if (bodyY > maxY - 16) break;
    bodyY = drawSmallBullet(doc, item, x, bodyY, width) + 3;
  }

  return bodyY;
}

function drawEntryBullet(doc: PDFKit.PDFDocument, text: string, x: number, y: number, width: number): number {
  doc.circle(x + 2.7, y + 5.6, 1.35).fillColor(colors.text).fill();
  return drawInlineText(doc, text, x + 10, y, width - 10, {
    lineGap: 1.4,
    size: ENTRY_BULLET_SIZE,
  });
}

function drawSmallBullet(doc: PDFKit.PDFDocument, text: string, x: number, y: number, width: number): number {
  return drawEntryBullet(doc, text, x, y, width);
}

function drawStackLine(
  doc: PDFKit.PDFDocument,
  values: string[],
  x: number,
  y: number,
  width: number,
  size: number,
): void {
  if (values.length === 0) return;

  doc.font(fonts.semibold).fontSize(size).fillColor(colors.faint).text('Stack', x, y, {
    lineBreak: false,
    width: 30,
  });
  doc.font(fonts.regular).fontSize(size).fillColor(colors.muted).text(values.join(' / '), x + 36, y, {
    lineBreak: false,
    width: width - 36,
  });
}

function drawCredentialRow(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  item: { date: string; title: string; detail?: string },
): void {
  const height = item.detail ? 32 : 25;
  ensureSpace(doc, cursor, height + 5);

  doc.font(fonts.semibold).fontSize(8.8).fillColor(colors.faint).text(item.date, PAGE_MARGIN_X, cursor.y + 2, {
    width: 78,
  });
  doc.font(fonts.semibold).fontSize(9.6).fillColor(colors.text).text(item.title, PAGE_MARGIN_X + 94, cursor.y, {
    width: getContentWidth(doc) - 94,
  });

  if (item.detail) {
    doc.font(fonts.regular).fontSize(8.6).fillColor(colors.muted).text(item.detail, PAGE_MARGIN_X + 94, cursor.y + 15, {
      width: getContentWidth(doc) - 94,
    });
  }

  doc
    .moveTo(PAGE_MARGIN_X + 94, cursor.y + height)
    .lineTo(PAGE_MARGIN_X + getContentWidth(doc), cursor.y + height)
    .lineWidth(0.4)
    .strokeColor(colors.line)
    .stroke();

  cursor.y += height + 5;
}

function drawInlineText(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  width: number,
  options: { size: number; lineGap: number },
): number {
  return layoutRichText(doc, text, x, y, width, options, true);
}

function drawBullet(doc: PDFKit.PDFDocument, text: string, x: number, y: number, width: number): number {
  doc.circle(x + 3, y + 6.5, 1.7).fillColor(colors.text).fill();
  return drawInlineText(doc, text, x + 12, y, width - 12, {
    lineGap: 2,
    size: 8.9,
  });
}

function drawPills(
  doc: PDFKit.PDFDocument,
  values: string[],
  x: number,
  y: number,
  width: number,
  options: { fontSize?: number; height?: number } = {},
): number {
  const fontSize = options.fontSize ?? 8.8;
  const pillHeight = options.height ?? PILL_HEIGHT;
  let currentX = x;
  let currentY = y;
  const maxX = x + width;

  doc.font(fonts.semibold).fontSize(fontSize);

  for (const value of values) {
    const pillWidth = Math.min(width, Math.ceil(doc.widthOfString(value) + 22));
    if (currentX > x && currentX + pillWidth > maxX) {
      currentX = x;
      currentY += pillHeight + PILL_GAP;
    }

    doc.roundedRect(currentX, currentY, pillWidth, pillHeight, pillHeight / 2).fillAndStroke(colors.pillBg, colors.pillBorder);
    doc.fillColor(colors.text).text(value, currentX + 11, currentY + (pillHeight - fontSize) / 2 - 1.1, {
      align: 'center',
      lineBreak: false,
      width: pillWidth - 22,
    });
    currentX += pillWidth + PILL_GAP;
  }

  return currentY + pillHeight - y;
}

function measurePillRows(
  doc: PDFKit.PDFDocument,
  values: string[],
  width: number,
  options: { fontSize?: number; height?: number } = {},
): number {
  const fontSize = options.fontSize ?? 8.8;
  const pillHeight = options.height ?? PILL_HEIGHT;
  let rows = 1;
  let currentWidth = 0;

  doc.font(fonts.semibold).fontSize(fontSize);

  for (const value of values) {
    const pillWidth = Math.min(width, Math.ceil(doc.widthOfString(value) + 22));
    if (currentWidth > 0 && currentWidth + PILL_GAP + pillWidth > width) {
      rows += 1;
      currentWidth = pillWidth;
    } else {
      currentWidth += (currentWidth > 0 ? PILL_GAP : 0) + pillWidth;
    }
  }

  return rows * pillHeight + (rows - 1) * PILL_GAP;
}

function educationToTimelineItem(education: EducationItem): TimelineRenderItem {
  return {
    period: formatPeriod(education.period),
    meta: education.role,
    title: education.name,
    description: education.description,
    bullets: (education.highlights ?? []).slice(0, 3),
  };
}

function selectRequestedProjects(projects: ProjectItem[]): ProjectResumeRecord[] {
  const projectsByTitle = new Map(projects.map((project) => [project.title, project]));

  return REQUESTED_PROJECT_TITLES.map((title) => {
    const project = projectsByTitle.get(title);
    if (!project) throw new Error(`Missing project for PDF resume: ${title}`);

    return {
      project,
      roleItems: extractHtmlSectionItems(project, '내 역할'),
      contributionItems: extractHtmlSectionItems(project, '수치화된 성과'),
    };
  });
}

function extractHtmlSectionItems(project: ProjectItem, heading: string): string[] {
  const html = [project.htmlBeforeProblemSolutions, project.htmlAfterProblemSolutions].filter(Boolean).join('\n');
  const sectionPattern = new RegExp(`<h2[^>]*>\\s*${escapeRegExp(heading)}\\s*</h2>([\\s\\S]*?)(?=<h2\\b|$)`, 'i');
  const section = sectionPattern.exec(html)?.[1] ?? '';
  const items = [...section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => match[1].trim());

  if (items.length > 0) return items;

  return heading === '내 역할'
    ? [project.description ?? '']
    : project.problemSolutions.map((item) => item.solutionHtml);
}

function htmlParagraphs(html: string): string[] {
  const paragraphMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => match[1].trim());

  if (paragraphMatches.length > 0) {
    return paragraphMatches.filter(Boolean);
  }

  return html
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function measureInlineText(
  doc: PDFKit.PDFDocument,
  text: string,
  width: number,
  options: { size: number; lineGap: number },
): number {
  return layoutRichText(doc, text, 0, 0, width, options, false);
}

function layoutRichText(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  width: number,
  options: { size: number; lineGap: number },
  shouldDraw: boolean,
): number {
  const segments = parseRichText(text);
  if (segments.length === 0) return y;

  const lineAdvance = options.size * 1.34 + options.lineGap;
  const lineHeight = options.size * 1.34;
  const maxX = x + width;
  let cursorX = x;
  let cursorY = y;

  for (const segment of segments) {
    doc
      .font(segment.bold ? fonts.bold : fonts.regular)
      .fontSize(options.size)
      .fillColor(colors.text);

    for (const token of splitTextTokens(segment.text)) {
      if (token === '') continue;

      if (token === '\n') {
        cursorX = x;
        cursorY += lineAdvance;
        continue;
      }

      const isWhitespace = /^\s+$/.test(token);
      const normalizedToken = isWhitespace ? ' ' : token;
      const tokenWidth = doc.widthOfString(normalizedToken);

      if (isWhitespace && cursorX === x) continue;

      if (!isWhitespace && cursorX > x && cursorX + tokenWidth > maxX) {
        cursorX = x;
        cursorY += lineAdvance;
      }

      if (shouldDraw) {
        doc.text(normalizedToken, cursorX, cursorY, {
          lineBreak: false,
        });
      }
      cursorX += tokenWidth;
    }
  }

  return cursorY + lineHeight;
}

function splitTextTokens(text: string): string[] {
  return text
    .split(/(\n|\s+)/)
    .flatMap((token) => {
      if (token === '\n') return ['\n'];
      if (/^\s+$/.test(token)) return [' '];
      return token ? [token] : [];
    });
}

function parseRichText(value?: string): RichSegment[] {
  if (!value) return [];

  const source = value
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<br\s*\/?>/gi, '\n');
  const tokens = source.split(/(<\/?strong\b[^>]*>|<\/?b\b[^>]*>|<[^>]+>|\*\*|__|`[^`]*`)/gi);
  const segments: RichSegment[] = [];
  let htmlBoldDepth = 0;
  let markdownBold = false;

  for (const token of tokens) {
    if (!token) continue;

    if (/^<strong\b/i.test(token) || /^<b\b/i.test(token)) {
      htmlBoldDepth += 1;
      continue;
    }

    if (/^<\/strong/i.test(token) || /^<\/b/i.test(token)) {
      htmlBoldDepth = Math.max(0, htmlBoldDepth - 1);
      continue;
    }

    if (token === '**' || token === '__') {
      markdownBold = !markdownBold;
      continue;
    }

    if (/^<[^>]+>$/.test(token)) continue;

    const rawText = token.startsWith('`') && token.endsWith('`') ? token.slice(1, -1) : token;
    const text = normalizeRichTextWhitespace(rawText);
    appendRichSegment(segments, text, htmlBoldDepth > 0 || markdownBold);
  }

  return trimRichSegments(segments);
}

function appendRichSegment(segments: RichSegment[], text: string, bold: boolean): void {
  if (!text) return;

  const last = segments.at(-1);
  if (last && last.bold === bold) {
    last.text += text;
    return;
  }

  segments.push({ bold, text });
}

function trimRichSegments(segments: RichSegment[]): RichSegment[] {
  const trimmed = segments
    .map((segment) => ({ ...segment }))
    .filter((segment) => segment.text.length > 0);

  if (trimmed.length === 0) return [];

  trimmed[0].text = trimmed[0].text.replace(/^\s+/, '');
  trimmed[trimmed.length - 1].text = trimmed[trimmed.length - 1].text.replace(/\s+$/, '');

  return trimmed.filter((segment) => segment.text.length > 0);
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function normalizeRichTextWhitespace(value: string): string {
  return decodeHtml(value)
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ *\n */g, '\n');
}

function loadIconSvg(kind: ContactIconKind): string {
  const iconPath = iconPaths[kind];
  const svg = fs.readFileSync(iconPath, 'utf8');

  return svg
    .replaceAll('#f2f2f2', colors.text)
    .replaceAll('#F2F2F2', colors.text)
    .replaceAll('fill="currentColor"', `fill="${colors.text}"`);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatPeriod(value?: string): string {
  if (!value) return '';
  return value.replace(/-/g, '.').replace(/\s*~\s*/g, ' - ');
}

function formatDate(value: string): string {
  return value.replace(/-/g, '.');
}

function urlLastSegment(value?: string): string | undefined {
  if (!value) return undefined;
  return value.replace(/\/$/, '').split('/').pop();
}

function addPage(doc: PDFKit.PDFDocument): void {
  doc.addPage({ margin: 0, size: 'A4' });
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.page);
}

function ensureSpace(doc: PDFKit.PDFDocument, cursor: Cursor, requiredHeight: number): void {
  if (cursor.y + requiredHeight <= doc.page.height - PAGE_MARGIN_BOTTOM) return;

  addPage(doc);
  cursor.y = PAGE_MARGIN_TOP;
}

function getContentWidth(doc: PDFKit.PDFDocument): number {
  return doc.page.width - PAGE_MARGIN_X * 2;
}

function drawPageNumbers(doc: PDFKit.PDFDocument): void {
  const range = doc.bufferedPageRange();

  for (let pageIndex = range.start; pageIndex < range.start + range.count; pageIndex += 1) {
    doc.switchToPage(pageIndex);
    doc
      .font(fonts.regular)
      .fontSize(8)
      .fillColor(colors.faint)
      .text(`${pageIndex + 1} / ${range.count}`, PAGE_MARGIN_X, doc.page.height - 28, {
        align: 'right',
        lineBreak: false,
        width: getContentWidth(doc),
      });
  }
}
