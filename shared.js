function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.getElementById('moonIcon').classList.toggle('hidden', dark);
  document.getElementById('sunIcon').classList.toggle('hidden', !dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// Cursor blob — morphing lens that inverts the current theme
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const blob = document.createElement('div');
  blob.className = 'cursor-blob';
  document.body.appendChild(blob);

  let mouseX = -200, mouseY = -200;
  let blobX = -200, blobY = -200;
  let velX = 0, velY = 0;
  let firstMove = true;

  // Spring physics: higher stiffness = snappier / easier to fling around,
  // lower damping = more momentum, bounce and overshoot.
  const stiffness = 0.15;
  const damping = 0.65;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (firstMove) {
      blobX = mouseX;
      blobY = mouseY;
      velX = 0;
      velY = 0;
      firstMove = false;
    }
    blob.classList.add('visible');
  });

  document.addEventListener('mouseleave', function() {
    blob.classList.remove('visible');
  });

  (function animate() {
    // Accelerate toward the cursor, then apply damping — a damped spring.
    velX = (velX + (mouseX - blobX) * stiffness) * damping;
    velY = (velY + (mouseY - blobY) * stiffness) * damping;
    blobX += velX;
    blobY += velY;

    // Squash & stretch along the direction of travel, scaled by speed.
    const speed = Math.hypot(velX, velY);
    const angle = Math.atan2(velY, velX) * 180 / Math.PI;
    const stretch = Math.min(speed * 0.007, 0.25);

    blob.style.left = blobX + 'px';
    blob.style.top = blobY + 'px';
    blob.style.transform =
      'translate(-50%, -50%) rotate(' + angle + 'deg) scale(' +
      (1 + stretch) + ', ' + (1 - stretch) + ')';

    requestAnimationFrame(animate);
  })();
})();
