"use strict";

AOS.init({
  // Global settings:
  disable: false,
  // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded',
  // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init',
  // class applied after initialization
  animatedClassName: 'aos-animate',
  // class applied on animation
  useClassNames: false,
  // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false,
  // disables automatic mutations' detections (advanced)
  debounceDelay: 50,
  // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99,
  // the delay on throttle used while scrolling the page (advanced)
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120,
  // offset (in px) from the original trigger point
  delay: 0,
  // values from 0 to 3000, with step 50ms
  duration: 800,
  // values from 0 to 3000, with step 50ms
  easing: 'ease',
  // default easing for AOS animations
  once: true,
  // whether animation should happen only once - while scrolling down
  mirror: false,
  // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation

}); // 點擊箭頭視窗向下緩慢滑動到target

$(document).on("click", ".link-arrow", function (e) {
  e.preventDefault();
  var target = $(this).attr("href"); // console.log(target);

  $('html,body').animate({
    scrollTop: $(target).offset().top
  }, 500);
}); // Swiper

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  }
});
$(document).ready(function () {
  // navbar 滾動超過導覽列高度增加陰影
  // $(window).scroll(function() {
  //   if ($(window).scrollTop() <= 0) {
  //     $('.navbar').removeClass('shadow-sm');
  //   }else {
  //     $('.navbar').addClass('shadow-sm');
  //   }
  // })
  // carousel 點擊更換大圖網址(切換圖片)
  function replaceUrl(e) {
    var carouselActive = document.querySelector('.carousel-item-active');
    var carouselArea = document.querySelector('.carousel');
    carouselArea.addEventListener('click', replaceUrl);
    console.log(e.target.getAttribute('src'));
    var url = e.target.getAttribute('src');

    if (e.target.classList.contains('carousel-items-img')) {
      console.log("點到我了");
      carouselActive.setAttribute('src', url);
    } // 避免轉址


    e.preventDefault();
  } // jq 寫法
  // $(".carousel-items a").click(function(event) {
  //   $(".carousel-item-active").attr("src", $(this).attr('href'));
  //   event.preventDefault(); // 避免轉址，也可使用 return false;
  // });
  // modal


  $('.modal').css('overflow-y', 'auto');
}); // Example starter JavaScript for disabling form submissions if there are invalid fields

(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation'); // Loop over them and prevent submission

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})(); // 滾動超過導覽列高度增加陰影


var navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
  var scrollTop = window.scrollY; // const navbarTop = navbar.offsetTop;

  var navbarHeight = navbar.offsetHeight;
  if (scrollTop > navbarHeight) navbar.classList.add('shadow-sm');else navbar.classList.remove('shadow-sm');
});
//# sourceMappingURL=all.js.map
