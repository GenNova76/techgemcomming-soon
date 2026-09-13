const form = document.getElementById('notifyForm');
const nextUrl = document.getElementById('nextUrl');
const note = document.getElementById('formNote');

if (form && nextUrl) {
  nextUrl.value = window.location.href.split('#')[0] + '#notified';

  form.addEventListener('submit', () => {
    note.textContent = 'Sending your notification request…';
  });
}

// Launch countdown: September 24, 2026 at 12:00 AM IST.
const launchTime = new Date('2026-09-24T00:00:00+05:30').getTime();
const countdown = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const remaining = Math.max(0, launchTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  countdown.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
  countdown.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
  countdown.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  countdown.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');

  if (remaining <= 0) {
    document.querySelector('.launch-date').textContent = 'TechGem is live.';
  }
}

if (countdown.days) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Small parallax movement keeps the 3D centerpiece alive without a heavy library.
const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    visual.style.transform = `translate(-50%, -50%) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
}
