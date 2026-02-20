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

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    blob.classList.add('visible');
  });

  document.addEventListener('mouseleave', function() {
    blob.classList.remove('visible');
  });

  (function animate() {
    blobX += (mouseX - blobX) * 0.12;
    blobY += (mouseY - blobY) * 0.12;
    blob.style.left = blobX + 'px';
    blob.style.top = blobY + 'px';
    requestAnimationFrame(animate);
  })();
})();
