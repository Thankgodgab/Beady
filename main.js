let isMenuOpen = false;

const contactForm = document.querySelector('[name=contactForm]')

console.log(contactForm);


const serialize = (form) => {
  var result = [];
  if (typeof form === "object" && form.nodeName === "FORM")
    Array.prototype.slice.call(form.elements).forEach(function (control) {
      if (
        control.name &&
        !control.disabled &&
        ["reset", "submit", "button"].indexOf(control.type) === -1
      )
        if (control.type === "select-multiple")
          Array.prototype.slice
            .call(control.options)
            .forEach(function (option) {
              if (option.selected)
                result.push(control.name + "=" + option.value);
            });
        else if (
          ["checkbox", "radio"].indexOf(control.type) === -1 ||
          control.checked
        )
          result.push(control.name + "=" + control.value);
    });
  var data = result.join("&").replace(/%20/g, "+");

  const serializeToJSON = (str) =>
    str
      .split("&")
      .map((x) => x.split("="))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: isNaN(value) ? value : value,
        }),
        {}
      );

  return serializeToJSON(data);
};



contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = serialize(e.target);
  fetch('https://bd.literesults.net/api/frontend/save_contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      e.target.reset()
      Swal.fire({
        title: "Thank!",
        text: "Your message has been sent",
        icon: "success",
        confirmButtonText: 'Close',
        confirmButtonColor: "#FFA046FF",
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


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


