let vm = new Vue({
  el: "#forum_discuss",
  data() {
    return {
      aaa: "",
      information: [],
      searchResult: [],
      announcement: [],
      memberCheck: [],
      box_msg: [],
      like_icon: [],
      isOpen: false,
      filter: '',
      accuseIsOpen: false,
      openLight: false,
      contentIsOpen: false,
      type: 'all',
      select: '全部文章',
      stopScroll: false,
      msg: "",
      isHeart: false,
      isCollect: false,

      category: [{
        link_title: '實作型',
        color: 'practical_bg_color',
      }, {
        link_title: '研究型',
        color: 'research_bg_color',
      }, {
        link_title: '文藝型',
        color: 'art_bg_color',
      }, {
        link_title: '社會型',
        color: 'social_bg_color',
      }, {

        link_title: '企業型',
        color: 'enterprise_bg_color',
      }, {
        link_title: '事務型',
        color: 'thing_bg_color',
      }],
    }
  },
  mounted() {
    //登入
    axios.post('./php/memberStateCheck.php')
      .then(res => {
        console.log(res);
        this.memberCheck = res.data;
        if (this.memberCheck == 0) {
          alert("請先登入會員");
          window.location.href = "./member_sign_in.html"
        } else {
          sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

 //其他載入php
  axios.all([this.funcA(), this.funcC()])
    .then(axios.spread((res1, res3) => {
    console.log(res1.data);
    console.log(res3.data);


     this.information = res1.data;
     this.searchResult = res1.data;
    this.announcement = res3.data;
    for(var j = 0; j < this.searchResult.length; j ++){
      if(i == 0){
        this.searchResult[j].isHeart = true;
      }else{}
      this.searchResult[j].isHeart = false;
    }

 }))
 .catch((err) => { console.error(err) })


    //喜歡
    all =[];
    var formData = new FormData();
    formData.append("member", sessionStorage.getItem("memNo"));
    console.log(formData)

    axios.post('./php/forum_discuss_like.php', formData)
      .then(res => {
        console.log(res.data);
        this.like_icon = res.data;
        console.log(this.like_icon)
        console.log(this.information)
        // for(var j = 0; j < this.searchResult.length; j ++){
        //  console.log(this.searchResult[j].DIS_NO);


          // for(var i = 0; i < this.like_icon.length; i++){
          //   console.log(this.like_icon[0].MEM_NO);
            
          //   if(i == 0){
          //     this.searchResult[i].isHeart = true;
          //   }else{
          //   this.searchResult[i].isHeart = false;
          // }
            // this.searchResult[i].isHeart = true;
          // }
       
        // }

      })
      .catch(function (error) {
        console.log(error);
      });

  
  },
  watch: {
    stopScroll: function () {
      console.log(this.stopScroll)
      if (this.stopScroll) {
        document.body.classList.add('noScroll');
      } else {
        document.body.classList.remove('noScroll');

      }
    },
    filter: function (value) {
      if (value.length == 0) {
        this.searchResult = this.information;
      }
    },
    select: function (value) {
      this.searchResult = this.information;
      if (value == "全部文章") {
        this.searchResult = this.information;
      } else if (value == "熱門討論") {
        this.searchResult = this.information.sort(function (a, b) {
          return a.d_heart < b.d_heart ? 1 : -1;
        })
      } else {
        this.searchResult = this.information.filter(function (a, b) {
          return a.d_qu == value
        })
      }
    }
  },
  methods: {
    funcA() {
      // return axios.get(`./php/forum_discuss.php?aaa=$
      // {}1&bbb=222`)
      const memNo = sessionStorage.getItem('memNo');
      return axios.get('./php/forum_discuss.php')
    },
    funcC() {
      const memNo = sessionStorage.getItem('memNo');
      return axios.get('./php/forum_discuss_ann.php')
    },
    //開啟燈箱按鈕
    openContent(index) {

      //留言回覆的訊息
      var formData = new FormData();
      formData.append('DIS_NO', this.searchResult[index].DIS_NO);
      console.log(formData)

      axios.post('./php/forum_discuss_msg.php', formData)
        .then(res => {
          console.log(res.data);
          this.box_msg = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });


      this.aaa = index;
      if (this.contentIsOpen) {
        this.contentIsOpen = false
        this.stopScroll = false
        this.msg = ""
      } else {
        this.contentIsOpen = true
        this.stopScroll = true
        console.log(this.searchResult[index])
        this.msg = this.searchResult[index]
        console.log(this.msg)
      }
    },
    //關閉燈箱
    close_openContent() {
      if (this.contentIsOpen) {
        this.contentIsOpen = false
        this.stopScroll = false
      } else {
        this.contentIsOpen = true
        this.stopScroll = true
      }
    },
    //側邊欄搜尋
    search(type) {
      const result = this.information.filter(element => {
        return element.IND_CLASS == type
      });
      this.searchResult = result;
      this.select = "選擇分類";
    },
    //關鍵字搜尋
    searchContent() {
      const keyword = this.filter;
      const result = this.information.filter(element => {
        return (element.d_title.indexOf(keyword) != -1 || element.d_text.indexOf(keyword) != -1)
        // return element.d_title == type
      });
      this.searchResult = result;
    },
    //關鍵字搜尋，點擊Enter按鈕事件
    submit() {
      this.searchContent();
    },
    //關閉檢舉燈箱
    btn_modal() {
      if (this.accuseIsOpen) {
        this.accuseIsOpen = false
        this.stopScroll = false
      } else {
        this.accuseIsOpen = true
        this.stopScroll = true
      }
    },
    //開啟檢舉燈箱
    accuse_btn() {
      if (this.accuseIsOpen) {
        this.accuseIsOpen = false
        this.stopScroll = false
      } else {
        this.accuseIsOpen = true
        this.stopScroll = true
      }
    },
    //愛心
    heart_btn(e, num) {
      // alert("123")
      // this.isHeart = !this.isHeart
      if (num == 1) {
        $(".msg_content .fa-heart").eq(e).toggleClass("colorRed");
        $(".check_content .fa-heart").eq(e).toggleClass("colorRed");
        console.log(e);
      } else {
        console.log(this.aaa)
        event.target.classList.toggle("colorRed");
        $(".msg_content .fa-heart").eq(vm.$data.aaa).toggleClass("colorRed")
      }
    },
    //收藏
    collect_btn(e, num) {
      if (num == 1) {
        $(".msg_content .fa-bookmark").eq(e).toggleClass("colorGray");
        $(".check_content .fa-bookmark").eq(e).toggleClass("colorGray");
        console.log(e);
      } else {
        console.log(this.aaa)
        event.target.classList.toggle("colorGray");
        $(".msg_content .fa-bookmark").eq(vm.$data.aaa).toggleClass("colorGray")
      }
    },
    //下拉選單
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeOverlay() {
      this.contentIsOpen = false
      this.stopScroll = false
    },
    //側邊欄點擊提示
    cart_click_bg(e) {
      // $(`#${this.category[index].link_from}`).addClass('side_click');
      $('.main_side_bar > ul> li > a').removeClass('side_click')
      e.currentTarget.classList.add('side_click');
    },
    heart_btn_feedback(index) {


    }

  },
});