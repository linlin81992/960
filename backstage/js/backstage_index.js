window.addEventListener("load", function () {
  // 增加新管理員
  function addAdministrator() {
    let adForm = document.getElementById("adForm");
    let newAdBtn = document.getElementById("newAdBtn");
    let myForm = document.getElementById("myForm");
    let newAd = document.querySelector(".new_administrator");

    if (myForm.style.display == "none") {
      myForm.style.display = "";
    }
    let newAdministrator = newAd.cloneNode(true);
    newAdministrator.style.display = "";
    adForm.insertBefore(newAdministrator, newAdBtn);
  }

  document.getElementById("newAdBtn").onclick = addAdministrator;
  // 側邊欄切換
  $('.list li').click(function () {
    $(this).siblings().removeClass("active");
    $(this).parent().siblings().children().removeClass("active");
    $(this).addClass("active");
  });
  //編輯按鈕

  function edit() {
    let editBtn = document.querySelector(".edit");
    editBtn.innerText = "確認";
    $('select').show();
  }
  document.querySelector(".edit").onclick = edit;




});