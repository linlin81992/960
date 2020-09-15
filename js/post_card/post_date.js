$(function () {
  $("#pickdate").dateDropper({
    animate: false,
    format: 'Y-m-d',
    maxYear: '2025',
    minYear: '2020',
    lang: 'zh',
    fxMobile: true,
    large: true,
    lock: 'from',

  });
  //頁面跳轉
  var count = 5;
  //寫一個方法，顯示倒數秒數  數到0後跳轉頁面  
  function countDown() {
    //將count顯示在div中
    document.getElementById("sec").innerHTML = `${count}秒後自動跳轉首頁`;
    //每執行一次，count減1
    count--;
    //count=0時，跳轉頁面
    if (count == 0) {
      window.location.href = "./front_index.html";

    } else {
      //每秒執行一次,showTime()
      setTimeout(countDown, 1000);
    }

  }

  // 開啟 Modal 彈跳視窗
  $("#send").on("click", function () {
    //燈箱
    // 先判斷會員登入 沒登入跳燈箱
    let xml = new XMLHttpRequest();
    xml.open("POST", "./php/post_save.php", true);
    // 有登入抓登入的會員是誰再存兩張圖 會員 創建日期 寄送日期
    $('.bg_of_lightbx').css('display', 'block');



    //抓日期
    let date = $('#pickdate').val().split('-');
    let y = date[0];
    let m = date[1];
    let d = date[2];
    if ($('#pickdate').val() != '') {
      $('.when_date').text(`將於${y}年${m}月${d}日寄出`);
      // 開啟彈跳視窗
      $(".overlay").addClass("-on");
      countDown();
      // 關閉 彈跳視窗
      $(".close").on("click", function () {
        $(".overlay").addClass("-opacity-zero");

        // 設定隔500豪秒後，移除相關 class
        setTimeout(function () {
          $(".overlay").removeClass("-on -opacity-zero");
        }, 500);

      });
    } else {
      alert("尚未選取日期歐~");

    };

  });
  // ------------抓正背面圖
  window.addEventListener("load", function () {
    document.getElementById("frontImg").src = sessionStorage["frontImg"];
    document.getElementById("backImg").src = sessionStorage["backImg"];
  });
  //--------------送資料庫-------------------

  function sendPost() {

  };





  document.getElementById("send").onclick = sendPost;

});