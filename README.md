# mercen.net

이석호의 개인 포트폴리오 사이트입니다. Astro 기반 정적 사이트로 빌드되며, 프로필, 학력, 경력, 수상, 프로젝트, 자격 정보를 `assets/`의 Markdown과 JSON 데이터에서 읽어 렌더링합니다.

## Stack

- Astro 6
- TypeScript
- pnpm 11
- GitHub Pages

## Requirements

- Node.js 22.13.0 이상
- pnpm 11.5.3

Corepack을 사용하면 프로젝트에 선언된 pnpm 버전을 맞출 수 있습니다.

```bash
corepack enable
corepack prepare pnpm@11.5.3 --activate
```

## Development

```bash
pnpm install
pnpm run dev
```

기본 개발 서버는 Astro 기본값인 `http://localhost:4321`에서 실행됩니다.

## Scripts

```bash
pnpm run dev      # 로컬 개발 서버 실행
pnpm run check    # Astro 타입/구성 검사
pnpm run build    # 검사 후 정적 사이트 빌드
pnpm run preview  # 빌드 결과 로컬 미리보기
```

## Content

주요 콘텐츠는 코드가 아니라 `assets/` 아래 데이터 파일로 관리합니다.

- `assets/main.md`: 소개, 연락처, 외부 링크
- `assets/educations.json`: 학력
- `assets/career.json`: 경력
- `assets/awards.json`: 수상
- `assets/licenses.json`: 자격
- `assets/tech_stacks.json`: 기술 스택과 아이콘 매핑
- `assets/projects/team/*.md`: 팀 프로젝트
- `assets/projects/personal/*.md`: 개인 프로젝트
- `assets/icons/`: UI 아이콘과 기술 스택 아이콘
- `assets/images/`: Astro 이미지 파이프라인으로 처리되는 이미지
- `public/`: 원본 그대로 배포되는 정적 파일, CNAME, favicon, OG 이미지, 폰트

Markdown 본문과 JSON 문자열에서는 `./career.json#/0`, `./awards.json#/2`처럼 같은 `assets/` 기준 경로와 JSON Pointer를 사용해 항목을 참조할 수 있습니다. 참조 대상이 잘못되면 콘텐츠 로딩 과정에서 오류가 발생하도록 되어 있습니다.

학력 JSON과 프로젝트 Markdown frontmatter의 `logo_image`에는 `./images/education/dgsw.webp`, `../../images/projects/app-pilot.webp`처럼 `assets/` 안의 이미지 상대 경로를 넣어 홈페이지 로고를 데이터로 연결합니다.

프로젝트 Markdown frontmatter의 `mockup_images`에는 `./app-pilot/app-pilot-1.webp`처럼 해당 프로젝트 Markdown 파일 기준 상대 경로를 배열로 넣어 상세 영역의 스크린샷/목업을 연결합니다.

## Build Output

빌드 결과물은 `dist/`에 생성됩니다. `dist/`, `.astro/`, `node_modules/`는 재생성 가능한 산출물이므로 Git에 포함하지 않습니다.

## Deployment

`main` 브랜치에 push되면 `.github/workflows/deploy.yml`이 `pnpm run build`를 실행하고 GitHub Pages에 배포합니다. 도메인 설정은 `public/CNAME`의 `mercen.net` 값을 사용합니다.
