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
"use strict";

// URL
var BASE_URL = "https://data.coa.gov.tw";
var INDEX_URL = BASE_URL + "/api/v1/AnimalRecognition/";
var MODAL_URL = "".concat(INDEX_URL, "?animal_id="); // Data

var data = [];
var filteredData = [];
var dogColour = ["咖啡色", "黑黃色", "黑棕色", "黑色", "黑白色", "棕黑色", "白色", "棕色", "黃色", "灰色", "虎斑色", "花色", "米色", "黑灰色", "黃白色", "棕白色", "黃虎斑色", "虎斑白色", "棕灰色", "黑虎斑色", "三花色", "灰白色", "花白色", "咖啡白色", "灰黑色", "咖啡棕色", "咖啡黑色"];
var catColour = ["虎斑色", "三花色", "黑白色", "黑黃色", "黑色", "虎斑白色", "黃白色", "花色", "黃虎斑色", "黃色", "灰白色", "黑虎斑色", "黑棕色", "灰色", "白色", "灰黑色", "咖啡棕色", "米色", "棕灰色", "黑灰色", "咖啡黑色", "棕黑色", "咖啡色", "花白色", "棕色", "棕白色"];
var otherColour = ["白色", "黑色"];
var shelter = ["新北市板橋區公立動物之家", "屏東縣公立犬貓中途之家", "臺北市動物之家", "臺東縣動物收容中心", "彰化縣流浪狗中途之家", "桃園市動物保護教育園區", "澎湖縣流浪動物收容中心", "新北市中和區公立動物之家", "基隆市寵物銀行", "花蓮縣流浪犬中途之家", "苗栗縣生態保育教育中心(動物收容所)", "雲林縣流浪動物收容所", "宜蘭縣流浪動物中途之家", "高雄市燕巢動物保護關愛園區", "臺南市動物之家善化站", "新北市八里區公立動物之家", "臺南市動物之家灣裡站", "新竹縣公立動物收容所", "金門縣動物收容中心", "高雄市壽山動物保護教育園區", "新竹市動物保護教育園區", "南投縣公立動物收容所", "新北市五股區公立動物之家", "臺中市動物之家后里園區", "新北市新店區公立動物之家", "新北市淡水區公立動物之家", "新北市政府動物保護防疫處", "嘉義縣流浪犬中途之家", "新北市瑞芳區公立動物之家", "嘉義市動物保護教育園區", "臺中市動物之家南屯園區", "連江縣流浪犬收容中心", "新北市三芝區公立動物之家"]; // DOM

var animalKind = document.querySelector('#animalKind');
var animalColour = document.querySelector('#animalColour');
var displayMode = document.querySelector("#display-mode-container");
var cardMode = document.querySelector("#card-mode");
var listMode = document.querySelector("#list-mode");
var table = document.querySelector(".table");
var displayCard = document.querySelector("#displayCard");
var displaylList = document.querySelector("#displaylList");
var displaylListSmall = document.querySelector("#displayListSmall");
var modalApi = document.querySelector(".modal-api");
var dataPanel = document.querySelector("#dataPanel"); // const paginator = document.querySelector("#paginator");
// Status

var MOVIES_PER_PAGE = 36; //希望一頁有幾個電影卡片

var MODE = "list"; //預設模式為卡片模式

var NOW_PAGE = 1; //存放當前頁面
// 監聽

animalKind.addEventListener('change', changeColourOption); // 篩選 點選動物種類時顯示該動物類別的毛色供查詢

function changeColourOption() {
  var colourOptions = "<option value=\"\u52D5\u7269\u6BDB\u8272\" selected>- \u52D5\u7269\u6BDB\u8272 -</option>";

  if (animalKind.value === "犬") {
    dogColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
    animalColour.innerHTML = colourOptions;
  } else if (animalKind.value === "貓") {
    catColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
    animalColour.innerHTML = colourOptions;
  } else {
    otherColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
    animalColour.innerHTML = colourOptions;
  }
} // 篩選 渲染收容所名稱


var shelterName = document.querySelector('#shelterName');

function renderShelterName() {
  var str = "<option value=\"\u6536\u5BB9\u6240\" selected>- \u6536\u5BB9\u6240 -</option>";
  shelter.forEach(function (i) {
    str += "<option value=\"".concat(i, "\">").concat(i, "</option>");
  });
  shelterName.innerHTML = str;
} // 渲染資料畫面至卡片或清單，需判斷狀態，並渲染該模式的型態


function renderAnimalList(data) {
  var rawHTML = "";
  var rawHTML1 = ""; //如果MODE為'card'就渲染卡片模式

  if (MODE === "card") {
    //讓使用者知道當前顯示模式
    table.classList.add("d-none");
    cardMode.classList.add("text-warning");
    listMode.classList.remove("text-warning");
    data.forEach(function (i) {
      rawHTML += "<li class=\"card-group-item col-6 col-md-4 col-lg-3 mb-10 hvr-bob\">\n      <div class=\"card shadow bg-gray-100\">\n        <h4 class=\"text-center bg-warning\">".concat(i.animal_id, "</h4>\n        <div class=\"custom-adopt-card-img-top\"\n          style=\"background: url(").concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n        </div>\n        <ul class=\"card-body py-3 px-3 px-lg-4\">\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u985E\u5225: </span>").concat(i.animal_kind, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6BDB\u8272: </span>").concat(i.animal_colour, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6027\u5225: </span>").concat(i.animal_sex, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u5C0B\u7372\u5730: </span>").concat(i.animal_foundplace, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6211\u5728: </span>\n            <p class=\"d-block\">").concat(i.shelter_name, "</p>\n          </li>\n        </ul>\n        <div class=\"bg-white d-flex mt-auto\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, "\n            class=\"btn-detail-modal d-flex justify-content-center align-items-center card-link w-50 py-3\">\n            <p>\u8A73\u7D30\u8CC7\u6599</p>\n          </a>\n          <a href=\"#\" class=\"card-link w-50 text-center text-secondary py-3\">\n            <p>\u6211\u6709\u610F\u9858\u8A8D\u990A</p>\n          </a>\n        </div>\n      </div>\n    </li>");
    });
    displayCard.innerHTML = rawHTML; //如果MODE為'list'就渲染清單模式
  } else if (MODE === "list") {
    displayCard.innerHTML = "";
    table.classList.remove("d-none");
    cardMode.classList.remove("text-warning");
    listMode.classList.add("text-warning");
    data.forEach(function (i) {
      rawHTML1 += "<div class=\"row d-flex justify-content-center align-items-center border-top py-2\">\n      <div class=\"col-3 table-adopt-img\"\n        style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n      </div>\n      <ul class=\"col-6\">\n        <li>\n          <span class=\"font-weight-bold\">\u985E\u5225: </span>").concat(i.animal_kind, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6BDB\u8272: </span>").concat(i.animal_colour, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6027\u5225: </span>").concat(i.animal_sex, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6211\u5728: </span>\n          <p>").concat(i.shelter_name, "</p>\n        </li>\n      </ul>\n      <div class=\"col-3\">\n        <div class=\"bg-white d-flex align-items-center row\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, " class=\"col-12 btn btn-warning mb-1\">\u770B\u8A73\u7D30</a>\n          <a href=\"#\" class=\"btn btn-block btn-secondary col-12\">\u6B32\u8A8D\u990A</a>\n        </div>\n      </div>\n    </div>");
    });
    displayListSmall.innerHTML = rawHTML1;
    data.forEach(function (i) {
      rawHTML += "<tr>\n      <th scope=\"row d-flex flex-column justify-content-center\">\n        <div class=\"table-adopt-img\"\n          style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n        </div>\n      </th>\n      <td class=\"align-middle\">").concat(i.animal_kind, "</td>\n      <td class=\"align-middle\">").concat(i.animal_colour, "</td>\n      <td class=\"align-middle\">").concat(i.animal_sex, "</td>\n      <td class=\"align-middle\">").concat(i.shelter_name, "</td>\n      <td class=\"align-middle\">\n        <div class=\"bg-white d-flex align-items-center\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, " class=\"btn-detail-modal btn btn-warning w-50 mr-2 \">\n            \u8A73\u7D30\u8CC7\u6599\n          </a>\n          <a href=\"#\" class=\"btn btn-block btn-secondary w-50\">\u6211\u6709\u610F\u9858\u8A8D\u990A</a>\n        </div>\n      </td>\n    </tr>");
    });
    displayList.innerHTML = rawHTML;
  }
} // 渲染 modal 畫面 用 fetch 配合動物流水編號取得特定動物資料


function renderDetailModal(id) {
  fetch(MODAL_URL + id).then(function (res) {
    return res.json();
  }).then(function (getData) {
    console.log(getData.Data);
    console.log(MODAL_URL + id);
    var modalData = getData.Data; // 將資料做中文處理

    if (modalData[0].album_file === "") {
      modalData[0].album_file = "./assets/images/noimg.png";
    }

    if (modalData[0].animal_sterilization === "T") {
      modalData[0].animal_sterilization = "已絕育";
    } else if (modalData[0].animal_sterilization === "F") {
      modalData[0].animal_sterilization = "尚未絕育";
    }

    switch (modalData[0].animal_bodytype) {
      case "BIG":
        modalData[0].animal_bodytype = "大型";
        break;

      case "MEDIUM":
        modalData[0].animal_bodytype = "中型";
        break;

      case "SMALL":
        modalData[0].animal_bodytype = "小型";
        break;
    }

    if (modalData[0].animal_sex === "F") {
      modalData[0].animal_sex = "母";
    } else if (modalData[0].animal_sex === "M") {
      modalData[0].animal_sex = "公";
    }

    var str = "";
    modalData.forEach(function (i) {
      str += "<div\n      class=\"d-flex flex-column justify-content-center bg-gray-100 col-12 col-md-6 mb-3 mb-md-0 shadow modal-adopt-img-container\">\n      <div class=\"modal-adopt-img-height\" id=\"adopt-modal-img\"\n        style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n      </div>\n    </div>\n    <div class=\"col-12 col-md-5 ml-3 d-flex flex-column justify-content-center font-s font-md-base\">\n      <ul>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5165\u6240\u5929\u6578 : </span>").concat(calcInShelterDays(i.animal_createtime), " \u5929\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5165\u6240\u65E5\u671F : </span><em>").concat(i.animal_createtime, "</em>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5C0B\u7372\u5730 : </span>").concat(i.animal_foundplace, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\"></span>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6D41\u6C34\u7DE8\u865F : </span>").concat(i.animal_id, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u7DE8\u865F : </span>").concat(i.animal_subid, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u52D5\u7269\u54C1\u7A2E : </span>").concat(i.animal_kind, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6027\u5225 : </span>").concat(i.animal_sex, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6BDB\u8272 : </span>").concat(i.animal_colour, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u9AD4\u578B : </span>").concat(i.animal_bodytype, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u662F\u5426\u7D55\u80B2 : </span>").concat(i.animal_sterilization, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\"></span>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6240\u5728\u6536\u5BB9\u6240 : </span>").concat(i.shelter_name, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u6240\u96FB\u8A71 : </span>").concat(i.shelter_tel, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u6240\u5730\u5740 : </span>").concat(i.shelter_address, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1 \">\u5099\u8A3B : </span>").concat(i.animal_remark, "\n        </li>\n      </ul>\n    </div>");
    });
    modalApi.innerHTML = str;
  });
} // 當點擊到"詳細資料"按鈕 彈出對應動物 id 的 MODAL


dataPanel.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.matches('.btn-detail-modal')) {
    renderDetailModal(e.target.dataset.id);
  }
}); // 計算入所天數

function calcInShelterDays(moveInShelterDay) {
  var todayDate = new Date();
  var str = moveInShelterDay.replace("-", "/");
  var openDate = new Date(str);
  console.log(todayDate, openDate);
  var days = parseInt(Math.abs(todayDate - openDate) / 1000 / 60 / 60 / 24);
  return days;
} // calcInShelterDays("2021/09/24");
// 圖卡及清單模式切換


displayMode.addEventListener('click', function displayModeSwitch(e) {
  e.preventDefault();

  if (e.target.matches("#card-mode")) {
    MODE = "card";
    renderAnimalList(data);
  } else if (e.target.matches("#list-mode")) {
    MODE = "list";
    renderAnimalList(data);
  }
}); // 用 fetch 從 API 拿取資料並做部分資料處理

fetch(INDEX_URL).then(function (res) {
  return res.json();
}).then(function (getData) {
  console.log(getData.Data[0]);
  renderShelterName(); // 只渲染開放認養的動物資料

  data = getData.Data.filter(function (i) {
    return i.animal_status === "OPEN";
  });
  console.log(data);
  data.forEach(function (i) {
    // 將動物性別改為中文顯示
    if (i.animal_sex === "F") {
      i.animal_sex = "母";
    } else if (i.animal_sex === "M") {
      i.animal_sex = "公";
    } // 若圖片網址為空值以 noimg 圖片代替


    if (i.album_file === "") {
      i.album_file = "./assets/images/noimg.png";
    }
  });
  renderAnimalList(data);
});
//# sourceMappingURL=all.js.map
