// URL
const BASE_URL = "https://data.coa.gov.tw";
const INDEX_URL = BASE_URL + "/api/v1/AnimalRecognition/";
const MODAL_URL = `${INDEX_URL}?animal_id=`;

// Data
let data = [];
let filteredData = [];
const dogColour = [];
const catColour = [];
const otherColour = [];
let allColour = [];
const shelter = [];
let modalHTML = "";
let filters = {
  animal_kind: [],
  animal_colour: [],
  shelter_name: [],
  animal_id: []
}

// DOM
const displayMode = document.querySelector("#display-mode-container");
const cardMode = document.querySelector("#card-mode");
const listMode = document.querySelector("#list-mode");
const table = document.querySelector(".table");
const displayCard = document.querySelector("#displayCard");
const displaylList = document.querySelector("#displaylList");
const displaylListSmall = document.querySelector("#displayListSmall");
const modalApi = document.querySelector(".modal-api");
const dataPanel = document.querySelector("#dataPanel");
const paginator = document.querySelector("#paginator");
const watchMore = document.querySelector(".btn-watch-more");
const pagination = document.querySelector(".pagination")
const totalNum = document.querySelector("#totalNum");
const arrowUp = document.querySelector(".arrow-up");
const searchForm = document.querySelector("#searchForm");
const btnSearch = document.querySelector("#btn-search");
const animalKind = document.querySelector('#animalKind');
const animalColour = document.querySelector('#animalColour');
const shelterName = document.querySelector('#shelterName');
const animalId = document.querySelector("#animalId");
const textNoData = document.querySelector(".text-no-data");

// Status
const CARDS_PER_PAGE = 12; //希望一頁有幾張卡片
let MODE = "card"; //預設模式為卡片模式
let NOW_PAGE = 1; //存放當前頁面
let paginatorLength = 11; // 想顯示幾個頁碼

// 監聽 當選擇動物種類時顯示該動物類別的毛色
animalKind.addEventListener('change', changeColourOption);

function changeColourOption(){   
  let colourOptions = `<option value="" selected>- 動物毛色 -</option>`;  
  if(animalKind.value === "狗"){    
    dogColour.forEach(i => {
      colourOptions += `<option value="${i}">${i}</option>`;
    })
  }else if(animalKind.value === "貓"){
    catColour.forEach(i => {
      colourOptions += `<option value="${i}">${i}</option>`;
    })
  }else if(animalKind.value === "其他"){
    otherColour.forEach(i => {
      colourOptions += `<option value="${i}">${i}</option>`;
    })
  }else{
    allColour.forEach(i => {
      colourOptions += `<option value="${i}">${i}</option>`;
    })
  }
  animalColour.innerHTML = colourOptions;
}

// 載入後渲染收容所及全部毛色
function renderShelterAndColour(){
  let str = `<option value="" selected>- 收容所 -</option>`;
  shelter.forEach(i => {
    str+= `<option value="${i}">${i}</option>`
  })

  let colourOptions = `<option value="" selected>- 動物毛色 -</option>`;
  allColour.forEach(i => {
    colourOptions+= `<option value="${i}">${i}</option>`
  })

  animalColour.innerHTML = colourOptions;
  shelterName.innerHTML = str;
}

// 上滑箭頭捲動後顯示狀態切換
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
    if(scrollTop > 800)
      arrowUp.classList.remove('d-none');
    else
      arrowUp.classList.add('d-none');
});

// 上滑箭頭點擊上滑
arrowUp.addEventListener('click',function(e){
  e.preventDefault();
  $('html,body').animate({
    scrollTop: 640
  },100);
})

// 渲染資料畫面至卡片或清單，需判斷狀態，並渲染該模式的型態
function renderAnimalList(data){
  let rawHTML = "";
  let rawHTML1 = "";
  //如果MODE為'card'就渲染卡片模式
  if(MODE === "card"){
    //讓使用者知道當前顯示模式
    table.classList.add("d-none");
    displaylListSmall.classList.add("d-none");
    cardMode.classList.add("text-warning"); 
    listMode.classList.remove("text-warning");
    data.forEach(i => {
      rawHTML += `<li class="card-group-item col-6 col-md-4 col-lg-3 mb-10 hvr-bob">
      <div class="card shadow bg-gray-100">
        <h4 class="text-center bg-warning">${i.animal_id}</h4>
        <div class="custom-adopt-card-img-top"
          style="background: url(${i.album_file}) no-repeat 50% 50% / contain;">
        </div>
        <ul class="card-body py-3 px-3 px-lg-4">
          <li class="mb-1">
            <span class="font-weight-bold">類別: </span>${i.animal_kind}
          </li>
          <li class="mb-1">
            <span class="font-weight-bold">毛色: </span>${i.animal_colour}
          </li>
          <li class="mb-1">
            <span class="font-weight-bold">性別: </span>${i.animal_sex}
          </li>
          <li class="mb-1">
            <span class="font-weight-bold">尋獲地: </span>${i.animal_foundplace}
          </li>
          <li class="mb-1">
            <span class="font-weight-bold">我在: </span>
            <p class="d-block">${i.shelter_name}</p>
          </li>
        </ul>
        <div class="bg-white d-flex mt-auto">
          <a href="#" data-toggle="modal" data-target="#adopt-modal" data-id=${i.animal_id}
            class="btn-detail-modal d-flex justify-content-center align-items-center card-link w-50 py-3">
            詳細資料
          </a>
          <a href="#" class="btn-want-adopt card-link w-50 text-center text-secondary py-3">
            我有意願認養
          </a>
        </div>
      </div>
    </li>`
    })
    displayCard.innerHTML = rawHTML;
  //如果MODE為'list'就渲染清單模式
  }else if(MODE === "list"){
    displayCard.innerHTML = "";
    table.classList.remove("d-none");
    displaylListSmall.classList.remove("d-none");
    cardMode.classList.remove("text-warning"); 
    listMode.classList.add("text-warning");
    data.forEach(i =>{
      rawHTML1 += `<div class="row d-flex justify-content-center align-items-center border-top py-2">
      <div class="col-3 table-adopt-img"
        style="background: url(${i.album_file}) no-repeat 50% 50% / contain;">
      </div>
      <ul class="col-6">
        <li>
          <span class="font-weight-bold">類別: </span>${i.animal_kind}
        </li>
        <li>
          <span class="font-weight-bold">毛色: </span>${i.animal_colour}
        </li>
        <li>
          <span class="font-weight-bold">性別: </span>${i.animal_sex}
        </li>
        <li>
          <span class="font-weight-bold">我在: </span>
          <p>${i.shelter_name}</p>
        </li>
      </ul>
      <div class="col-3">
        <div class="bg-white d-flex align-items-center row">
          <a href="#" data-toggle="modal" data-target="#adopt-modal" data-id=${i.animal_id} class="btn-detail-modal col-12 btn btn-warning mb-1">看詳細</a>
          <a href="#" class="btn-want-adopt btn btn-block btn-secondary col-12">欲認養</a>
        </div>
      </div>
    </div>`
    })
    displayListSmall.innerHTML = rawHTML1;

    data.forEach(i => {
      rawHTML += `<tr>
      <th scope="row d-flex flex-column justify-content-center">
        <div class="table-adopt-img"
          style="background: url(${i.album_file}) no-repeat 50% 50% / contain;">
        </div>
      </th>
      <td class="align-middle">${i.animal_kind}</td>
      <td class="align-middle">${i.animal_colour}</td>
      <td class="align-middle">${i.animal_sex}</td>
      <td class="align-middle">${i.shelter_name}</td>
      <td class="align-middle">
        <div class="bg-white d-flex align-items-center">
          <a href="#" data-toggle="modal" data-target="#adopt-modal" data-id=${i.animal_id} class="btn-detail-modal btn btn-warning w-50 mr-2 ">
            詳細資料
          </a>
          <a href="#" class="btn-want-adopt btn btn-block btn-secondary w-50">我有意願認養</a>
        </div>
      </td>
    </tr>`
    })
    displayList.innerHTML = rawHTML;
  }
}

// 渲染 modal 畫面 用 fetch 配合動物流水編號取得特定動物資料
function renderDetailModal(id){
  fetch(MODAL_URL + id)
  .then(function(res){  
    return res.json();    
  })
  .then(function(getData){    
    // console.log(getData.Data);
    // console.log(MODAL_URL + id);
    let modalData = getData.Data;

    // 將資料做中文處理
    if(modalData[0].album_file === ""){
      modalData[0].album_file = "./assets/images/noimg.png";
    }
    if(modalData[0].animal_sterilization === "T"){
      modalData[0].animal_sterilization = "已絕育";
    }else if(modalData[0].animal_sterilization === "F"){
      modalData[0].animal_sterilization = "尚未絕育";
    }

    switch(modalData[0].animal_bodytype){
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

    if(modalData[0].animal_sex === "F"){
      modalData[0].animal_sex = "母";
    }else if(modalData[0].animal_sex === "M"){
      modalData[0].animal_sex = "公";
    }else{
      modalData[0].animal_sex = "尚未確認";
    }    
    modalData.forEach(i => {
      modalHTML += `<div
      class="d-flex flex-column justify-content-center bg-gray-100 col-12 col-md-6 mb-3 mb-md-0 shadow modal-adopt-img-container">
      <div class="modal-adopt-img-height" id="adopt-modal-img"
        style="background: url(${i.album_file}) no-repeat 50% 50% / contain;">
      </div>
    </div>
    <div class="col-12 col-md-5 ml-3 d-flex flex-column justify-content-center font-s font-md-base">
      <ul>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">入所天數 : </span>${calcInShelterDays(i.animal_createtime)} 天
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">入所日期 : </span><em>${i.animal_createtime}</em>
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">尋獲地 : </span>${i.animal_foundplace}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1"></span>
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">流水編號 : </span>${i.animal_id}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">收容編號 : </span>${i.animal_subid}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">動物品種 : </span>${i.animal_kind}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">性別 : </span>${i.animal_sex}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">毛色 : </span>${i.animal_colour}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">體型 : </span>${i.animal_bodytype}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">是否絕育 : </span>${i.animal_sterilization}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1"></span>
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">所在收容所 : </span>${i.shelter_name}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">收容所電話 : </span>${i.shelter_tel}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1">收容所地址 : </span>${i.shelter_address}
        </li>
        <li class="mb-1">
          <span class="font-weight-bold mr-1 ">備註 : </span>${i.animal_remark}
        </li>
      </ul>
    </div>`
    })      
    modalApi.innerHTML = modalHTML;
  });
}

// 當點擊到"詳細資料"按鈕 彈出對應動物 id 的 MODAL
dataPanel.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.matches('.btn-detail-modal')){
    modalHTML = "";
    renderDetailModal(e.target.dataset.id);
  }else if(e.target.matches('.btn-want-adopt')){
    alert('這個按鈕目前沒有功能喔!');
  }
})

// 計算入所天數
function calcInShelterDays(moveInShelterDay){
  let todayDate = new Date();
  let str = moveInShelterDay.replace("-","/")
  let openDate = new Date(str);
  // console.log(todayDate,openDate) 
  let days = parseInt(Math.abs(todayDate - openDate) / 1000 / 60 / 60 / 24);
  return days;
}
// calcInShelterDays("2021/09/24");

// 渲染 pagination 頁碼
// total 為總頁數，以 amount(傳入資料) / CARDS_PER_PAGE(每頁欲顯示數) 取得
function renderPaginator(amount){
  let pageArr = [];
  let total = Math.ceil(amount / CARDS_PER_PAGE);
  // console.log(`當前輸入總頁數為${total}，當前頁面為第${NOW_PAGE}頁，頁碼顯示${paginatorLength}頁`)
  
  // 總頁數小於顯示頁碼的情況下:全部顯示
  if(total < paginatorLength){
    for(let i=0; i<total; i++ ){
      pageArr.push(i+1);      
    }
  }else{
    // 總頁數超過 paginatorLength 的情況:當前頁面偏向頁首、頁尾或中間
    const max = paginatorLength - 3; // 扣掉省略號佔的一格及前或後方固定顯示的兩個頁碼
    // 當前頁面偏向頁首時
    if(NOW_PAGE <= max){
      // 前段顯示的頁碼
      for(let i=0; i<max; i++){
        pageArr.push(i+1);
      }
      // 補齊後面的頁碼
      pageArr.push(max+1, '...', total);
      // 當前頁面偏向頁尾時
    }else if(NOW_PAGE >total - max){
      // 後段顯示的頁碼
      for(let i=0; i<max; i++){
        pageArr.unshift(total-i);
      }
      // 補齊前面的頁碼
      pageArr.unshift(1, '...', total-max);
      // 當前頁面在中間時
    }else{
      let around = (paginatorLength - 7) / 2; // 減去前後固定顯示的兩頁、省略號以及當前頁
      let leftArr = []; // 當前頁左方的頁碼
      let rightArr = []; // 當前頁右方的頁碼
      // 湊足中間顯示的頁碼
      for(let i=1; i<=around; i++){
        leftArr.unshift(NOW_PAGE - i);
        rightArr.push(NOW_PAGE + i);
      }
      // 組合中段並補齊前後段
      pageArr = leftArr.concat(NOW_PAGE, rightArr);
      pageArr.push('...',total-1, total);
      pageArr.unshift(1, 2, '...');
    }
  }
  let str = "";
  pageArr.forEach(i => {
    if(i === "..."){
      str += `<div class="page-item page-ellipsis"><p>${i}</p></div>`
    }else{
      str += `<div class="page-item" data-page=${i}><a class="page-link" href="#" data-page=${i}>${i}</a></div>`
      }
    })
    paginator.innerHTML = str;
    paginator.childNodes.forEach(i => {
      if(i.dataset.page == NOW_PAGE){
        i.classList.add('active');
      }      
    })
}

// 分頁器跳下頁、回上頁功能
pagination.addEventListener('click',function(e){
  e.preventDefault();  
  const paginationData = filteredData.length ? filteredData : data;
  if(e.target.classList.contains('page-previous')){
    if(NOW_PAGE === 1){
      alert('已經在第一頁了');
      return;
    }
    NOW_PAGE -= 1; 
    $('html,body').animate({
      scrollTop: 640
    },0);     
  }else if(e.target.classList.contains('page-next')){
    if(NOW_PAGE === Math.ceil(paginationData.length / CARDS_PER_PAGE)){
      alert('沒有下一頁囉');
      return;
    }
    NOW_PAGE += 1;
    $('html,body').animate({
      scrollTop: 640
    },0);   
  } 
  renderPaginator(paginationData.length);
  renderAnimalList(getDataByPage(NOW_PAGE))

})

// 回傳當前分頁的資料陣列
function getDataByPage(page) {
  const paginationData = filteredData.length ? filteredData : data;
  // page 1 => 1~12 data[0]~data[11]    data.slice(0,12)
  // page 2 => 13~24 data[12]~data[23]  data.slice(12,24)
  // page 3 => 25~36 data[24]~data[35]  data.slice(24,36)
  const startIndex = (page - 1) * CARDS_PER_PAGE;
  return paginationData.slice(startIndex, startIndex + CARDS_PER_PAGE);
}

// 當在小螢幕斷點點擊看更多時，渲染下一批資料
watchMore.addEventListener('click',function getDataByClick(e){
  e.preventDefault();
  NOW_PAGE += 1;
  const clickData = filteredData.length ? filteredData : data;  
  let moreData = clickData.slice(0, NOW_PAGE * CARDS_PER_PAGE);  
  console.log(moreData); 
  renderAnimalList(moreData);
  renderPaginator(data.length);
})

// 監聽 paginator，判斷使用者點擊第幾頁，並渲染該頁頁面
paginator.addEventListener("click", function(e) {
  e.preventDefault();
  const paginationData = filteredData.length ? filteredData : data;
  // console.log(paginationData);
  // console.log(e.target);
  if (e.target.tagName !== "A") return;
  NOW_PAGE = Number(e.target.dataset.page);
  renderPaginator(paginationData.length);  
  renderAnimalList(getDataByPage(NOW_PAGE));
  // 將畫面捲動回篩選列
  $('html,body').animate({
    scrollTop: 640
  },0);
});

// 圖卡及清單模式切換
displayMode.addEventListener('click', function displayModeSwitch(e){
  e.preventDefault();
  if(e.target.matches("#card-mode")){
    MODE = "card";
    renderAnimalList(getDataByPage(NOW_PAGE))
  }else if(e.target.matches("#list-mode")){
    MODE = "list";
    renderAnimalList(getDataByPage(NOW_PAGE))
  }
})

// 搜尋功能
searchForm.addEventListener('click',function(e){
  e.preventDefault();
  // 取得輸入內容
  const kind = animalKind.value;
  const colour = animalColour.value;
  const shelter = shelterName.value;
  const id = animalId.value.trim();
  if(e.target.classList.contains('btn-search')){
    // 若點擊查詢按鈕
    if(kind === "" && colour === "" && shelter === "" && id === ""){
      // 沒填入任何條件時，提醒使用者必須設定條件
      alert('請設定搜尋條件');
      return;
    }else{
      output();
      NOW_PAGE = 1;
      if(filteredData.length === 0){
        alert('沒有符合條件的毛孩');
        animalId.value = "";
      }else{
      renderPaginator(filteredData.length);
      renderAnimalList(getDataByPage(NOW_PAGE));
      animalId.value = "";
      let SelectArr = $("select");
      for (let i = 0; i < SelectArr.length; i++) {
      SelectArr[i].options[0].selected = true; 
      }
      totalNum.textContent = `當前檢索共有 ${filteredData.length} 個毛孩`;
      }
    }
  }else if(e.target.classList.contains('btn-search-cancel')){
    // 若點擊取消按鈕
    // 清空篩選陣列
    filteredData = [];
    NOW_PAGE = 1;
    
    // 重置 select，使其回到選中第一個值的狀態
    let SelectArr = $("select");
    for (let i = 0; i < SelectArr.length; i++) {
    SelectArr[i].options[0].selected = true; 
    }
    // 重置 input，使其為空
    animalId.value = "";
    // 重置篩選條件
    filters = {
      animal_kind: [],
      animal_colour: [],
      shelter_name: [],
      animal_id: []
    }
    // 重新渲染畫面
    renderPaginator(data.length);
    renderAnimalList(getDataByPage(NOW_PAGE));
    totalNum.textContent = `當前檢索共有 ${data.length} 個毛孩`
  }else{
    return;
  }
})

// 設定篩選條件變數 filters 中的內容
searchForm.addEventListener('change',function(){
  let kind = [];  
  let colour = [];
  let shelter = [];
  let id = [];

  kind.push(animalKind.value)
  colour.push(animalColour.value)
  shelter.push(shelterName.value)
  id.push(animalId.value.trim()) // 去除使用者可能誤打的空格
  
  if(kind != ""){
    filters.animal_kind = kind
  }else{
    filters.animal_kind = [];
  }

  if(colour != ""){
    filters.animal_colour = colour
  }else{
    filters.animal_colour = [];
  }

  if(shelter != ""){
    filters.shelter_name = shelter
  }else{
    filters.shelter_name = [];
  }

  if(id != ""){
    filters.animal_id = id;
  }else{
    filters.animal_id = [];
  }
})

// 篩選方法，依據帶入的條件不同做多條件多數據篩選
function multiFilter(array, filters) {
  // 抓出所有篩選條件
  const filterKeys = Object.keys(filters)
  // 動態驗證所有符合條件
  return array.filter((item) => {  
  return filterKeys.every(key => {
  // 忽略未選擇選項的條件
  if(!filters[key].length) return true
  return !!~filters[key].indexOf(item[key])
      })
    })
  }

function output(){
  filteredData = multiFilter(data, filters);
}

// 各類別毛色資料載入後將所有毛色進行不重複值合併

function combinedAllColour(){
  allColour = [...new Set( [...dogColour, ...catColour, ...otherColour] )];
}

// 用 fetch 從 API 拿取資料並做部分資料處理
fetch(INDEX_URL)
  .then(function(res){  
    return res.json();
  })
  .then(function(getData){    
    // 只渲染開放認養的動物資料
    data = getData.Data.filter(i => i.animal_status === "OPEN")    

    data.forEach(i => {
      // 將動物性別改為中文顯示
      if(i.animal_sex === "F"){
        i.animal_sex = "母";
      }else if(i.animal_sex === "M"){
        i.animal_sex = "公";
      }else{
        i.animal_sex = "尚未確認";
      }
      // 若圖片網址為空值以 noimg 圖片代替
      if(i.album_file === ""){
        i.album_file = "./assets/images/noimg.png";
      }
      // 將流水編號改為字串
      i.animal_id = String(i.animal_id);
    })

    // 取得載入資料當前的所有動物毛色及所有收容所資料
    data.forEach(i => {
      if(shelter.includes(i.shelter_name) || i.shelter_name === ""){       
      }else{
        shelter.push(i.shelter_name);
      }
      if(i.animal_kind == "狗" && i.animal_colour != ""){
        if(dogColour.includes(i.animal_colour) || i.animal_colour === ""){       
      }else{
        dogColour.push(i.animal_colour);
      }
      }else if(i.animal_kind == "貓" && i.animal_colour != ""){
        if(catColour.includes(i.animal_colour)  || i.animal_colour === ""){       
        }else{
          catColour.push(i.animal_colour);
        }
      }else{
        if(otherColour.includes(i.animal_colour)  || i.animal_colour === ""){        
        }else{
          otherColour.push(i.animal_colour);
        }
      }     
    })
    // 各類別毛色資料載入後將所有毛色進行不重複值合併
    combinedAllColour();
    renderShelterAndColour();
    renderPaginator(data.length);
    renderAnimalList(getDataByPage(NOW_PAGE));
    totalNum.textContent = `當前檢索共有 ${data.length} 個毛孩`   
  });