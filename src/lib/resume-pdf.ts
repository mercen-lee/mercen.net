import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import type { PortfolioData } from "./content";
import type { Locale } from "./i18n";

const PAGE_MARGIN_X = 46;
const PAGE_MARGIN_TOP = 42;

const fonts = {
  regular: "WantedSansRegular",
  semibold: "WantedSansSemiBold",
  bold: "WantedSansBold",
} as const;

const fontPaths = {
  regular: path.resolve(process.cwd(), "public/fonts/WantedSans-Regular.ttf"),
  semibold: path.resolve(process.cwd(), "public/fonts/WantedSans-SemiBold.ttf"),
  bold: path.resolve(process.cwd(), "public/fonts/WantedSans-Bold.ttf"),
};

const profileImagePath = path.resolve(
  process.cwd(),
  "assets/images/personal/profile.jpg",
);

const techStackConfigPath = path.resolve(
  process.cwd(),
  "assets/tech_stacks.json",
);

const colors = {
  text: "#202020",
  muted: "#606060",
  faint: "#929292",
  line: "#d8d8d8",
  lineStrong: "#202020",
  page: "#ffffff",
};

type CareerEntry = {
  company: string;
  role: string;
  period: string;
  meta: string;
  summary: string;
  bullets: string[];
};

type ProjectEntry = {
  title: string;
  period: string;
  meta: string;
  description: string;
  stacks: string[];
  link?: string;
};

type SkillEntry = {
  label: string;
  stacks: string[];
};

type AwardEntry = {
  period: string;
  title: string;
  detail: string;
};

type TechStackDefinition = {
  name: string;
  aliases?: string[];
  icon?: string;
};

type ResumeCopy = {
  documentLabel: string;
  jobTitle: string;
  sectionLabels: {
    profile: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    awards: string;
    credentials: string;
  };
  summary: string;
  skills: SkillEntry[];
  careers: CareerEntry[];
  projects: ProjectEntry[];
  education: Array<{ period: string; title: string; detail: string }>;
  awards: AwardEntry[];
  credentials: string[];
};

export async function generateResumePdf(
  portfolio: PortfolioData,
  locale: Locale = "ko",
): Promise<Buffer> {
  const copy = getCopy(locale);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      margin: 0,
      size: "A4",
      info: {
        Title: `${portfolio.main.name} ${copy.documentLabel}`,
        Author: portfolio.main.name,
        Subject: copy.jobTitle,
        Creator: "mercen.net",
      },
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    try {
      registerFonts(doc);
      addPage(doc);
      drawFirstPage(doc, portfolio, copy, locale);
      addPage(doc);
      drawSecondPage(doc, portfolio, copy, locale);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function getCopy(locale: Locale): ResumeCopy {
  if (locale === "en") {
    return {
      documentLabel: "Resume",
      jobTitle: "Software Engineer",
      sectionLabels: {
        profile: "Profile",
        skills: "Technical Skills",
        experience: "Experience",
        projects: "Selected Projects",
        education: "Education",
        awards: "Awards",
        credentials: "Credentials",
      },
      summary:
        "Software engineer who has shipped and operated products spanning web, APIs, mobile applications, and cloud infrastructure. Owned Connector UI frontend development at Pulzze Systems, and developed and maintained iOS features in Swift while leading WHOFA's migration to Flutter. Strong at narrowing down failures and automating repetitive operational work.",
      skills: [
        {
          label: "Production",
          stacks: [
            "TypeScript",
            "React",
            "Next.js",
            "Fastify",
            "PostgreSQL",
            "Redis",
            "SQLite",
            "AWS",
            "Vercel",
            "GitHub Actions",
            "Terraform",
            "Flutter",
            "Dart",
            "Riverpod",
          ],
        },
        {
          label: "Additional",
          stacks: [
            "Python",
            "Java",
            "JavaScript",
            "Swift",
            "SwiftUI",
            "Rust",
            "Tauri",
            "Elixir",
            "Phoenix",
            "LiveView",
          ],
        },
      ],
      careers: [
        {
          company: "NextGen",
          role: "Full-stack Developer (Contract)",
          period: "2026.03 - 2026.04",
          meta: "Sole developer / 1 month",
          summary:
            "Built the web, API, mobile, and infrastructure for a creator academy platform.",
          bullets: [
            "Built payments, course access, DRM, authentication, and AWS deployment as one operating flow.",
            "Built a Next.js, Fastify, and Expo monorepo with PostgreSQL, Redis, Terraform, and GitHub Actions.",
            "Launched in one month; supported about 1,000 peak concurrent users at a 0% operating error rate and about KRW 60 million in daily revenue.",
          ],
        },
        {
          company: "WHOFA",
          role: "Flutter Developer",
          period: "2025.09 - 2026.02",
          meta: "4-person product team",
          summary:
            "Developed and maintained new iOS features in Swift and led the product's migration to Flutter.",
          bullets: [
            "Developed new profile and community features in Swift and maintained the existing iOS application.",
            "Led the migration to Flutter and Riverpod, implementing screen, state, navigation, deep-link, and local-data flows.",
            "Reproduced and fixed audio crashes, image downloads, stale state, navigation, and animation edge cases.",
          ],
        },
        {
          company: "Pulzze Systems",
          role: "Software Engineer Intern",
          period: "2024.06 - 2025.02",
          meta: "6-person global team",
          summary:
            "Developed the Connector UI frontend for the SaaS automation product Interactor.",
          bullets: [
            "Improved 4+ administration and test surfaces: Action and Authentication tests, Connector selection, and Billing.",
            "Authored data-type descriptions for 8+ service families, including Google, Slack, Salesforce, and Notion.",
            "Worked two months in Sunnyvale, three in Seoul, then remotely from school.",
          ],
        },
      ],
      projects: [
        {
          title: "BL Agent",
          period: "2026.06 - Present",
          meta: "Client project / Desktop workflow automation",
          description:
            "Desktop workflow for ingesting B/L PDFs, extracting and validating structured fields, reviewing evidence, and exporting to an existing XLS format. The application automates work previously handled by six employees.",
          stacks: ["React", "TypeScript", "Tauri", "Rust", "SQLite"],
        },
        {
          title: "App Pilot",
          period: "2024.02",
          meta: "Swift Student Challenge Winner, 2024",
          description:
            "WYSIWYG no-code editor that turns a touch-built view hierarchy into an exportable Swift Playgrounds package.",
          stacks: ["Swift", "SwiftUI", "Swift Playgrounds"],
          link: "https://github.com/Mercen-Lee/App-Pilot",
        },
        {
          title: "Allergist",
          period: "2023.04",
          meta: "Swift Student Challenge Winner, 2023",
          description:
            "Offline food-allergen explorer for 558,728 records. Reduced initial loading from about one minute to about three seconds.",
          stacks: ["Swift", "SwiftUI", "Property List"],
          link: "https://github.com/Mercen-Lee/Allergist",
        },
        {
          title: "Toongether",
          period: "2022.09 - 2024.09",
          meta: "iOS / SK Smarteen App+ Challenge 2023 Top Excellence",
          description:
            "iOS development and product leadership; incorporated feedback from about 300 readers and 10 creators.",
          stacks: ["Swift", "SwiftUI", "TCA", "Alamofire", "FlowKit"],
          link: "https://github.com/toongether-legacy",
        },
        {
          title: "DodamDodam",
          period: "2023.03 - 2024.04",
          meta: "iOS / School-life product",
          description:
            "Maintained a school-life iOS service for about 234 students and staff for roughly one year, shipping 10 releases.",
          stacks: ["Swift", "SwiftUI", "Swift Concurrency", "Tuist", "Moya"],
          link: "https://github.com/Team-B1ND/dodamdodam-ios",
        },
      ],
      education: [
        {
          period: "2022.03 - 2025.02",
          title: "Daegu Software Meister High School",
          detail: "Department of AI Software / Graduated",
        },
      ],
      awards: loadAwards("en"),
      credentials: [
        "Industrial Engineer Information Processing",
        "Microsoft AI-900",
        "TOEIC 815",
        "TOPCIT 570",
      ],
    };
  }

  return {
    documentLabel: "이력서",
    jobTitle: "소프트웨어 엔지니어",
    sectionLabels: {
      profile: "소개",
      skills: "기술",
      experience: "경력",
      projects: "주요 프로젝트",
      education: "학력",
      awards: "수상",
      credentials: "자격 및 어학",
    },
    summary:
      "웹·API·모바일 앱·클라우드 인프라를 연결해 실제 서비스를 출시하고 운영해 왔습니다.\nNextGen에서는 결제·권한·DRM 영상 접근·AWS 배포 흐름을 1인 개발 체제로 구축했습니다.\nPulzze Systems에서는 Connector UI 프론트엔드 개발을, WHOFA에서는 Swift 기반 iOS 기능 개발·유지보수와 Flutter 전환을 주도했습니다.\n문제를 재현해 원인을 좁히고, 해결 과정을 코드·자동화·문서로 남기는 데 강점이 있습니다.",
    skills: [
      {
        label: "실무",
        stacks: [
          "TypeScript",
          "React",
          "Next.js",
          "Fastify",
          "PostgreSQL",
          "Redis",
          "SQLite",
          "AWS",
          "Vercel",
          "GitHub Actions",
          "Terraform",
          "Flutter",
          "Dart",
          "Riverpod",
        ],
      },
      {
        label: "기타",
        stacks: [
          "Python",
          "Java",
          "JavaScript",
          "Swift",
          "SwiftUI",
          "Rust",
          "Tauri",
          "Elixir",
          "Phoenix",
          "LiveView",
        ],
      },
    ],
    careers: [
      {
        company: "NextGen",
        role: "풀스택 개발자 (계약직)",
        period: "2026.03 - 2026.04",
        meta: "1인 개발 / 약 1개월",
        summary:
          "크리에이터 아카데미의 웹·API·모바일·인프라를 1인 개발 체제로 구축했습니다.",
        bullets: [
          "결제, 수강 권한, DRM, 사용자 인증, AWS 배포가 이어지는 핵심 흐름을 설계·구현했습니다.",
          "Next.js·Fastify·Expo 모노레포와 PostgreSQL·Redis, Terraform, GitHub Actions 운영 환경을 구성했습니다.",
          "약 1개월 내 출시했으며 피크 동시 접속 약 1,000명, 운영 오류율 0%, 일일 최대 매출 규모 약 6,000만 원을 기록한 서비스를 운영했습니다.",
        ],
      },
      {
        company: "WHOFA",
        role: "Flutter 개발자",
        period: "2025.09 - 2026.02",
        meta: "4인 제품팀",
        summary:
          "Swift 기반 iOS 신규 기능을 개발·유지보수하고 Flutter 전환을 주도했습니다.",
        bullets: [
          "Swift 기반 iOS 버전의 프로필·커뮤니티 신규 기능을 개발하고 기존 기능을 유지보수했습니다.",
          "Flutter·Riverpod 전환을 주도하고 화면·상태·내비게이션·딥링크·온디바이스 DB 구조를 구현했습니다.",
          "오디오 첨부 크래시, 이미지 다운로드, 상태 초기화, 탐색·애니메이션 문제를 재현하고 수정했습니다.",
        ],
      },
      {
        company: "Pulzze Systems",
        role: "소프트웨어 엔지니어 인턴",
        period: "2024.06 - 2025.02",
        meta: "6인 글로벌 개발팀",
        summary:
          "SaaS 자동화 제품 Interactor의 Connector UI 프론트엔드 개발을 담당했습니다.",
        bullets: [
          "Action·Authentication Test, Connector 선택, Billing 등 4개 이상의 관리·테스트 화면을 개선했습니다.",
          "Google·Slack·Salesforce·Notion 등 8개 이상 서비스군의 데이터 타입 설명 파일을 작성하고 정리했습니다.",
          "미국 서니베일 2개월, 서울 3개월, 이후 학교 원격 근무로 글로벌 제품 개발 흐름을 경험했습니다.",
        ],
      },
    ],
    projects: [
      {
        title: "BL Agent",
        period: "2026.06 - 현재",
        meta: "클라이언트 프로젝트 / 데스크톱 업무 자동화",
        description:
          "B/L PDF를 불러와 구조화된 필드를 추출·검증하고, 근거와 함께 검토한 뒤 기존 XLS 양식으로 내보내는 데스크톱 업무 도구입니다. 직원 6명이 수행하던 문서 처리 업무를 하나의 앱으로 자동화했습니다.",
        stacks: ["React", "TypeScript", "Tauri", "Rust", "SQLite"],
      },
      {
        title: "App Pilot",
        period: "2024.02",
        meta: "Swift Student Challenge Winner, 2024",
        description:
          "터치로 구성한 화면 구조를 Swift Playgrounds 패키지로 내보낼 수 있는 WYSIWYG 노코드 편집기입니다.",
        stacks: ["Swift", "SwiftUI", "Swift Playgrounds"],
        link: "https://github.com/Mercen-Lee/App-Pilot",
      },
      {
        title: "Allergist",
        period: "2023.04",
        meta: "Swift Student Challenge Winner, 2023",
        description:
          "558,728건의 식품 정보를 오프라인에서 탐색하는 알레르기 확인 앱입니다. 초기 로딩을 약 1분에서 약 3초로 줄였습니다.",
        stacks: ["Swift", "SwiftUI", "Property List"],
        link: "https://github.com/Mercen-Lee/Allergist",
      },
      {
        title: "Toongether",
        period: "2022.09 - 2024.09",
        meta: "iOS / SK Smarteen App+ Challenge 2023 최우수상",
        description:
          "iOS 개발과 제품 리딩을 맡아 독자 약 300명과 작가 10여 명의 피드백을 반영했습니다.",
        stacks: ["Swift", "SwiftUI", "TCA", "Alamofire", "FlowKit"],
        link: "https://github.com/toongether-legacy",
      },
      {
        title: "DodamDodam",
        period: "2023.03 - 2024.04",
        meta: "iOS / 교내 스마트 스쿨 서비스",
        description:
          "학생 약 200명과 교직원 약 34명이 사용하는 iOS 서비스를 약 1년간 유지보수하며 10개 버전을 출시했습니다.",
        stacks: ["Swift", "SwiftUI", "Swift Concurrency", "Tuist", "Moya"],
        link: "https://github.com/Team-B1ND/dodamdodam-ios",
      },
    ],
    education: [
      {
        period: "2022.03 - 2025.02",
        title: "대구소프트웨어마이스터고등학교",
        detail: "인공지능소프트웨어과 / 졸업",
      },
    ],
    awards: loadAwards("ko"),
    credentials: [
      "정보처리산업기사",
      "Microsoft AI-900",
      "TOEIC 815",
      "TOPCIT 570",
    ],
  };
}

function drawFirstPage(
  doc: PDFKit.PDFDocument,
  portfolio: PortfolioData,
  copy: ResumeCopy,
  locale: Locale,
): void {
  let y = PAGE_MARGIN_TOP;
  y = drawHeader(doc, portfolio, copy, locale, y);

  y = drawSectionHeading(doc, "01", copy.sectionLabels.profile, y);
  doc.font(fonts.regular).fontSize(9.7).fillColor(colors.text);
  doc.text(copy.summary, PAGE_MARGIN_X, y, {
    lineGap: 4,
    width: contentWidth(doc),
  });
  y +=
    doc.heightOfString(copy.summary, {
      lineGap: 4,
      width: contentWidth(doc),
    }) + 16;

  y = drawSectionHeading(doc, "02", copy.sectionLabels.skills, y);
  y = drawSkillRows(doc, copy.skills, y) + 13;

  y = drawSectionHeading(doc, "03", copy.sectionLabels.experience, y);
  for (const [index, career] of copy.careers.entries()) {
    y = drawCareerEntry(
      doc,
      career,
      y,
      index === copy.careers.length - 1,
      locale === "en",
    );
  }
}

function drawSecondPage(
  doc: PDFKit.PDFDocument,
  portfolio: PortfolioData,
  copy: ResumeCopy,
  locale: Locale,
): void {
  let y = drawContinuationHeader(doc, portfolio, copy, locale, PAGE_MARGIN_TOP);
  y = drawSectionHeading(doc, "04", copy.sectionLabels.projects, y);

  y = drawProjectsGrid(doc, copy.projects, y) + 15;

  const columnGap = 24;
  const leftWidth = (contentWidth(doc) - columnGap) / 2;
  const rightX = PAGE_MARGIN_X + leftWidth + columnGap;
  const rightWidth = leftWidth;
  const columnTop = y;

  let leftY = drawSectionHeading(
    doc,
    "05",
    copy.sectionLabels.education,
    columnTop,
    PAGE_MARGIN_X,
    leftWidth,
  );
  for (const item of copy.education) {
    leftY = drawCredentialItem(
      doc,
      item.period,
      item.title,
      item.detail,
      PAGE_MARGIN_X,
      leftY,
      leftWidth,
    );
  }

  let rightY = drawSectionHeading(
    doc,
    "06",
    copy.sectionLabels.credentials,
    columnTop,
    rightX,
    rightWidth,
  );
  rightY = drawCredentials(
    doc,
    copy.credentials,
    rightX,
    rightY,
    rightWidth,
    true,
  );

  y = Math.max(leftY, rightY) + 10;
  y = drawSectionHeading(doc, "07", copy.sectionLabels.awards, y);
  drawAwardsGrid(doc, copy.awards, y);
}

function drawHeader(
  doc: PDFKit.PDFDocument,
  portfolio: PortfolioData,
  copy: ResumeCopy,
  locale: Locale,
  y: number,
): number {
  const photoWidth = 82;
  const photoHeight = 82;
  const photoX = PAGE_MARGIN_X;
  const blockY = y + 48;
  const detailsX = photoX + photoWidth + 24;
  const detailsWidth = contentWidth(doc) - photoWidth - 24;

  doc
    .font(fonts.bold)
    .fontSize(27)
    .fillColor(colors.text)
    .text(copy.documentLabel, PAGE_MARGIN_X, y, {
      lineBreak: false,
      width: contentWidth(doc),
    });
  doc
    .font(fonts.bold)
    .fontSize(21)
    .fillColor(colors.text)
    .text(portfolio.main.name, detailsX, blockY, {
      lineBreak: false,
      width: detailsWidth,
    });

  const fields = locale === "ko"
    ? [
        ["전화번호", "010-9990-4136"],
        ["생년월일", portfolio.main.birth_date ?? "2006.02.17"],
        ["이메일", portfolio.main.email ?? "mercen@mercen.net"],
        ["거주지", "서울특별시 관악구"],
      ]
    : [
        ["Phone", "+82 10-9990-4136"],
        ["Date of birth", portfolio.main.birth_date ?? "2006.02.17"],
        ["Email", portfolio.main.email ?? "mercen@mercen.net"],
        ["Residence", "Gwanak-gu, Seoul"],
      ];
  const gap = 18;
  const fieldWidth = (detailsWidth - gap) / 2;
  for (const [index, [label, value]] of fields.entries()) {
    const row = Math.floor(index / 2);
    const column = index % 2;
    const x = detailsX + column * (fieldWidth + gap);
    const fieldY = blockY + 38 + row * 36;
    doc
      .moveTo(x, fieldY - 5)
      .lineTo(x + fieldWidth, fieldY - 5)
      .lineWidth(0.45)
      .strokeColor(colors.line)
      .stroke();
    doc.font(fonts.regular).fontSize(7.2).fillColor(colors.faint).text(label, x, fieldY, {
      lineBreak: false,
      width: fieldWidth,
    });
    doc.font(fonts.semibold).fontSize(9.2).fillColor(colors.text).text(value, x, fieldY + 13, {
      lineBreak: false,
      width: fieldWidth,
    });
  }

  if (fs.existsSync(profileImagePath)) {
    doc.image(profileImagePath, photoX, blockY, {
      fit: [photoWidth, photoHeight],
      valign: "center",
      align: "center",
    });
  }

  doc
    .moveTo(PAGE_MARGIN_X, y + 148)
    .lineTo(doc.page.width - PAGE_MARGIN_X, y + 148)
    .lineWidth(0.55)
    .strokeColor(colors.line)
    .stroke();

  return y + 163;
}

function drawContinuationHeader(
  doc: PDFKit.PDFDocument,
  portfolio: PortfolioData,
  copy: ResumeCopy,
  locale: Locale,
  y: number,
): number {
  void doc;
  void portfolio;
  void copy;
  void locale;
  return y;
}

function drawSectionHeading(
  doc: PDFKit.PDFDocument,
  index: string,
  title: string,
  y: number,
  x = PAGE_MARGIN_X,
  width = contentWidth(doc),
): number {
  void index;
  doc
    .font(fonts.bold)
    .fontSize(13)
    .fillColor(colors.text)
    .text(title, x, y, {
      lineBreak: false,
      width,
    });
  doc
    .moveTo(x, y + 25)
    .lineTo(x + width, y + 25)
    .lineWidth(0.55)
    .strokeColor(colors.line)
    .stroke();
  return y + 37;
}

function drawSkillRows(
  doc: PDFKit.PDFDocument,
  rows: ResumeCopy["skills"],
  y: number,
): number {
  const labelWidth = 62;
  const width = contentWidth(doc);
  let currentY = y + 5;

  doc
    .moveTo(PAGE_MARGIN_X, y - 5)
    .lineTo(PAGE_MARGIN_X + width, y - 5)
    .lineWidth(0.45)
    .strokeColor(colors.line)
    .stroke();
  for (const [index, row] of rows.entries()) {
    doc
      .font(fonts.semibold)
      .fontSize(8.3)
      .fillColor(colors.muted)
      .text(row.label, PAGE_MARGIN_X, currentY + 1, {
        lineBreak: false,
        width: labelWidth,
      });
    const stackHeight = drawStackLabels(
      doc,
      row.stacks,
      PAGE_MARGIN_X + labelWidth + 12,
      currentY,
      width - labelWidth - 12,
      { fontSize: 7.2, iconSize: 8.4, lineHeight: 15 },
    );
    const rowHeight = Math.max(30, stackHeight + 8);
    currentY += rowHeight;

    if (index === 0) {
      doc
        .moveTo(PAGE_MARGIN_X, currentY - 3)
        .lineTo(PAGE_MARGIN_X + width, currentY - 3)
        .lineWidth(0.4)
        .strokeColor(colors.line)
        .stroke();
    }
  }

  doc
    .moveTo(PAGE_MARGIN_X, currentY - 3)
    .lineTo(PAGE_MARGIN_X + width, currentY - 3)
    .lineWidth(0.45)
    .strokeColor(colors.line)
    .stroke();

  return currentY + 2;
}

function drawCareerEntry(
  doc: PDFKit.PDFDocument,
  career: CareerEntry,
  y: number,
  isLast: boolean,
  compact = false,
): number {
  const periodWidth = 102;
  const bodyX = PAGE_MARGIN_X + periodWidth + 19;
  const bodyWidth = contentWidth(doc) - periodWidth - 19;
  const startY = y;

  doc
    .font(fonts.semibold)
    .fontSize(8.5)
    .fillColor(colors.text)
    .text(career.period, PAGE_MARGIN_X, y + 1, {
      lineBreak: false,
      width: periodWidth,
    });
  doc
    .font(fonts.regular)
    .fontSize(8)
    .fillColor(colors.faint)
    .text(career.meta, PAGE_MARGIN_X, y + 18, {
      lineGap: 2,
      width: periodWidth,
    });

  doc
    .circle(bodyX - 12, y + 6, 2.6)
    .fillColor(colors.text)
    .fill();
  doc
    .font(fonts.bold)
    .fontSize(11.3)
    .fillColor(colors.text)
    .text(career.company, bodyX, y, {
      lineBreak: false,
      width: bodyWidth,
    });
  const companyWidth = doc.widthOfString(career.company);
  doc
    .font(fonts.semibold)
    .fontSize(8.5)
    .fillColor(colors.muted)
    .text(career.role, bodyX + companyWidth + 12, y + 2.3, {
      lineBreak: false,
      width: Math.max(80, bodyWidth - companyWidth - 12),
    });
  y += 20;

  doc
    .font(fonts.regular)
    .fontSize(compact ? 8.45 : 8.9)
    .fillColor(colors.text)
    .text(career.summary, bodyX, y, {
      lineGap: compact ? 1.7 : 2.3,
      width: bodyWidth,
    });
  y +=
    doc.heightOfString(career.summary, {
      lineGap: compact ? 1.7 : 2.3,
      width: bodyWidth,
    }) + (compact ? 5 : 7);

  for (const bullet of career.bullets) {
    doc
      .circle(bodyX + 2.2, y + 5.5, 1.15)
      .fillColor(colors.muted)
      .fill();
    doc
      .font(fonts.regular)
      .fontSize(compact ? 8.1 : 8.6)
      .fillColor(colors.muted)
      .text(bullet, bodyX + 10, y, {
        lineGap: compact ? 1.4 : 2.1,
        width: bodyWidth - 10,
      });
    y +=
      doc.heightOfString(bullet, {
        lineGap: compact ? 1.4 : 2.1,
        width: bodyWidth - 10,
      }) + (compact ? 3.2 : 4.5);
  }

  const bottom = Math.max(y + (compact ? 4 : 6), startY + (compact ? 82 : 90));
  if (!isLast) {
    doc
      .moveTo(bodyX, bottom - 1)
      .lineTo(PAGE_MARGIN_X + contentWidth(doc), bottom - 1)
      .lineWidth(0.4)
      .strokeColor(colors.line)
      .stroke();
  }
  return bottom + (isLast ? 0 : 4);
}

function drawProjectsGrid(
  doc: PDFKit.PDFDocument,
  projects: ProjectEntry[],
  y: number,
): number {
  const columnGap = 24;
  const columnWidth = (contentWidth(doc) - columnGap) / 2;
  const rows = Math.ceil(projects.length / 2);
  let currentY = y;

  for (let row = 0; row < rows; row += 1) {
    const rowProjects = projects.slice(row * 2, row * 2 + 2);
    const heights = rowProjects.map((project) =>
      measureProjectEntry(doc, project, columnWidth),
    );
    const rowHeight = Math.max(...heights, 78);

    for (const [column, project] of rowProjects.entries()) {
      const x = PAGE_MARGIN_X + column * (columnWidth + columnGap);
      drawProjectEntry(doc, project, x, currentY, columnWidth, rowHeight);
    }
    currentY += rowHeight + 10;
  }

  return currentY - 10;
}

function measureProjectEntry(
  doc: PDFKit.PDFDocument,
  project: ProjectEntry,
  width: number,
): number {
  doc.font(fonts.semibold).fontSize(7.2);
  const metaHeight = doc.heightOfString(project.meta, {
    lineGap: 1.4,
    width,
  });
  doc.font(fonts.regular).fontSize(8.2);
  const descriptionHeight = doc.heightOfString(project.description, {
    lineGap: 2,
    width,
  });
  const stackHeight = measureStackLabels(
    doc,
    project.stacks,
    width,
    { fontSize: 6.8, iconSize: 8, lineHeight: 14 },
  );
  return 18 + metaHeight + 5 + descriptionHeight + 7 + stackHeight + 12;
}

function drawProjectEntry(
  doc: PDFKit.PDFDocument,
  project: ProjectEntry,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const periodWidth = 92;
  doc
    .font(fonts.bold)
    .fontSize(10.5)
    .fillColor(colors.text)
    .text(project.title, x, y, {
      link: project.link,
      lineBreak: false,
      width: width - periodWidth - 8,
    });
  doc
    .font(fonts.regular)
    .fontSize(7.2)
    .fillColor(colors.faint)
    .text(project.period, x + width - periodWidth, y + 2, {
      align: "right",
      lineBreak: false,
      width: periodWidth,
    });

  let currentY = y + 18;
  doc
    .font(fonts.semibold)
    .fontSize(7.2)
    .fillColor(colors.muted)
    .text(project.meta, x, currentY, {
      lineGap: 1.4,
      width,
    });
  currentY +=
    doc.heightOfString(project.meta, { lineGap: 1.4, width }) + 5;

  doc
    .font(fonts.regular)
    .fontSize(8.2)
    .fillColor(colors.text)
    .text(project.description, x, currentY, {
      lineGap: 2,
      link: project.link,
      width,
    });
  currentY +=
    doc.heightOfString(project.description, { lineGap: 2, width }) + 7;
  drawStackLabels(doc, project.stacks, x, currentY, width, {
    fontSize: 6.8,
    iconSize: 8,
    lineHeight: 14,
  });

  doc
    .moveTo(x, y + height - 3)
    .lineTo(x + width, y + height - 3)
    .lineWidth(0.4)
    .strokeColor(colors.line)
    .stroke();
}

function drawCredentialItem(
  doc: PDFKit.PDFDocument,
  period: string,
  title: string,
  detail: string,
  x: number,
  y: number,
  width: number,
): number {
  doc
    .font(fonts.semibold)
    .fontSize(7.4)
    .fillColor(colors.faint)
    .text(period, x, y, {
      lineBreak: false,
      width,
    });
  doc
    .font(fonts.semibold)
    .fontSize(8.8)
    .fillColor(colors.text)
    .text(title, x, y + 17, {
      lineGap: 1.8,
      width,
    });
  const titleHeight = doc.heightOfString(title, {
    lineGap: 1.8,
    width,
  });
  doc
    .font(fonts.regular)
    .fontSize(8.1)
    .fillColor(colors.muted)
    .text(detail, x, y + 17 + titleHeight + 3, {
      lineGap: 1.8,
      width,
    });
  const detailHeight = doc.heightOfString(detail, {
    lineGap: 1.8,
    width,
  });
  return y + 17 + titleHeight + detailHeight + 11;
}

function drawCredentials(
  doc: PDFKit.PDFDocument,
  items: string[],
  x: number,
  y: number,
  width: number,
  compact = false,
): number {
  let currentY = y;
  for (const item of items) {
    doc
      .circle(x + 2, currentY + 5, 1.2)
      .fillColor(colors.muted)
      .fill();
    doc
      .font(fonts.regular)
      .fontSize(compact ? 8.1 : 8.7)
      .fillColor(colors.text)
      .text(item, x + 10, currentY, {
        width: width - 10,
      });
    currentY += compact ? 18 : 23;
  }
  return currentY;
}

function drawAwardsGrid(
  doc: PDFKit.PDFDocument,
  awards: AwardEntry[],
  y: number,
): number {
  const columnGap = 24;
  const columnWidth = (contentWidth(doc) - columnGap) / 2;
  const itemsPerColumn = Math.ceil(awards.length / 2);
  const columns = [
    awards.slice(0, itemsPerColumn),
    awards.slice(itemsPerColumn),
  ];
  let bottom = y;

  for (const [column, items] of columns.entries()) {
    const x = PAGE_MARGIN_X + column * (columnWidth + columnGap);
    let currentY = y;

    for (const item of items) {
      const periodWidth = 42;
      const bodyX = x + periodWidth;
      const bodyWidth = columnWidth - periodWidth;
      const label = `${item.title} · ${item.detail}`;

      doc
        .font(fonts.regular)
        .fontSize(6.8)
        .fillColor(colors.faint)
        .text(item.period, x, currentY + 1, {
          lineBreak: false,
          width: periodWidth - 5,
        });
      doc
        .font(fonts.semibold)
        .fontSize(7.2)
        .fillColor(colors.text)
        .text(label, bodyX, currentY, {
          lineGap: 1.4,
          width: bodyWidth,
        });
      const labelHeight = doc.heightOfString(label, {
        lineGap: 1.4,
        width: bodyWidth,
      });
      currentY += Math.max(19, labelHeight + 5);
    }
    bottom = Math.max(bottom, currentY);
  }

  return bottom;
}

type StackLabelOptions = {
  fontSize: number;
  iconSize: number;
  lineHeight: number;
};

let techStackIconPaths: Map<string, string | undefined> | undefined;
const stackSvgCache = new Map<string, string>();

function loadAwards(locale: Locale): AwardEntry[] {
  const awardPath = path.resolve(
    process.cwd(),
    locale === "ko" ? "assets/awards.json" : "assets/locales/en/awards.json",
  );
  const source = JSON.parse(fs.readFileSync(awardPath, "utf8")) as Array<{
    name: string;
    level?: string;
    date: string;
  }>;

  return source
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => ({
      period: item.date.slice(0, 7).replace("-", "."),
      title: item.name,
      detail: item.level ?? "",
    }));
}

function measureStackLabels(
  doc: PDFKit.PDFDocument,
  stacks: string[],
  width: number,
  options: StackLabelOptions,
): number {
  return layoutStackLabels(doc, stacks, 0, 0, width, options, false);
}

function drawStackLabels(
  doc: PDFKit.PDFDocument,
  stacks: string[],
  x: number,
  y: number,
  width: number,
  options: StackLabelOptions,
): number {
  return layoutStackLabels(doc, stacks, x, y, width, options, true);
}

function layoutStackLabels(
  doc: PDFKit.PDFDocument,
  stacks: string[],
  x: number,
  y: number,
  width: number,
  options: StackLabelOptions,
  draw: boolean,
): number {
  if (stacks.length === 0) return 0;

  const itemGap = 10;
  const iconGap = 3.5;
  let cursorX = x;
  let cursorY = y;

  doc.font(fonts.regular).fontSize(options.fontSize);
  for (const stack of stacks) {
    const labelWidth = doc.widthOfString(stack);
    const itemWidth = options.iconSize + iconGap + labelWidth;
    if (cursorX > x && cursorX + itemWidth > x + width) {
      cursorX = x;
      cursorY += options.lineHeight;
    }

    if (draw) {
      drawStackIcon(doc, stack, cursorX, cursorY + 0.5, options.iconSize);
      doc
        .font(fonts.regular)
        .fontSize(options.fontSize)
        .fillColor("#333333")
        .text(stack, cursorX + options.iconSize + iconGap, cursorY + 0.2, {
          lineBreak: false,
          width: labelWidth + 1,
        });
    }
    cursorX += itemWidth + itemGap;
  }

  return cursorY - y + options.lineHeight;
}

function drawStackIcon(
  doc: PDFKit.PDFDocument,
  stack: string,
  x: number,
  y: number,
  size: number,
): void {
  const iconPath = resolveStackIconPath(stack);
  if (!iconPath || !fs.existsSync(iconPath)) {
    doc.circle(x + size / 2, y + size / 2, size * 0.28).fill("#333333");
    return;
  }

  let svg = stackSvgCache.get(iconPath);
  if (!svg) {
    svg = fs
      .readFileSync(iconPath, "utf8")
      .replace(/#f2f2f2/gi, "#333333");
    stackSvgCache.set(iconPath, svg);
  }

  doc.save();
  SVGtoPDF(doc as unknown as typeof PDFDocument, svg, x, y, {
    width: size,
    height: size,
    preserveAspectRatio: "xMidYMid meet",
    assumePt: true,
  });
  doc.restore();
}

function resolveStackIconPath(stack: string): string | undefined {
  if (!techStackIconPaths) {
    const config = JSON.parse(fs.readFileSync(techStackConfigPath, "utf8")) as {
      stacks: TechStackDefinition[];
    };
    techStackIconPaths = new Map<string, string | undefined>();
    for (const definition of config.stacks) {
      const iconPath = definition.icon
        ? path.resolve(
            process.cwd(),
            "assets",
            definition.icon.replace(/^\.\//, ""),
          )
        : undefined;
      techStackIconPaths.set(definition.name.toLowerCase(), iconPath);
      for (const alias of definition.aliases ?? []) {
        techStackIconPaths.set(alias.toLowerCase(), iconPath);
      }
    }
  }
  return techStackIconPaths.get(stack.toLowerCase());
}

function registerFonts(doc: PDFKit.PDFDocument): void {
  for (const [label, fontPath] of Object.entries(fontPaths)) {
    if (!fs.existsSync(fontPath)) {
      throw new Error(
        `Missing Wanted Sans font file for PDF resume: ${fontPath}`,
      );
    }
    doc.registerFont(fonts[label as keyof typeof fonts], fontPath);
  }
}

function addPage(doc: PDFKit.PDFDocument): void {
  doc.addPage({ margin: 0, size: "A4" });
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.page);
}

function contentWidth(doc: PDFKit.PDFDocument): number {
  return doc.page.width - PAGE_MARGIN_X * 2;
}
