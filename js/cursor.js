const glow = document.querySelector('.cursor-glow');
const follower = document.querySelector('.cursor-follower');

if (glow && follower) {
  window.addEventListener('mousemove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    follower.style.left = `${event.clientX}px`;
    follower.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .magnetic, .glass-card, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      follower.style.width = '2.2rem';
      follower.style.height = '2.2rem';
      follower.style.borderColor = 'rgba(59,130,246,.95)';
    });
    element.addEventListener('mouseleave', () => {
      follower.style.width = '1.25rem';
      follower.style.height = '1.25rem';
      follower.style.borderColor = 'rgba(255,255,255,.6)';
    });
  });
}
