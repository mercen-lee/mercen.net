import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const collapsibleRecords = [...document.querySelectorAll<HTMLDetailsElement>('[data-collapsible-record]')];
const recordResizeTimers = new WeakMap<HTMLDetailsElement, number>();
const lenis = reducedMotion
  ? null
  : new Lenis({
      autoRaf: true,
      lerp: 0.085,
      overscroll: false,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
let pointerFrame = 0;
let pointerX = window.innerWidth * 0.5;
let pointerY = window.innerHeight * 0.3;

function applyPointerBackground(): void {
  pointerFrame = 0;
  root.style.setProperty('--pointer-x', `${pointerX.toFixed(1)}px`);
  root.style.setProperty('--pointer-y', `${pointerY.toFixed(1)}px`);
  root.style.setProperty('--pointer-light-alpha', '0.085');
}

function schedulePointerBackground(event: PointerEvent): void {
  pointerX = event.clientX;
  pointerY = event.clientY;

  if (pointerFrame) return;
  pointerFrame = window.requestAnimationFrame(applyPointerBackground);
}

function hidePointerBackground(): void {
  if (pointerFrame) {
    window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
  }
  root.style.setProperty('--pointer-light-alpha', '0');
}

if (finePointer && !reducedMotion) {
  window.addEventListener('pointermove', schedulePointerBackground, { passive: true });
  window.addEventListener(
    'pointerout',
    (event) => {
      if (!event.relatedTarget) hidePointerBackground();
    },
    { passive: true },
  );
  window.addEventListener('blur', hidePointerBackground);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hidePointerBackground();
  });
}

function cssTimeToMs(value: string): number {
  const trimmed = value.trim();
  if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed);
  if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000;
  return Number.parseFloat(trimmed) || 0;
}

function recordResizeDurationMs(): number {
  return cssTimeToMs(getComputedStyle(root).getPropertyValue('--resize-dur')) || 300;
}

function clearRecordResize(record: HTMLDetailsElement): void {
  const timer = recordResizeTimers.get(record);
  if (timer) window.clearTimeout(timer);
  recordResizeTimers.delete(record);
  record.classList.remove('is-resizing');
  record.style.height = '';
}

function closeOtherRecords(activeRecord: HTMLDetailsElement): void {
  for (const record of collapsibleRecords) {
    if (record === activeRecord) continue;
    clearRecordResize(record);
    record.open = false;
  }
}

function collapsibleRecordForTarget(target: HTMLElement): HTMLDetailsElement | null {
  if (target instanceof HTMLDetailsElement && target.matches('[data-collapsible-record]')) return target;
  return target.closest<HTMLDetailsElement>('[data-collapsible-record]');
}

function scrollRecordToTop(record: HTMLDetailsElement): void {
  scrollToElement(record);
}

function animateRecordHeight(
  record: HTMLDetailsElement,
  startHeight: number,
  endHeight: number,
  shouldRemainOpen: boolean,
): void {
  if (reducedMotion || startHeight === endHeight) {
    record.open = shouldRemainOpen;
    clearRecordResize(record);
    return;
  }

  record.classList.add('is-resizing');
  record.style.height = `${startHeight}px`;
  void record.offsetHeight;
  record.style.height = `${endHeight}px`;

  const complete = (): void => {
    record.open = shouldRemainOpen;
    clearRecordResize(record);
    refreshScrollMetrics();
  };

  const onTransitionEnd = (event: TransitionEvent): void => {
    if (event.target !== record || event.propertyName !== 'height') return;
    record.removeEventListener('transitionend', onTransitionEnd);
    complete();
  };

  record.addEventListener('transitionend', onTransitionEnd);
  const timer = window.setTimeout(() => {
    record.removeEventListener('transitionend', onTransitionEnd);
    complete();
  }, recordResizeDurationMs() + 80);
  recordResizeTimers.set(record, timer);
}

function openRecord(record: HTMLDetailsElement, scrollToTop: boolean): void {
  clearRecordResize(record);
  closeOtherRecords(record);

  if (record.open) {
    if (scrollToTop) scrollRecordToTop(record);
    return;
  }

  const startHeight = record.offsetHeight;
  record.open = true;
  const endHeight = record.offsetHeight;

  animateRecordHeight(record, startHeight, endHeight, true);
  if (scrollToTop) window.requestAnimationFrame(() => scrollRecordToTop(record));
}

function closeRecord(record: HTMLDetailsElement): void {
  if (!record.open) return;

  clearRecordResize(record);
  const startHeight = record.offsetHeight;
  record.open = false;
  const endHeight = record.offsetHeight;
  record.open = true;

  animateRecordHeight(record, startHeight, endHeight, false);
}

function toggleRecord(record: HTMLDetailsElement): void {
  if (record.open) {
    closeRecord(record);
    return;
  }

  openRecord(record, true);
}

function openRecordForTarget(target: HTMLElement): void {
  const record = collapsibleRecordForTarget(target);
  if (record) openRecord(record, false);
}

function targetFromHash(hash: string): HTMLElement | null {
  if (!hash || hash === '#') return null;

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return document.getElementById(hash.slice(1));
  }
}

function highlightTarget(target: HTMLElement): void {
  const highlightElement = target.matches('[data-highlight-target]')
    ? target
    : target.querySelector<HTMLElement>('[data-highlight-target]');

  if (!highlightElement) return;

  highlightElement.classList.remove('is-highlighted');
  window.requestAnimationFrame(() => {
    highlightElement.classList.add('is-highlighted');
    window.setTimeout(() => highlightElement.classList.remove('is-highlighted'), 950);
  });
}

function scrollToTarget(target: HTMLElement, hash: string, updateHistory: boolean): void {
  openRecordForTarget(target);

  scrollToElement(target);

  highlightTarget(target);
  const navHash = navHashForTarget(target);
  if (navHash) holdActiveNav(navHash);

  if (updateHistory && window.location.hash !== hash) {
    history.pushState(null, '', hash);
  }
}

for (const record of collapsibleRecords) {
  const summary = record.querySelector<HTMLElement>('summary');
  summary?.addEventListener('click', (event) => {
    if ((event.target as Element | null)?.closest('a')) return;
    event.preventDefault();
    toggleRecord(record);
  });
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute('href') ?? '';
  const target = targetFromHash(hash);
  if (!target) return;

  event.preventDefault();
  scrollToTarget(target, hash, true);
});

window.addEventListener('hashchange', () => {
  const target = targetFromHash(window.location.hash);
  if (target) scrollToTarget(target, window.location.hash, false);
});

if (window.location.hash) {
  window.requestAnimationFrame(() => {
    const target = targetFromHash(window.location.hash);
    if (target) scrollToTarget(target, window.location.hash, false);
  });
}

function updateProgress(): void {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  root.style.setProperty('--scroll-progress', progress.toFixed(4));
}

function updateScrollDrivenState(): void {
  updateProgress();
  scheduleActiveNavUpdate();
}

function refreshScrollMetrics(): void {
  lenis?.resize();
  updateScrollDrivenState();
}

function scrollToElement(target: HTMLElement): void {
  if (lenis) {
    lenis.scrollTo(target);
    return;
  }

  target.scrollIntoView({
    block: 'start',
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', refreshScrollMetrics);

const navLinks = new Map(
  [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')].map((link) => [link.hash, link]),
);

const sections = [...document.querySelectorAll<HTMLElement>('[data-nav-section]')];
let activeNavFrame = 0;
let activeNavHoldTimer = 0;

function setActiveNav(hash: string): void {
  for (const [linkHash, link] of navLinks) {
    link.classList.toggle('is-active', linkHash === hash);
  }
}

function navHashForTarget(target: HTMLElement): string | null {
  const section = target.matches('[data-nav-section]')
    ? target
    : target.closest<HTMLElement>('[data-nav-section]');
  return section ? `#${section.id}` : null;
}

function currentSectionHash(): string | null {
  const firstSection = sections[0];
  if (!firstSection) return null;

  const lastSection = sections.at(-1);
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    return lastSection ? `#${lastSection.id}` : null;
  }

  const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 320);
  let current = firstSection;

  for (const section of sections) {
    if (section.offsetTop > marker) break;
    current = section;
  }

  return `#${current.id}`;
}

function updateActiveNav(): void {
  if (activeNavHoldTimer) return;

  const hash = currentSectionHash();
  if (hash) setActiveNav(hash);
}

function scheduleActiveNavUpdate(): void {
  if (activeNavHoldTimer || activeNavFrame) return;

  activeNavFrame = window.requestAnimationFrame(() => {
    activeNavFrame = 0;
    updateActiveNav();
  });
}

function releaseActiveNavHold(): void {
  if (activeNavHoldTimer) window.clearTimeout(activeNavHoldTimer);
  activeNavHoldTimer = 0;
  updateActiveNav();
}

function holdActiveNav(hash: string): void {
  setActiveNav(hash);

  if (activeNavHoldTimer) window.clearTimeout(activeNavHoldTimer);
  activeNavHoldTimer = window.setTimeout(releaseActiveNavHold, reducedMotion ? 80 : 1400);
}

updateActiveNav();
window.addEventListener('scroll', scheduleActiveNavUpdate, { passive: true });
window.addEventListener('scrollend', releaseActiveNavHold);
window.addEventListener('resize', scheduleActiveNavUpdate);
lenis?.on('scroll', updateScrollDrivenState);

const revealItems = [...document.querySelectorAll<HTMLElement>('.reveal')];
if (reducedMotion) {
  for (const item of revealItems) item.classList.add('is-visible');
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1,
    },
  );

  for (const item of revealItems) revealObserver.observe(item);
}
