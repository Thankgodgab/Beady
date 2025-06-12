let isMenuOpen = false;

  function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
    isMenuOpen = menu.classList.contains('open');
  }

  // Closes the menu on scroll
  window.addEventListener('scroll', () => {
    const menu = document.getElementById('mobile-menu');
    if (isMenuOpen) {
      menu.classList.remove('open');
      isMenuOpen = false;
    }
  });

//  functon closes the menu when a link is clicked 
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#mobile-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        menu.classList.remove('open');
        isMenuOpen = false;
      });
    });
  });

const swiper = new Swiper('.swiper', {
  slidesPerView: 1.2,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});