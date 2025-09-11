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

// Auto-scroll gallery slider on mobile only
if (window.innerWidth <= 600) {
  const gallerySlider = document.querySelector('.gallery-slider');
  const galleryImages = document.querySelectorAll('.gallery-slider img');
  let currentGalleryIndex = 0;

  function showGalleryImage(index) {
    gallerySlider.style.transform = `translateX(-${index * 100}%)`;
  }

  if (gallerySlider && galleryImages.length > 1) {
    setInterval(() => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      showGalleryImage(currentGalleryIndex);
    }, 3000); // Change image every 3 seconds
  }
}
