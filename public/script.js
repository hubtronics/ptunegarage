document.getElementById('bookingForm').onsubmit = function(e) {
  e.preventDefault();
  fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      document.getElementById('bookingSuccess').style.display = 'block';
      this.reset();
    }
  });
};

// Map modal open/close code
document.getElementById('openMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'flex';
};
document.getElementById('closeMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'none';
};
document.getElementById('mapModal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Smooth scroll and active nav highlight
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      // Remove active from all nav links
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      // Add active to clicked link
      this.classList.add('active');
      // Scroll to section smoothly
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
