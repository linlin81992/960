let vm = new Vue({
  el: "#course_main",
  data() {
    return {
      category: [
        {
          link_from: "practical",
          link_to: "practical_session",
          link_title: "實作型",
          color: "practical_bg_color",
        },
        {
          link_from: "research",
          link_to: "research_session",
          link_title: "研究型",
          color: "research_bg_color",
        },
        {
          link_from: "art",
          link_to: "art_session",
          link_title: "文藝型",
          color: "art_bg_color",
        },
        {
          link_from: "social",
          link_to: "social_session",
          link_title: "社會型",
          color: "social_bg_color",
        },
        {
          link_from: "enterprise",
          link_to: "enterprise_session",
          link_title: "企業型",
          color: "enterprise_bg_color",
        },
        {
          link_from: "thing",
          link_to: "thing_session",
          link_title: "事務型",
          color: "thing_bg_color",
        },
      ],

      // 接收資料庫的hot_course,記得先關掉假資料
      hot_course: [],

      // 假資料
      // hot_course: [{
      //         id: 1,
      //         img: "img/course/course_img/R/課程照片-線上實作：酒及飲料調製.jpg",
      //         href: "course_introduce.html",
      //         course_title: "九個步驟快速提昇簡報力",
      //         type: "實作型",
      //         color: "practical_bg_color",
      //         join: 9999,
      //         hour: 3,
      //         price: 660,
      //     },
      //     {
      //         id: 3,
      //         img: "img/course/course_img/i/課程照片-人工智慧TENSORFLOW上手實作班 .jpg",
      //         href: "course_introduce.html",
      //         course_title: "打造團隊好關係與高績效",
      //         type: "研究型",
      //         color: "research_bg_color",
      //         join: 7777,
      //         hour: 7,
      //         price: 770,
      //     },
      //     {
      //         id: 5,
      //         img: "img/course/course_img/A/課程照片-行銷必上文案課：受眾溝通與表達.png",
      //         href: "course_introduce.html",
      //         course_title: "行銷=內容x社群x商務",
      //         type: "文藝型",
      //         color: "art_bg_color",
      //         join: 9999,
      //         hour: 9,
      //         price: 990,
      //     },
      //     {
      //         id: 7,
      //         img: "img/course/course_img/s/課程照片-社會心理學.png",
      //         href: "course_introduce.html",
      //         course_title: "行銷=內容x社群x商務",
      //         type: "社會型",
      //         color: "social_bg_color",
      //         join: 5555,
      //         hour: 5,
      //         price: 550,
      //     },
      // ],
      cart_items: [],
    };
  },
  mounted() {
    this.main_course_api();
    this.hot_course_api();
    this.receive_storage();
    // parallax
    // script = document.createElement("script");
    // script.src = "./js/course/parallax_script.js";
    // document.body.appendChild(script);

    // course_main
    script = document.createElement("script");
    script.src = "./js/course/course_main.js";
    document.body.appendChild(script);

    this.check_member_api();
  },
  methods: {
    add_storage() {
      let ss = " ";
      // this.cart_items.forEach((item) => {
      //     ss += JSON.stringify(item) + "*";
      // });
      ss = JSON.stringify(this.cart_items);

      localStorage.setItem("cart", ss);
    },
    receive_storage() {
      if (localStorage.getItem("cart")) {
        let get_id = localStorage.getItem("cart");
        // let get_id_arr = get_id.split("*");
        // get_id_arr.forEach((course, index) => {
        //     if (index < get_id_arr.length - 1) {
        //         let course_item = JSON.parse(course);
        //         this.cart_items.push(course_item);
        //         $(`.cus_${course_item.id}`).addClass("cart_clicked");
        //     }
        // });
        this.cart_items = JSON.parse(get_id);
        if (this.cart_items.length > 0) {
          //   this.cart_items.forEach((card) => {
          //     $(`.cus_${card.ski_no}`).addClass("cart_clicked");
          //   });
          for (let i = 0; i < this.cart_items.length; i++) {
            $(`.cus_${this.cart_items[i].ski_no}`).addClass("cart_clicked");
          }
        }
      }
    },
    add_cart(item) {
      if (this.cart_items.length == 0) {
        this.cart_items.push(item);
      } else {
        let check = true;
        for (i = 0; i < this.cart_items.length; i++) {
          if (this.cart_items[i].ski_no == item.ski_no) {
            check = false;
            alert("購物車內已有此課程囉!");
          }
        }

        if (check) {
          this.cart_items.push(item);
        }
      }
      this.add_storage();
      $(`.cus_${item.ski_no}`).addClass("cart_clicked");
    },
    remove_item(index) {
      $(`.cus_${this.cart_items[index].ski_no}`).removeClass("cart_clicked");
      // e.currentTarget.classList.remove('cart_clicked');
      this.cart_items.splice(index, 1);
      this.add_storage();
    },
    side_click_bg(e) {
      // $(`#${this.category[index].link_from}`).addClass('side_click');
      $(".main_side_bar > ul> li > a").removeClass("side_click");
      e.currentTarget.classList.add("side_click");
    },
    hot_course_api() {
      axios
        .get("./php/course_hot_course.php")
        .then((res) => {
          console.log(res);
          this.hot_course = res.data;

          // OWL套件
          script = document.createElement("script");
          script.src = "./js/course/owl_auto_slide.js";
          document.body.appendChild(script);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    main_course_api() {
      axios
        .get("./php/course_course_list.php")
        .then((res) => {
          console.log(res);

          // 將課程總覽用filter（當總覽內的ind_class == category的link_title）代入this.category
          for (let i = 0; i < this.category.length; i++) {
            this.category[i].courses = res.data.filter(
              (item) => item.ind_class == this.category[i].link_title
            );
          }
          console.log(this.category);
          // this.main_course = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    check_member_api() {
      axios
        .get("./php/memberStateCheck.php")
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            if (res.data != 0) {
              let memName = res.data.split(";")[1];
              $("div.member > a").html("Hi," + memName);
              $("#header_logOut").css("display", "block");
            }
          }
          // this.hot_course = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    header_logOut() {
      axios
        .get("./php/member_logOut.php")
        .then((res) => {
          if (res.status == 200) {
            location.reload();
            $("#header_logOut").css("display", "none");

            // $("#header_logOut").css("display", "none");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    owl_slide() {
      $(".auto_slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    },
  },
  computed: {
    add_total() {
      let total = 0;
      for (i = 0; i < this.cart_items.length; i++) {
        total += parseInt(this.cart_items[i].ski_price);
      }
      return total;
    },
    discount() {
      if (this.cart_items.length >= 2) {
        let discount = this.add_total * 0.2;
        return discount;
      } else {
        return 0;
      }
    },
    final_price() {
      let final = this.add_total - this.discount;
      return final;
    },
  },
});
