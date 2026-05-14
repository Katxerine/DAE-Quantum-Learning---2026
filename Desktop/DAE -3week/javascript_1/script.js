/* =============================================
   THE ESL VOICE — script.js
   ============================================= */

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.card, .section-title, .section-sub, .section-label, .highlight-banner, .intro-text, .contact-grid, .hero-stats'
  );

  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---- Back to Top Button ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

/* ---- Sticky Header shadow on scroll ---- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/* ---- Newsletter Subscribe Form ---- */
function initSubscribeForm() {
  const btn = document.getElementById('subscribeBtn');
  const input = document.getElementById('email');
  const msg = document.getElementById('formMsg');
  if (!btn || !input || !msg) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();

    if (!email) {
      showFormMsg(msg, 'Please enter your email address.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMsg(msg, 'Please enter a valid email address.', 'error');
      return;
    }

    // Simulate submission
    btn.disabled = true;
    btn.textContent = 'Subscribing…';

    setTimeout(() => {
      input.value = '';
      btn.disabled = false;
      btn.textContent = 'Subscribe';
      showFormMsg(msg, '✓ You\'re subscribed! Thanks for joining.', 'success');
    }, 900);
  });

  // Allow Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const submitBtn = document.getElementById('contactSubmit');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const msgInput = document.getElementById('contactMsg');
  const formMsg = document.getElementById('contactFormMsg');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) {
      showFormMsg(formMsg, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMsg(formMsg, 'Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      nameInput.value = '';
      emailInput.value = '';
      msgInput.value = '';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      showFormMsg(formMsg, '✓ Message sent! We\'ll be in touch soon.', 'success');
    }, 1000);
  });
}

/* ---- Active Nav Highlight on Scroll ---- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const activeLink = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---- Helpers ---- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMsg(el, text, type) {
  el.textContent = text;
  el.style.color = type === 'error' ? '#e05555' : '#22a08d';
  setTimeout(() => { el.textContent = ''; }, 5000);
}

/* ---- Card hover stagger (subtle) ---- */
function initCardStagger() {
  document.querySelectorAll('.card-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.07}s`;
    });
  });
}

/* Active nav style */
const style = document.createElement('style');
style.textContent = `header nav a.active { color: #fff; background: rgba(255,255,255,0.12); }`;
document.head.appendChild(style);

/* ---- Init on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initBackToTop();
  initHeaderScroll();
  initSubscribeForm();
  initContactForm();
  initActiveNav();
  initCardStagger();

  console.log('✅ The ESL Voice — JavaScript loaded');
});
