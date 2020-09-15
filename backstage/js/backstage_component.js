// Vue.component('account', {
//   template: `
//     <div class="account" v-show="account">
//           會員
//           <form>
//             <input type="text">
//             <button>查詢</button>
//           </form>
//           <table>
//             <tr>
//               <th>編號</th>
//               <th>名稱</th>
//               <th>生日</th>
//               <th>電話</th>
//               <th>電子郵件</th>
//               <th>停權</th>
//             </tr>
//             <tr>
//               <td>123</td>
//               <td>王先生</td>
//               <td>1993/7/15</td>
//               <td>0919123456</td>
//               <td>123@gmail.com</td>
//               <td>無
//                 <select name="authority" id="">
//                   <option value="authority">是</option>
//                   <option value="authority">否</option>
//                 </select>
//               </td>
//             </tr>
//           </table>
//          </div>
//   `,
// });



new Vue({
  el: '#bg_stage',
  data: {
    members: ['會員管理', '管理員管理'],
    lists: ['題庫管理', '行業管理', '課程管理', '文章檢舉管理', '留言檢舉管理', '訂單管理', '明信片素材管理', '公告管理'],

    account: true,
    administrator: false,
    quiz: false,
    industry: false,
    skill_class: false,
    article_report: false,
    message_report: false,
    order_mem: false,
    postcard_material: false,
    announcement: false,


    types: ['實作型', '研究型', '文藝型', '社會型', '企業型', '事務型'],
    typeValues: ['R', 'I', 'A', 'S', 'E', 'C'],

  },
  methods: {
    show(index) {
      if (index == 0) {
        this.account = true;
        this.administrator = false;
        this.quiz = false;
        this.industry = false;
        this.skill_class = false;
        this.article_report = false;
        this.message_report = false;
        this.order_mem = false;
        this.postcard_material = false;
        this.announcement = false;

      } else {
        this.account = false;
        this.administrator = true;
        this.quiz = false;
        this.industry = false;
        this.skill_class = false;
        this.article_report = false;
        this.message_report = false;
        this.order_mem = false;
        this.postcard_material = false;
        this.announcement = false;
      }
      // alert(index);

    },
    showBoard(index) {
      switch (index) {
        case 0:
          this.quiz = true;
          this.account = false;
          this.administrator = false;
          this.industry = false;
          this.skill_class = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 1:
          this.industry = true;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.skill_class = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 2:
          this.skill_class = true;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 3:
          this.skill_class = false;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = true;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 4:
          this.skill_class = false;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = false;
          this.message_report = true;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 5:
          this.skill_class = false;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = true;
          this.postcard_material = false;
          this.announcement = false;
          break;
        case 6:
          this.skill_class = false;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = true;
          this.announcement = false;
          break;
        case 7:
          this.skill_class = false;
          this.account = false;
          this.administrator = false;
          this.quiz = false;
          this.industry = false;
          this.article_report = false;
          this.message_report = false;
          this.order_mem = false;
          this.postcard_material = false;
          this.announcement = true;
          break;
      }

    }
    // if (index == 0) {
    //   this.quiz = true;
    //   this.account = false;
    //   this.administrator = false;

    // } else {
    //   this.account = false;
    //   this.administrator = true;
    // }

  },
});