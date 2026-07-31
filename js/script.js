document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const interactiveCards = document.querySelectorAll('.glass-card, .project-card, .placeholder-card, .contact-card, .timeline-card');
  const body = document.body;
  if (loadingScreen) {
    window.setTimeout(() => loadingScreen.classList.add('hidden'), 700);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const progressBar = document.querySelector('.progress-bar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? scrollTop / height : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const typing = document.querySelector('.typing-effect');
  if (typing) {
    const phrases = typing.dataset.phrases.split(',');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = phrases[phraseIndex];
      typing.textContent = current.slice(0, charIndex);
      if (!deleting && charIndex < current.length) {
        charIndex += 1;
      } else if (!deleting && charIndex === current.length) {
        deleting = true;
        window.setTimeout(type, 1400);
        return;
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      window.setTimeout(type, deleting ? 60 : 90);
    };

    type();
  }

  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--card-tilt-x', `${((y / rect.height) - 0.5) * 6}deg`);
      card.style.setProperty('--card-tilt-y', `${((x / rect.width) - 0.5) * -6}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--card-tilt-x');
      card.style.removeProperty('--card-tilt-y');
    });
  });

  document.addEventListener('mousemove', (event) => {
    body.style.setProperty('--pointer-x', `${event.clientX}px`);
    body.style.setProperty('--pointer-y', `${event.clientY}px`);
  });

  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = `${value}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    };

    window.requestAnimationFrame(step);
  });
});
