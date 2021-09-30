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
  var target = $(this).attr("href");
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
  // function replaceUrl(e){
  //   const carouselActive = document.querySelector('.carousel-item-active');
  //   const carouselArea = document.querySelector('.carousel');
  //   carouselArea.addEventListener('click', replaceUrl);
  //   console.log(e.target.getAttribute('src'));
  //   let url = e.target.getAttribute('src');
  //   if(e.target.classList.contains('carousel-items-img')){
  //     console.log("點到我了");
  //     carouselActive.setAttribute('src',url)
  //   }
  //     // 避免轉址
  //     e.preventDefault();
  // }
  // jq 寫法
  $(".carousel-items a").click(function (event) {
    $(".carousel-item-active").attr("src", $(this).attr('href'));
    event.preventDefault(); // 避免轉址，也可使用 return false;
  }); // modal

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// URL
var BASE_URL = "https://data.coa.gov.tw";
var INDEX_URL = BASE_URL + "/api/v1/AnimalRecognition/";
var MODAL_URL = "".concat(INDEX_URL, "?animal_id="); // Data

var data = [];
var filteredData = [];
var dogColour = [];
var catColour = [];
var otherColour = [];
var allColour = [];
var shelter = [];
var modalHTML = "";
var filters = {
  animal_kind: [],
  animal_colour: [],
  shelter_name: [],
  animal_id: []
}; // DOM

var displayMode = document.querySelector("#display-mode-container");
var cardMode = document.querySelector("#card-mode");
var listMode = document.querySelector("#list-mode");
var table = document.querySelector(".table");
var displayCard = document.querySelector("#displayCard");
var displaylList = document.querySelector("#displaylList");
var displaylListSmall = document.querySelector("#displayListSmall");
var modalApi = document.querySelector(".modal-api");
var dataPanel = document.querySelector("#dataPanel");
var paginator = document.querySelector("#paginator");
var watchMore = document.querySelector(".btn-watch-more");
var pagination = document.querySelector(".pagination");
var totalNum = document.querySelector("#totalNum");
var arrowUp = document.querySelector(".arrow-up");
var searchForm = document.querySelector("#searchForm");
var btnSearch = document.querySelector("#btn-search");
var animalKind = document.querySelector('#animalKind');
var animalColour = document.querySelector('#animalColour');
var shelterName = document.querySelector('#shelterName');
var animalId = document.querySelector("#animalId");
var textNoData = document.querySelector(".text-no-data"); // Status

var CARDS_PER_PAGE = 12; //希望一頁有幾張卡片

var MODE = "card"; //預設模式為卡片模式

var NOW_PAGE = 1; //存放當前頁面

var paginatorLength = 11; // 想顯示幾個頁碼
// 監聽 當選擇動物種類時顯示該動物類別的毛色

animalKind.addEventListener('change', changeColourOption);

function changeColourOption() {
  var colourOptions = "<option value=\"\" selected>- \u52D5\u7269\u6BDB\u8272 -</option>";

  if (animalKind.value === "狗") {
    dogColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
  } else if (animalKind.value === "貓") {
    catColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
  } else if (animalKind.value === "其他") {
    otherColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
  } else {
    allColour.forEach(function (i) {
      colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
    });
  }

  animalColour.innerHTML = colourOptions;
} // 載入後渲染收容所及全部毛色


function renderShelterAndColour() {
  var str = "<option value=\"\" selected>- \u6536\u5BB9\u6240 -</option>";
  shelter.forEach(function (i) {
    str += "<option value=\"".concat(i, "\">").concat(i, "</option>");
  });
  var colourOptions = "<option value=\"\" selected>- \u52D5\u7269\u6BDB\u8272 -</option>";
  allColour.forEach(function (i) {
    colourOptions += "<option value=\"".concat(i, "\">").concat(i, "</option>");
  });
  animalColour.innerHTML = colourOptions;
  shelterName.innerHTML = str;
} // 上滑箭頭捲動後顯示狀態切換


window.addEventListener('scroll', function () {
  var scrollTop = window.scrollY;
  if (scrollTop > 800) arrowUp.classList.remove('d-none');else arrowUp.classList.add('d-none');
}); // 上滑箭頭點擊上滑

arrowUp.addEventListener('click', function (e) {
  e.preventDefault();
  $('html,body').animate({
    scrollTop: 640
  }, 100);
}); // 渲染資料畫面至卡片或清單，需判斷狀態，並渲染該模式的型態

function renderAnimalList(data) {
  var rawHTML = "";
  var rawHTML1 = ""; //如果MODE為'card'就渲染卡片模式

  if (MODE === "card") {
    //讓使用者知道當前顯示模式
    table.classList.add("d-none");
    displaylListSmall.classList.add("d-none");
    cardMode.classList.add("text-warning");
    listMode.classList.remove("text-warning");
    data.forEach(function (i) {
      rawHTML += "<li class=\"card-group-item col-6 col-md-4 col-lg-3 mb-10 hvr-bob\">\n      <div class=\"card shadow bg-gray-100\">\n        <h4 class=\"text-center bg-warning\">".concat(i.animal_id, "</h4>\n        <div class=\"custom-adopt-card-img-top\"\n          style=\"background: url(").concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n        </div>\n        <ul class=\"card-body py-3 px-3 px-lg-4\">\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u985E\u5225: </span>").concat(i.animal_kind, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6BDB\u8272: </span>").concat(i.animal_colour, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6027\u5225: </span>").concat(i.animal_sex, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u5C0B\u7372\u5730: </span>").concat(i.animal_foundplace, "\n          </li>\n          <li class=\"mb-1\">\n            <span class=\"font-weight-bold\">\u6211\u5728: </span>\n            <p class=\"d-block\">").concat(i.shelter_name, "</p>\n          </li>\n        </ul>\n        <div class=\"bg-white d-flex mt-auto\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, "\n            class=\"btn-detail-modal d-flex justify-content-center align-items-center card-link w-50 py-3\">\n            \u8A73\u7D30\u8CC7\u6599\n          </a>\n          <a href=\"#\" class=\"btn-want-adopt card-link w-50 text-center text-secondary py-3\">\n            \u6211\u6709\u610F\u9858\u8A8D\u990A\n          </a>\n        </div>\n      </div>\n    </li>");
    });
    displayCard.innerHTML = rawHTML; //如果MODE為'list'就渲染清單模式
  } else if (MODE === "list") {
    displayCard.innerHTML = "";
    table.classList.remove("d-none");
    displaylListSmall.classList.remove("d-none");
    cardMode.classList.remove("text-warning");
    listMode.classList.add("text-warning");
    data.forEach(function (i) {
      rawHTML1 += "<div class=\"row d-flex justify-content-center align-items-center border-top py-2\">\n      <div class=\"col-3 table-adopt-img\"\n        style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n      </div>\n      <ul class=\"col-6\">\n        <li>\n          <span class=\"font-weight-bold\">\u985E\u5225: </span>").concat(i.animal_kind, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6BDB\u8272: </span>").concat(i.animal_colour, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6027\u5225: </span>").concat(i.animal_sex, "\n        </li>\n        <li>\n          <span class=\"font-weight-bold\">\u6211\u5728: </span>\n          <p>").concat(i.shelter_name, "</p>\n        </li>\n      </ul>\n      <div class=\"col-3\">\n        <div class=\"bg-white d-flex align-items-center row\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, " class=\"btn-detail-modal col-12 btn btn-warning mb-1\">\u770B\u8A73\u7D30</a>\n          <a href=\"#\" class=\"btn-want-adopt btn btn-block btn-secondary col-12\">\u6B32\u8A8D\u990A</a>\n        </div>\n      </div>\n    </div>");
    });
    displayListSmall.innerHTML = rawHTML1;
    data.forEach(function (i) {
      rawHTML += "<tr>\n      <th scope=\"row d-flex flex-column justify-content-center\">\n        <div class=\"table-adopt-img\"\n          style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n        </div>\n      </th>\n      <td class=\"align-middle\">").concat(i.animal_kind, "</td>\n      <td class=\"align-middle\">").concat(i.animal_colour, "</td>\n      <td class=\"align-middle\">").concat(i.animal_sex, "</td>\n      <td class=\"align-middle\">").concat(i.shelter_name, "</td>\n      <td class=\"align-middle\">\n        <div class=\"bg-white d-flex align-items-center\">\n          <a href=\"#\" data-toggle=\"modal\" data-target=\"#adopt-modal\" data-id=").concat(i.animal_id, " class=\"btn-detail-modal btn btn-warning w-50 mr-2 \">\n            \u8A73\u7D30\u8CC7\u6599\n          </a>\n          <a href=\"#\" class=\"btn-want-adopt btn btn-block btn-secondary w-50\">\u6211\u6709\u610F\u9858\u8A8D\u990A</a>\n        </div>\n      </td>\n    </tr>");
    });
    displayList.innerHTML = rawHTML;
  }
} // 渲染 modal 畫面 用 fetch 配合動物流水編號取得特定動物資料


function renderDetailModal(id) {
  fetch(MODAL_URL + id).then(function (res) {
    return res.json();
  }).then(function (getData) {
    // console.log(getData.Data);
    // console.log(MODAL_URL + id);
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
    } else {
      modalData[0].animal_sex = "尚未確認";
    }

    modalData.forEach(function (i) {
      modalHTML += "<div\n      class=\"d-flex flex-column justify-content-center bg-gray-100 col-12 col-md-6 mb-3 mb-md-0 shadow modal-adopt-img-container\">\n      <div class=\"modal-adopt-img-height\" id=\"adopt-modal-img\"\n        style=\"background: url(".concat(i.album_file, ") no-repeat 50% 50% / contain;\">\n      </div>\n    </div>\n    <div class=\"col-12 col-md-5 ml-3 d-flex flex-column justify-content-center font-s font-md-base\">\n      <ul>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5165\u6240\u5929\u6578 : </span>").concat(calcInShelterDays(i.animal_createtime), " \u5929\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5165\u6240\u65E5\u671F : </span><em>").concat(i.animal_createtime, "</em>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u5C0B\u7372\u5730 : </span>").concat(i.animal_foundplace, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\"></span>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6D41\u6C34\u7DE8\u865F : </span>").concat(i.animal_id, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u7DE8\u865F : </span>").concat(i.animal_subid, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u52D5\u7269\u54C1\u7A2E : </span>").concat(i.animal_kind, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6027\u5225 : </span>").concat(i.animal_sex, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6BDB\u8272 : </span>").concat(i.animal_colour, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u9AD4\u578B : </span>").concat(i.animal_bodytype, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u662F\u5426\u7D55\u80B2 : </span>").concat(i.animal_sterilization, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\"></span>\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6240\u5728\u6536\u5BB9\u6240 : </span>").concat(i.shelter_name, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u6240\u96FB\u8A71 : </span>").concat(i.shelter_tel, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1\">\u6536\u5BB9\u6240\u5730\u5740 : </span>").concat(i.shelter_address, "\n        </li>\n        <li class=\"mb-1\">\n          <span class=\"font-weight-bold mr-1 \">\u5099\u8A3B : </span>").concat(i.animal_remark, "\n        </li>\n      </ul>\n    </div>");
    });
    modalApi.innerHTML = modalHTML;
  });
} // 當點擊到"詳細資料"按鈕 彈出對應動物 id 的 MODAL


dataPanel.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.matches('.btn-detail-modal')) {
    modalHTML = "";
    renderDetailModal(e.target.dataset.id);
  } else if (e.target.matches('.btn-want-adopt')) {
    alert('這個按鈕目前沒有功能喔!');
  }
}); // 計算入所天數

function calcInShelterDays(moveInShelterDay) {
  var todayDate = new Date();
  var str = moveInShelterDay.replace("-", "/");
  var openDate = new Date(str); // console.log(todayDate,openDate) 

  var days = parseInt(Math.abs(todayDate - openDate) / 1000 / 60 / 60 / 24);
  return days;
} // calcInShelterDays("2021/09/24");
// 渲染 pagination 頁碼
// total 為總頁數，以 amount(傳入資料) / CARDS_PER_PAGE(每頁欲顯示數) 取得


function renderPaginator(amount) {
  var pageArr = [];
  var total = Math.ceil(amount / CARDS_PER_PAGE); // console.log(`當前輸入總頁數為${total}，當前頁面為第${NOW_PAGE}頁，頁碼顯示${paginatorLength}頁`)
  // 總頁數小於顯示頁碼的情況下:全部顯示

  if (total < paginatorLength) {
    for (var i = 0; i < total; i++) {
      pageArr.push(i + 1);
    }
  } else {
    // 總頁數超過 paginatorLength 的情況:當前頁面偏向頁首、頁尾或中間
    var max = paginatorLength - 3; // 扣掉省略號佔的一格及前或後方固定顯示的兩個頁碼
    // 當前頁面偏向頁首時

    if (NOW_PAGE <= max) {
      // 前段顯示的頁碼
      for (var _i = 0; _i < max; _i++) {
        pageArr.push(_i + 1);
      } // 補齊後面的頁碼


      pageArr.push(max + 1, '...', total); // 當前頁面偏向頁尾時
    } else if (NOW_PAGE > total - max) {
      // 後段顯示的頁碼
      for (var _i2 = 0; _i2 < max; _i2++) {
        pageArr.unshift(total - _i2);
      } // 補齊前面的頁碼


      pageArr.unshift(1, '...', total - max); // 當前頁面在中間時
    } else {
      var around = (paginatorLength - 7) / 2; // 減去前後固定顯示的兩頁、省略號以及當前頁

      var leftArr = []; // 當前頁左方的頁碼

      var rightArr = []; // 當前頁右方的頁碼
      // 湊足中間顯示的頁碼

      for (var _i3 = 1; _i3 <= around; _i3++) {
        leftArr.unshift(NOW_PAGE - _i3);
        rightArr.push(NOW_PAGE + _i3);
      } // 組合中段並補齊前後段


      pageArr = leftArr.concat(NOW_PAGE, rightArr);
      pageArr.push('...', total - 1, total);
      pageArr.unshift(1, 2, '...');
    }
  }

  var str = "";
  pageArr.forEach(function (i) {
    if (i === "...") {
      str += "<div class=\"page-item page-ellipsis\"><p>".concat(i, "</p></div>");
    } else {
      str += "<div class=\"page-item\" data-page=".concat(i, "><a class=\"page-link\" href=\"#\" data-page=").concat(i, ">").concat(i, "</a></div>");
    }
  });
  paginator.innerHTML = str;
  paginator.childNodes.forEach(function (i) {
    if (i.dataset.page == NOW_PAGE) {
      i.classList.add('active');
    }
  });
} // 分頁器跳下頁、回上頁功能


pagination.addEventListener('click', function (e) {
  e.preventDefault();
  var paginationData = filteredData.length ? filteredData : data;

  if (e.target.classList.contains('page-previous')) {
    if (NOW_PAGE === 1) {
      alert('已經在第一頁了');
      return;
    }

    NOW_PAGE -= 1;
    $('html,body').animate({
      scrollTop: 640
    }, 0);
  } else if (e.target.classList.contains('page-next')) {
    if (NOW_PAGE === Math.ceil(paginationData.length / CARDS_PER_PAGE)) {
      alert('沒有下一頁囉');
      return;
    }

    NOW_PAGE += 1;
    $('html,body').animate({
      scrollTop: 640
    }, 0);
  }

  renderPaginator(paginationData.length);
  renderAnimalList(getDataByPage(NOW_PAGE));
}); // 回傳當前分頁的資料陣列

function getDataByPage(page) {
  var paginationData = filteredData.length ? filteredData : data; // page 1 => 1~12 data[0]~data[11]    data.slice(0,12)
  // page 2 => 13~24 data[12]~data[23]  data.slice(12,24)
  // page 3 => 25~36 data[24]~data[35]  data.slice(24,36)

  var startIndex = (page - 1) * CARDS_PER_PAGE;
  return paginationData.slice(startIndex, startIndex + CARDS_PER_PAGE);
} // 當在小螢幕斷點點擊看更多時，渲染下一批資料


watchMore.addEventListener('click', function getDataByClick(e) {
  e.preventDefault();
  NOW_PAGE += 1;
  var clickData = filteredData.length ? filteredData : data;
  var moreData = clickData.slice(0, NOW_PAGE * CARDS_PER_PAGE);
  console.log(moreData);
  renderAnimalList(moreData);
  renderPaginator(data.length);
}); // 監聽 paginator，判斷使用者點擊第幾頁，並渲染該頁頁面

paginator.addEventListener("click", function (e) {
  e.preventDefault();
  var paginationData = filteredData.length ? filteredData : data; // console.log(paginationData);
  // console.log(e.target);

  if (e.target.tagName !== "A") return;
  NOW_PAGE = Number(e.target.dataset.page);
  renderPaginator(paginationData.length);
  renderAnimalList(getDataByPage(NOW_PAGE)); // 將畫面捲動回篩選列

  $('html,body').animate({
    scrollTop: 640
  }, 0);
}); // 圖卡及清單模式切換

displayMode.addEventListener('click', function displayModeSwitch(e) {
  e.preventDefault();

  if (e.target.matches("#card-mode")) {
    MODE = "card";
    renderAnimalList(getDataByPage(NOW_PAGE));
  } else if (e.target.matches("#list-mode")) {
    MODE = "list";
    renderAnimalList(getDataByPage(NOW_PAGE));
  }
}); // 搜尋功能

searchForm.addEventListener('click', function (e) {
  e.preventDefault(); // 取得輸入內容

  var kind = animalKind.value;
  var colour = animalColour.value;
  var shelter = shelterName.value;
  var id = animalId.value.trim();

  if (e.target.classList.contains('btn-search')) {
    // 若點擊查詢按鈕
    if (kind === "" && colour === "" && shelter === "" && id === "") {
      // 沒填入任何條件時，提醒使用者必須設定條件
      alert('請設定搜尋條件');
      return;
    } else {
      output();
      NOW_PAGE = 1;

      if (filteredData.length === 0) {
        alert('沒有符合條件的毛孩');
        animalId.value = "";
      } else {
        renderPaginator(filteredData.length);
        renderAnimalList(getDataByPage(NOW_PAGE));
        animalId.value = "";
        var SelectArr = $("select");

        for (var i = 0; i < SelectArr.length; i++) {
          SelectArr[i].options[0].selected = true;
        }

        totalNum.textContent = "\u7576\u524D\u6AA2\u7D22\u5171\u6709 ".concat(filteredData.length, " \u500B\u6BDB\u5B69");
      }
    }
  } else if (e.target.classList.contains('btn-search-cancel')) {
    // 若點擊取消按鈕
    // 清空篩選陣列
    filteredData = [];
    NOW_PAGE = 1; // 重置 select，使其回到選中第一個值的狀態

    var _SelectArr = $("select");

    for (var _i4 = 0; _i4 < _SelectArr.length; _i4++) {
      _SelectArr[_i4].options[0].selected = true;
    } // 重置 input，使其為空


    animalId.value = ""; // 重置篩選條件

    filters = {
      animal_kind: [],
      animal_colour: [],
      shelter_name: [],
      animal_id: []
    }; // 重新渲染畫面

    renderPaginator(data.length);
    renderAnimalList(getDataByPage(NOW_PAGE));
    totalNum.textContent = "\u7576\u524D\u6AA2\u7D22\u5171\u6709 ".concat(data.length, " \u500B\u6BDB\u5B69");
  } else {
    return;
  }
}); // 設定篩選條件變數 filters 中的內容

searchForm.addEventListener('change', function () {
  var kind = [];
  var colour = [];
  var shelter = [];
  var id = [];
  kind.push(animalKind.value);
  colour.push(animalColour.value);
  shelter.push(shelterName.value);
  id.push(animalId.value.trim()); // 去除使用者可能誤打的空格

  if (kind != "") {
    filters.animal_kind = kind;
  } else {
    filters.animal_kind = [];
  }

  if (colour != "") {
    filters.animal_colour = colour;
  } else {
    filters.animal_colour = [];
  }

  if (shelter != "") {
    filters.shelter_name = shelter;
  } else {
    filters.shelter_name = [];
  }

  if (id != "") {
    filters.animal_id = id;
  } else {
    filters.animal_id = [];
  }
}); // 篩選方法，依據帶入的條件不同做多條件多數據篩選

function multiFilter(array, filters) {
  // 抓出所有篩選條件
  var filterKeys = Object.keys(filters); // 動態驗證所有符合條件

  return array.filter(function (item) {
    return filterKeys.every(function (key) {
      // 忽略未選擇選項的條件
      if (!filters[key].length) return true;
      return !!~filters[key].indexOf(item[key]);
    });
  });
}

function output() {
  filteredData = multiFilter(data, filters);
} // 各類別毛色資料載入後將所有毛色進行不重複值合併


function combinedAllColour() {
  allColour = _toConsumableArray(new Set([].concat(dogColour, catColour, otherColour)));
} // 用 fetch 從 API 拿取資料並做部分資料處理


fetch(INDEX_URL).then(function (res) {
  return res.json();
}).then(function (getData) {
  // 只渲染開放認養的動物資料
  data = getData.Data.filter(function (i) {
    return i.animal_status === "OPEN";
  });
  data.forEach(function (i) {
    // 將動物性別改為中文顯示
    if (i.animal_sex === "F") {
      i.animal_sex = "母";
    } else if (i.animal_sex === "M") {
      i.animal_sex = "公";
    } else {
      i.animal_sex = "尚未確認";
    } // 若圖片網址為空值以 noimg 圖片代替


    if (i.album_file === "") {
      i.album_file = "./assets/images/noimg.png";
    } // 將流水編號改為字串


    i.animal_id = String(i.animal_id);
  }); // 取得載入資料當前的所有動物毛色及所有收容所資料

  data.forEach(function (i) {
    if (shelter.includes(i.shelter_name) || i.shelter_name === "") {} else {
      shelter.push(i.shelter_name);
    }

    if (i.animal_kind == "狗" && i.animal_colour != "") {
      if (dogColour.includes(i.animal_colour) || i.animal_colour === "") {} else {
        dogColour.push(i.animal_colour);
      }
    } else if (i.animal_kind == "貓" && i.animal_colour != "") {
      if (catColour.includes(i.animal_colour) || i.animal_colour === "") {} else {
        catColour.push(i.animal_colour);
      }
    } else {
      if (otherColour.includes(i.animal_colour) || i.animal_colour === "") {} else {
        otherColour.push(i.animal_colour);
      }
    }
  }); // 各類別毛色資料載入後將所有毛色進行不重複值合併

  combinedAllColour();
  renderShelterAndColour();
  renderPaginator(data.length);
  renderAnimalList(getDataByPage(NOW_PAGE));
  totalNum.textContent = "\u7576\u524D\u6AA2\u7D22\u5171\u6709 ".concat(data.length, " \u500B\u6BDB\u5B69");
});
//# sourceMappingURL=all.js.map
