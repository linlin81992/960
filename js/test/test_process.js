// const imagemin = require("gulp-imagemin");

// 計時器
var nowtime=0
setInterval(
  function(){
    nowtime=nowtime+1;
    $(".timimg").text(nowtime);},1000);

// vueHere
let data ={
  width:30,
  index:0,
  totalScore : [0,0,0,0,0,0],
  option1:[
      {question:'1. 在閒暇之餘你喜歡做什麼事？', src1:'./img/test/answerimg/0101.svg',
     answer1:'畫圖',value:'A'},
      {question:'2. 身為大四生的你只差一門課就畢業，你會選擇什麼樣的課程？', src1:'./img/test/answerimg/0201.svg',
     answer1:'寫作',value:'A'},
      {question:'3. 有天你跟著家人來到一座森林裡野餐，心情不好的你會：', src1:'./img/test/answerimg/0301.svg',
     answer1:'到處走走看有沒有特別的昆蟲',value:'I'},
      {question:'4. 如果你在深山裡迷路了，你會？', src1:'./img/test/answerimg/0401.svg',
    answer1:'憑直覺，往回走',value:'A'},
      {question:'5. 我不太清楚這個旅遊行程', src1:'./img/test/answerimg/0501.svg',
     answer1:'我自己看研究一下',value:'I'},
      {question:'6. 老闆交代了今天的代辦事項', src1:'./img/test/answerimg/0601.svg',
      answer1:'照辦並如期完成',value:'C'},
      {question:'7. 明天的旅遊行程泡湯了', src1:'./img/test/answerimg/0701.svg',
      answer1:'因為計畫改變而感到很沮喪',value:'C'},
      {question:'8. 網購的商品晚了三天還沒送達⋯', src1:'./img/test/answerimg/0801.svg',
    answer1:'在等等看吧',value:'S'},
      {question:'9. 計畫去海邊卻遇到下雨..', src1:'./img/test/answerimg/0901.svg',
     answer1:'沒關係，下次還有機會',value:'C'},
      {question:'10. 全班倒數三名要掃廁所', src1:'./img/test/answerimg/1001.svg',
      answer1:'努力讀書保持好成績',value:'R'},
      {question:'11. 當你發現屋內的燈都不亮時,你會?', src1:'./img/test/answerimg/1101.svg',
    answer1:'直接請水電來看',value:'S'},
      {question:'12. 當你需要的零件，缺貨時你會?', src1:'./img/test/answerimg/1201.svg',
    answer1:'等待',value:'A'},
      {question:'13. 生日禮物收到拼圖..', src1:'./img/test/answerimg/1301.svg',
    answer1:'找人一起拚比較快',value:'S'},
      {question:'14. 在交往的時候..', src1:'./img/test/answerimg/1401.svg',
    answer1:'愛就要大聲說出來',value:'A'},
      {question:'15. 對金錢的觀念', src1:'./img/test/answerimg/1501.svg',
   answer1:'人生苦短，及時行樂',value:'E'},
      {question:'16. 看到路邊有受傷的動物，你會?', src1:'./img/test/answerimg/1601.svg',
    answer1:'無視牠',value:'C'},
      {question:'17. 當遇到緊急事件時你會?', src1:'./img/test/answerimg/1701.svg',
    answer1:'不知所措',value:'A'},
      {question:'18. 當你的朋友家裡發生家暴,你會?', src1:'./img/test/answerimg/1801.svg',
    answer1:'打113',value:'R'}
  ],
  option2:[
    {question:'1. 在閒暇之餘你喜歡做什麼事？',
    src2:'./img/test/answerimg/0102.svg', answer2:'拼圖',value:'R'},
    {question:'2. 身為大四生的你只差一門課就畢業，你會選擇什麼樣的課程？', src1:'./img/test/answerimg/0201.svg',
    src2:'./img/test/answerimg/0202.svg',answer2:'國際貿易',value:'E'},
    {question:'3. 有天你跟著家人來到一座森林裡野餐，心情不好的你會：',
    src2:'./img/test/answerimg/0302.svg',answer2:'找個陰涼處坐下來欣賞美麗的景色',value:'A'},
    {question:'4. 如果你在深山裡迷路了，你會？', 
    src2:'./img/test/answerimg/0402.svg',answer2:'在走過的路上做記號',value:'E'},
    {question:'5. 我不太清楚這個旅遊行程', 
    src2:'./img/test/answerimg/0502.svg',answer2:'我打電話去確認一下好',value:'C'},
    {question:'6. 老闆交代了今天的代辦事項', 
    src2:'./img/test/answerimg/0602.svg',answer2:'會提醒老闆還有沒交代的工作',value:'S'},
    {question:'7. 明天的旅遊行程泡湯了', 
    src2:'./img/test/answerimg/0702.svg',answer2:'沒差，在家也很好',value:'A'},
    {question:'8. 網購的商品晚了三天還沒送達⋯',
    src2:'./img/test/answerimg/0802.svg',answer2:'打電話給客服詢問',value:'E'},
    {question:'9. 計畫去海邊卻遇到下雨..',
    src2:'./img/test/answerimg/0902.svg',answer2:'衝一波，下雨也有下雨的玩法',value:'E'},
    {question:'10. 全班倒數三名要掃廁所', 
    src2:'./img/test/answerimg/1002.svg',answer2:'跟老師理論掃廁所是全班責任',value:'E'},
    {question:'11. 當你發現屋內的燈都不亮時,你會?', 
    src2:'./img/test/answerimg/1102.svg',answer2:'檢查配電盤',value:'I'},
    {question:'12. 當你需要的零件，缺貨時你會?',
    src2:'./img/test/answerimg/1202.svg',answer2:'用各種方法查詢',value:'I'},
    {question:'13. 生日禮物收到拼圖..',
    src2:'./img/test/answerimg/1302.svg',answer2:'自己慢慢拼比較好玩',value:'R'},
    {question:'14. 在交往的時候..', 
    src2:'./img/test/answerimg/1402.svg',answer2:'說出口太粗俗，行動比較真誠',value:'R'},
    {question:'15. 對金錢的觀念', 
    src2:'./img/test/answerimg/1502.svg',answer2:'一輩子很長，儲蓄很重要',value:'R'},
    {question:'16. 看到路邊有受傷的動物，你會?',
    src2:'./img/test/answerimg/1602.svg',answer2:'通報動物協會',value:'S'},
    {question:'17. 當遇到緊急事件時你會?', 
    src2:'./img/test/answerimg/1702.svg',answer2:'冷靜分析',value:'S'},
    {question:'18. 當你的朋友家裡發生家暴,你會?', 
    src2:'./img/test/answerimg/1802.svg',answer2:'去了解問題的原因,去做改善',value:'S'}
]
}

// var totalScore = [0,0,0,0,0,0]
// 以上順序分別代表[R,A,I,S,E,C] 
// 用if else * 6 去跑
// e.g. if value = A, 就在total[0] 加一

let testtest = new Vue({
  el: '#testProcess',
  data: data,
  methods: {
      changeIndex(change, value){
        this.index += change;
        // alert(value);
        if (value ==='R'){
          this.totalScore[0] = this.totalScore[0]+1
        } else if(value ==='I'){
          this.totalScore[1] = this.totalScore[1]+1
        } else if(value ==='A'){
          this.totalScore[2] = this.totalScore[2]+1
        }else if(value ==='S'){
          this.totalScore[3] = this.totalScore[3]+1
        }else if(value ==='E'){
          this.totalScore[4] = this.totalScore[4]+1
        }else if(value ==='C'){
          this.totalScore[5] = this.totalScore[5]+1
        } 
      },
      divWidth(){
      console.log('click')
    },
    changePage(){
      if( this.index === 18 ){
        localStorage.result = this.totalScore;
        window.location.href = "./test_result.html";
      }
    } 
  },
  computed:{
    divStyle:function(){
      return {
        width: this.width+'px',
      }
    }
  }
  
})

