let isMenuOpen = false;

const contactForm = document.querySelector('[name=contactForm]')
const slideToLeft = document.querySelector('.slideToLeft');
const slideToRight = document.querySelector('.slideToRight');
const shoutoutSwipe = document.querySelector('.shoutoutSwipe');
const shoutouts = document.querySelector('.shoutouts');


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




const prefix = (data) => {
  switch (data.split(" ")[0].split("-")[1].split('')[1]) {
    case '1':
      if (data.split(" ")[0].split("-")[1].split('')[0] === '1') {
        return 'th'
      } else {
        return 'st'
      }
      break;

    case '2':
      if (data.split(" ")[0].split("-")[1].split('')[0] === '1') {
        return 'th'
      } else {
        return 'nd'
      }
      break;
    case '3':
      if (data.split(" ")[0].split("-")[1].split('')[0] === '1') {
        return 'th'
      } else {
        return 'nd'
      }
      break;

    default:
      return 'th'
      break;
  }
}



const birthdatShouts = async () => {
  fetch('https://bd.literesults.net/api/frontend/fetch_frontend_birthday_users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      let innerhtml = '';

      // <div class="absolute bottom-0 right-0 py-1 px-[10px] bg-[#FC9A04]">
      //           <p class="text-[#FFFBEA] font-normal text-[14px] leading-4">Send Gift</p>
      //         </div>

      data.data.forEach(el => {
        innerhtml += `
          <div class="carousel-item w-[259px] h-[254px] rounded-[14px] p-[10px] bg-[#F6F6F6] flex-col flex gap-[18px] ">
            <div class="relative w-[239px] h-[176px] rounded-[14px] bg-[#121212] overflow-hidden">
              <img src='${el.avatar}' alt="celebrant picture" class="w-[241px] h-[180px] object-cover">
            </div>
            <div class="w-full gap-2">
              <div class="flex gap-[12px]">
                <p class="text-[14px] text-[#6D6D6D] font-normal">Celebrant</p>
                <p class="text-[14px] text-[#6D6D6D] font-semibold">${el.fname} ${el.lname}</p>
              </div>
              <div class="flex gap-[12px]">
                <p class="text-[14px] text-[#6D6D6D] font-normal">Birthday Date</p>
                <p class="text-[14px] text-[#6D6D6D] font-semibold">${el.dob.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        `
      });

      slideToLeft.innerHTML = innerhtml
      slideToRight.innerHTML = innerhtml

    })
    .catch(error => {
      console.error('Error:', error);
    });
}



const shouts = async () => {
  fetch('https://bd.literesults.net/api/frontend/fetch_frontend_shoutouts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      let innerHtmlSwiper = '';
      let innerHtml = '';



      data.data.data.forEach(el => {
        innerHtmlSwiper += `
            <div class="swiper-slide bg-white rounded-xl w-72 flex-shrink-0">
              <div class="bg-[#F6F6F6] p-2.5 rounded-xl text-left">
                <img src="${el.user.avatar}" alt="" class="rounded-xl w-full h-40 object-cover">
                <p class="pt-2 text-[#6D6D6D]">Celebrant: <span class="font-semibold text-[#3D3D3D]">${el.user.fname} ${el.user.lname}</span></p>
              </div>
              <div class="text-left p-4">
                <h2 class="text-[#FC9A04] font-semibold">Shoutout Message</h2>
                <p class="text-[#3D3D3D] text-sm">${el.message}</p>
              </div>
            </div>
        `
      });



      data.data.data.forEach(el => {
        innerHtml += `
          <div class="bg-[#FFFFFF] rounded-xl w-full max-w-xs mx-auto h-auto flex flex-col">
            <div class="bg-[#F6F6F6] p-2.5 rounded-xl text-left">
              <img src="${el.user.avatar}" alt="" class="rounded-xl w-full h-40 object-cover">
              <p class="pt-2 text-[#6D6D6D]">Celebrant: <span class="font-semibold text-[#3D3D3D]">${el.user.fname} ${el.user.lname}</span></p>
            </div>
            <div class="text-left p-4">
              <h2 class="text-[#FC9A04] font-semibold">Shoutout Message</h2>
              <p class="text-[#3D3D3D] text-sm">${el.message}</p>
            </div>
          </div>
        `
      });

      shoutoutSwipe.innerHTML = innerHtmlSwiper
      shoutouts.innerHTML = innerHtml

    })
}


// /frontend/fetch_frontend_shoutouts


birthdatShouts()
shouts()


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


