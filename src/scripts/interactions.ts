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

function setupPersonalGallery(gallery: HTMLElement): void {
  const viewport = gallery.querySelector<HTMLElement>('[data-gallery-viewport]');
  const track = gallery.querySelector<HTMLElement>('[data-gallery-track]');
  const items = [...gallery.querySelectorAll<HTMLElement>('[data-gallery-item]')];

  if (!viewport || !track || items.length === 0) return;

  const viewportElement = viewport;
  const trackElement = track;
  const autoplayDelay = 6500;
  const manualResumeDelay = 10000;
  const dragThreshold = 4;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let itemStep = 0;
  let sidePeek = 0;
  let activePointerId: number | null = null;
  let hasDragged = false;
  let isAnimating = false;
  let autoplayTimer = 0;
  let manualResumeTimer = 0;
  let manualResumeAt = 0;
  let resizeFrame = 0;
  let isPaused = false;
  let isLoopPrepared = false;

  function canSlide(): boolean {
    return items.length > 1 && itemStep > 0;
  }

  function readMetrics(): void {
    const firstItem = trackElement.querySelector<HTMLElement>('[data-gallery-item]');
    const trackStyle = getComputedStyle(trackElement);
    const viewportStyle = getComputedStyle(viewportElement);
    const gap = Number.parseFloat(trackStyle.columnGap) || 0;
    itemStep = firstItem ? firstItem.getBoundingClientRect().width + gap : 0;
    sidePeek = Number.parseFloat(viewportStyle.paddingInlineStart) || 0;

    if (items.length > 1 && !isLoopPrepared) {
      rotateBackward();
      isLoopPrepared = true;
    }

    setTrackOffset(canSlide() ? -itemStep : 0, false);
    commitTrackStyle();
  }

  function commitTrackStyle(): void {
    void trackElement.offsetWidth;
  }

  function disableTrackTransition(): void {
    trackElement.style.transition = 'none';
    commitTrackStyle();
  }

  function setTrackOffset(offset: number, animated: boolean): void {
    trackElement.style.transition = animated && !reducedMotion ? '' : 'none';
    commitTrackStyle();
    trackElement.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  function resetLoopPosition(offset: number, rotateItems: () => void): void {
    disableTrackTransition();
    rotateItems();
    trackElement.style.transform = `translate3d(${offset}px, 0, 0)`;
    commitTrackStyle();
  }

  function warmGalleryImages(): void {
    for (const image of trackElement.querySelectorAll<HTMLImageElement>('img')) {
      image.loading = 'eager';
      void image.decode().catch(() => undefined);
    }
  }

  function rotateForward(count = 1): void {
    for (let index = 0; index < count; index += 1) {
      const firstItem = trackElement.firstElementChild;
      if (firstItem) trackElement.append(firstItem);
    }
  }

  function rotateBackward(): void {
    const lastItem = trackElement.lastElementChild;
    if (lastItem) trackElement.prepend(lastItem);
  }

  function transitionDurationMs(): number {
    const [duration = '0s'] = getComputedStyle(trackElement).transitionDuration.split(',');
    return cssTimeToMs(duration);
  }

  function waitForTrackTransition(): Promise<void> {
    const duration = reducedMotion ? 0 : transitionDurationMs();
    if (duration <= 1) return Promise.resolve();

    return new Promise((resolve) => {
      let timer = 0;

      const complete = (): void => {
        trackElement.removeEventListener('transitionend', onTransitionEnd);
        if (timer) window.clearTimeout(timer);
        resolve();
      };

      const onTransitionEnd = (event: TransitionEvent): void => {
        if (event.target !== trackElement || event.propertyName !== 'transform') return;
        complete();
      };

      trackElement.addEventListener('transitionend', onTransitionEnd);
      timer = window.setTimeout(complete, duration + 80);
    });
  }

  async function animateTrackTo(offset: number): Promise<void> {
    setTrackOffset(offset, true);
    await waitForTrackTransition();
  }

  async function performSlideNext(): Promise<void> {
    await animateTrackTo(-itemStep * 2);
    resetLoopPosition(-itemStep, rotateForward);
  }

  async function performSlidePrevious(): Promise<void> {
    await animateTrackTo(0);
    resetLoopPosition(-itemStep, rotateBackward);
  }

  async function slideNext(): Promise<void> {
    if (isAnimating || !canSlide()) return;

    isAnimating = true;
    await performSlideNext();
    isAnimating = false;
  }

  async function settleDrag(): Promise<void> {
    const shouldMove = hasDragged && Math.abs(dragDeltaX) >= Math.max(dragThreshold, itemStep * 0.18);

    if (!shouldMove) {
      await animateTrackTo(-itemStep);
      isAnimating = false;
      return;
    }

    if (dragDeltaX < 0) {
      await animateTrackTo(-itemStep * 2);
      resetLoopPosition(-itemStep, rotateForward);
      isAnimating = false;
      return;
    }

    await animateTrackTo(0);
    resetLoopPosition(-itemStep, rotateBackward);
    isAnimating = false;
  }

  function stopAutoplay(): void {
    if (!autoplayTimer) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = 0;
  }

  function clearManualResumeTimer(): void {
    if (!manualResumeTimer) return;
    window.clearTimeout(manualResumeTimer);
    manualResumeTimer = 0;
  }

  function scheduleManualResume(): void {
    clearManualResumeTimer();
    if (!manualResumeAt) return;

    const remaining = manualResumeAt - Date.now();
    if (remaining <= 0) {
      startAutoplay();
      return;
    }

    manualResumeTimer = window.setTimeout(() => {
      manualResumeTimer = 0;
      startAutoplay();
    }, remaining);
  }

  function deferAutoplayAfterManualControl(): void {
    stopAutoplay();
    manualResumeAt = Date.now() + manualResumeDelay;
    scheduleManualResume();
  }

  function isGalleryHovered(): boolean {
    return finePointer && gallery.matches(':hover');
  }

  function startAutoplay(): void {
    stopAutoplay();
    if (reducedMotion || isPaused || isGalleryHovered() || document.hidden || isAnimating || !canSlide()) return;

    if (manualResumeAt) {
      const remaining = manualResumeAt - Date.now();
      if (remaining > 0) {
        scheduleManualResume();
        return;
      }

      manualResumeAt = 0;
      clearManualResumeTimer();
    }

    autoplayTimer = window.setInterval(() => {
      if (isGalleryHovered()) {
        isPaused = true;
        stopAutoplay();
        return;
      }

      void slideNext();
    }, autoplayDelay);
  }

  function restartAutoplay(): void {
    stopAutoplay();
    startAutoplay();
  }

  function scheduleMetricsRead(): void {
    if (resizeFrame) return;
    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0;
      readMetrics();
      restartAutoplay();
    });
  }

  viewportElement.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || isAnimating || !canSlide() || (event.pointerType === 'mouse' && event.button !== 0)) return;

    isAnimating = true;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragDeltaX = 0;
    hasDragged = false;
    isPaused = true;
    stopAutoplay();
    manualResumeAt = 0;
    clearManualResumeTimer();
    setTrackOffset(-itemStep, false);
    gallery.classList.add('is-dragging');
    viewportElement.setPointerCapture(event.pointerId);
  });

  function peekClickDirection(event: PointerEvent): 'previous' | 'next' | null {
    if (hasDragged || sidePeek <= 0) return null;

    const viewportRect = viewportElement.getBoundingClientRect();
    const clickX = event.clientX - viewportRect.left;

    if (clickX < sidePeek) {
      return 'previous';
    }

    if (clickX > viewportRect.width - sidePeek) {
      return 'next';
    }

    return null;
  }

  viewportElement.addEventListener('pointermove', (event) => {
    if (activePointerId !== event.pointerId) return;

    dragDeltaX = event.clientX - dragStartX;
    if (Math.abs(dragDeltaX) > dragThreshold) hasDragged = true;
    if (!hasDragged) return;

    event.preventDefault();
    setTrackOffset(-itemStep + dragDeltaX, false);
  });

  async function finishDrag(event: PointerEvent): Promise<void> {
    if (activePointerId !== event.pointerId) return;

    if (viewportElement.hasPointerCapture(event.pointerId)) {
      viewportElement.releasePointerCapture(event.pointerId);
    }

    activePointerId = null;
    gallery.classList.remove('is-dragging');

    const clickDirection = peekClickDirection(event);
    if (clickDirection) {
      if (clickDirection === 'previous') {
        await performSlidePrevious();
      } else {
        await performSlideNext();
      }

      isAnimating = false;
      isPaused = isGalleryHovered();
      deferAutoplayAfterManualControl();
      return;
    }

    if (!hasDragged) {
      isAnimating = false;
      isPaused = finePointer && gallery.matches(':hover');
      startAutoplay();
      return;
    }

    await settleDrag();

    isPaused = finePointer && gallery.matches(':hover');
    if (hasDragged) {
      deferAutoplayAfterManualControl();
      return;
    }

    startAutoplay();
  }

  viewportElement.addEventListener('pointerup', (event) => {
    void finishDrag(event);
  });
  viewportElement.addEventListener('pointercancel', (event) => {
    void finishDrag(event);
  });
  gallery.addEventListener('dragstart', (event) => event.preventDefault());

  if (finePointer) {
    const pauseOnHover = (): void => {
      isPaused = true;
      stopAutoplay();
    };

    const resumeAfterHover = (): void => {
      if (activePointerId !== null) return;
      if (isGalleryHovered()) return;
      isPaused = false;
      startAutoplay();
    };

    gallery.addEventListener('pointerenter', pauseOnHover);
    gallery.addEventListener('mouseenter', pauseOnHover);
    gallery.addEventListener('pointerleave', resumeAfterHover);
    gallery.addEventListener('mouseleave', resumeAfterHover);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  readMetrics();
  warmGalleryImages();
  startAutoplay();
  window.addEventListener('resize', scheduleMetricsRead);
}

for (const gallery of document.querySelectorAll<HTMLElement>('[data-personal-gallery]')) {
  setupPersonalGallery(gallery);
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
