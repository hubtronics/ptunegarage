// Booking form handler
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

// Map modal open/close
document.getElementById('openMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'flex';
};
document.getElementById('closeMap').onclick = function() {
  document.getElementById('mapModal').style.display = 'none';
};
document.getElementById('mapModal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};

// Smooth scroll and nav highlight
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Gallery fade effect on mobile
if (window.innerWidth <= 600) {
  const galleryFade = document.querySelector('.gallery-fade');
  const galleryImages = document.querySelectorAll('.gallery-fade img');
  let currentGalleryIndex = 0;

  function showFadeImage(index) {
    galleryImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  if (galleryFade && galleryImages.length > 1) {
    showFadeImage(currentGalleryIndex);
    setInterval(() => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      showFadeImage(currentGalleryIndex);
    }, 3000);
  }
}
