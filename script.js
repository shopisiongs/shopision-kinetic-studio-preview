const progressFill = document.getElementById('progress-fill');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progressFill.style.transform = `scaleX(${available > 0 ? Math.min(1, window.scrollY / available) : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  mobileNav.hidden = expanded;
});
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
});

const choices = {
  studio: {
    kicker: 'YOUR CREATIVE ENGINE',
    title: 'A partner for every next move.',
    text: 'Keep a stream of design and Shopify improvements moving with a focused team beside you.',
  },
  task: {
    kicker: 'ONE PROJECT, ONE CLEAR OUTCOME',
    title: 'Make one important thing happen.',
    text: 'Bring us a specific need. We shape the scope, build it with care and hand back something ready to use.',
  },
};
document.querySelectorAll('.choice-button').forEach((button) => {
  button.addEventListener('click', () => {
    const next = choices[button.dataset.mode];
    document.querySelectorAll('.choice-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('choice-kicker').textContent = next.kicker;
    document.getElementById('choice-title').textContent = next.title;
    document.getElementById('choice-text').textContent = next.text;
  });
});

const tiltCard = document.querySelector('[data-tilt]');
if (tiltCard && window.matchMedia('(hover: hover)').matches) {
  tiltCard.addEventListener('pointermove', (event) => {
    if (reduceMotion.matches) return;
    const box = tiltCard.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tiltCard.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
    tiltCard.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
  });
  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.setProperty('--tilt-x', '0deg');
    tiltCard.style.setProperty('--tilt-y', '0deg');
  });
}
