let memData = {
    loadData:'',
    loadDataTemp: new Array(),
    memberCheck: 0,
    title: ['會員資料', '我的分析', '我的課程', '我的收藏', '我的明信片', '訂單紀錄'],
    // title: ['會員資料', '我的分析', '我的課程', '我的收藏', '我的明信片', '訂單紀錄', '訊息'],
    liTitle: ['liDat', 'liAna', 'liClas', 'liCol', 'liPos', 'liOrd'],
    // liTitle: ['liDat', 'liAna', 'liClas', 'liCol', 'liPos', 'liOrd', 'liMes'],
    secTitle: ['文章', '課程'],
    member: new Object(),
    memberTemp: {
        name: '',
        birthday: '',
        tel: '',
        code: '',
    },
    memberAnalysis: new Array(),
    analysisResult: new Array(),
    memberClass: new Array(),
    memberClassCollection: new Array(),
    memberArticle: new Array(),
    memberPostCard: new Array(),
    memberOrder: new Array(),
    memberOrderList: new Array(),
    // memberClassCollection: [
    //     {name: '社會心理學', teacher: '劉威德'},
    //     {name: '翻轉課堂的職業講師祕訣', teacher: '王永福'}
    // ],
    // memberArticle: [
    //     {title: '我想學程式，但到底該從哪個語言入門？', content: '身處在這個「全民學程式」時代，幾年後當程式設計變成連國中生都必備的能力時，不會寫程式的人在未來就要變成少數民族。當越來越多人開始對學程式語言有興趣，大家常常問的第一個問題就是，到底該從哪個程式語言開始？'},
    //     {title: 'LSTM的簡單介紹，附情感分析應用', content: '長短期記憶網絡，通常稱為「LSTM」(Long Short Term Memory network,由Schmidhuber和Hochreiterfa提出)。它已經被廣泛用於語音識別，語言建模，情感分析和文本預測。在深入研究LSTM之前，我們首先應該了解LSTM的要求，它可以用實際使用遞歸神經網絡（RNN）的缺點來解釋。所以，我們要從RNN講起。'}
    // ],
    // memberPostCard: [
    //     {creatDate: '109/01/01', sentDate: '109/04/20', postSend: true, postSrc: './img/post_card/postCard.png'},
    //     {creatDate: '109/03/07', sentDate: '109/11/02', postSend: false, postSrc: './img/post_card/postCard.png'}
    // ],
    // memberOrder: [
    //     {title: '社會心理學', buyDate: '109/04/20', price: '123$'},
    //     {title: '2門課程', buyDate: '109/05/20', price: '456$'},
    //     {title: '社會心理學', buyDate: '109/06/20', price: '123$'}
    // ],
    // memberOrderList: [
    //     [{name: '社會心理學', teacher: '劉威德'}],
    //     [
    //         {name: '社會心理學', teacher: '劉威德'},
    //         {name: '翻轉課堂的職業講師祕訣', teacher: '王永福'}
    //     ],
    //     [{name: '社會心理學', teacher: '劉威德'}]
    // ],
    memberMessage: [
        {sentDate: '109/05/20', title: '您有一封明信片！！'},
        {sentDate: '109/05/22', title: '您的文章有人回復'},
        {sentDate: '109/05/29', title: '您的文章被檢舉，已刪除'}
    ],
    currentPage: '會員資料',
    checkAnalysisResult: false,
    checkMemClass: false,
    checkMemClassCollection: false,
    checkMemArticle: false,
    checkMemPostcard: false,
    checkMemOrder: false,
    checkMemMessage: false,
    collecttionChange: false,
    liSecondArrow: -1,
    myChart: '',
    rwdClickPage: false,
    rwdUse: false,
    fixMode: false,
    fixNewCode: false,
    newCodeEqual: false,
    newCodeEqualWord: false,
    memImage: null,
    screenWidth : 0
}

let headerHidden = new Vue({
    el: '.header_wrap',
    data: memData
})

let changeMemContent = new Vue({
    el: '#mem_change',
    data: memData,
    mounted() {
        axios
        .post('./php/memberStateCheck.php')
        .then((resp) => {
            this.memberCheck = resp.data;
            // localStorage.memNo = this.memberCheck.split(';')[0];
            if(this.memberCheck == 0){
                alert("請先登入會員");
                window.location.href="./member_sign_in.html"
            }
            else{
                var formData = new FormData();
                formData.append('memNo', this.memberCheck.split(';')[0]);
                axios
                .post('./php/memberLoadData.php', formData)
                .then((resp) => {
                    this.loadData = resp.data;
                    this.loadData = this.loadData.split(']');
                    for(var i = 0; i < this.loadData.length-1; i++){
                        this.loadData[i] = this.loadData[i] + ']';
                        this.loadDataTemp[i] = JSON.parse(this.loadData[i]);
                    }
                    this.member.name = this.loadDataTemp[0][0].MEM_NAME;
                    this.member.tel = this.loadDataTemp[0][0].MEM_TEL;
                    this.member.code = this.loadDataTemp[0][0].MEM_CODE;
                    this.member.email = this.loadDataTemp[0][0].MEM_EMAIL;
                    this.member.src = this.loadDataTemp[0][0].MEM_PIC;
                    this.member.no = this.loadDataTemp[0][0].MEM_NO;
                    this.memImage = this.loadDataTemp[0][0].MEM_PIC;
                    this.member.codeCheck = "";
                    this.member.newCode = "";
                    this.member.checkNewcode = "";
                    for(var i = 0; i < this.loadDataTemp[1].length; i++){
                        this.memberAnalysis.push(new Object());
                        this.memberAnalysis[i].testDate = this.loadDataTemp[1][i].QUIZ_RES_DATE;
                        this.memberAnalysis[i].industType = this.loadDataTemp[1][i].IND_CLASS;
                        this.memberAnalysis[i].industTypeInfo = this.loadDataTemp[1][i].IND_INFO;
                        this.analysisResult.push(new Array(6));
                        this.analysisResult[i][0] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_R;
                        this.analysisResult[i][1] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_I;
                        this.analysisResult[i][2] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_A;
                        this.analysisResult[i][3] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_S;
                        this.analysisResult[i][4] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_E;
                        this.analysisResult[i][5] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_C;
                    }
                    for(var i = 0; i < this.loadDataTemp[2].length; i++){
                        this.memberClass.push(new Object());
                        this.memberClass[i].name = this.loadDataTemp[2][i].SKI_NAME;
                        this.memberClass[i].teacher = this.loadDataTemp[2][i].SKI_TEC_NAME;
                        this.memberClass[i].src = this.loadDataTemp[2][i].SKI_IMG;
                    }
                    for(var i = 0; i < this.loadDataTemp[3].length; i++){
                        this.memberClassCollection.push(new Object());
                        this.memberClassCollection[i].name = this.loadDataTemp[3][i].SKI_NAME;
                        this.memberClassCollection[i].teacher = this.loadDataTemp[3][i].SKI_TEC_NAME;
                        this.memberClassCollection[i].src = this.loadDataTemp[3][i].SKI_IMG;
                        this.memberClassCollection[i].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    for(var i = 0; i < this.loadDataTemp[4].length; i++){
                        this.memberArticle.push(new Object());
                        this.memberArticle[i].title = this.loadDataTemp[4][i].DIS_NAME;
                        this.memberArticle[i].no = this.loadDataTemp[4][i].DIS_NO;
                    }
                    for(var i = 0; i < this.loadDataTemp[5].length; i++){
                        this.memberPostCard.push(new Object());
                        this.memberPostCard[i].creatDate = this.loadDataTemp[5][i].POS_CRE_DATE;
                        this.memberPostCard[i].sentDate = this.loadDataTemp[5][i].POS_SEN_DATE;
                        this.memberPostCard[i].postSrc = this.loadDataTemp[5][i].POS_PIC;
                        this.memberPostCard[i].postSrcBack = this.loadDataTemp[5][i].POS_PIC_BACK;
                        if(new Date(this.loadDataTemp[5][i].POS_SEN_DATE) <= new Date()){
                            this.memberPostCard[i].postSend = true;
                        }
                        else{
                            this.memberPostCard[i].postSend = false;
                        }
                    }
                    var orderNo;
                    var orderNoCon = 0;
                    var orderLisCon;
                    for(var i = 0; i < this.loadDataTemp[7].length; i++){
                        this.memberOrder.push(new Object());
                        this.memberOrderList[i] = new Array();
                        for(var orderNo = 0; orderNo < parseInt(this.loadDataTemp[7][i].商品數量); orderNo++){
                            if(parseInt(this.loadDataTemp[7][i].商品數量) == 1){
                                this.memberOrder[i].title = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrder[i].buyDate = this.loadDataTemp[6][orderNoCon + orderNo].ORD_DATE;
                                this.memberOrder[i].price = this.loadDataTemp[6][orderNoCon + orderNo].ORD_AMOUNT;
                                orderLisCon = 0;
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                            else if(orderNo == 0){
                                this.memberOrder[i].title = this.loadDataTemp[7][i].商品數量 + "門課程";
                                this.memberOrder[i].buyDate = this.loadDataTemp[6][orderNoCon + orderNo].ORD_DATE;
                                this.memberOrder[i].price = this.loadDataTemp[6][orderNoCon + orderNo].ORD_AMOUNT;
                                orderLisCon = 0;
                                this.memberOrderList[i] = new Array();
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                            else{
                                orderLisCon = orderLisCon + 1;
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                        }
                        orderNoCon = orderNoCon + orderNo;
                    }
                    // console.log(resp.data);
                    // console.log(this.loadDataTemp[6]);
                    // console.log(this.loadDataTemp[7]);
                    // console.log(this.analysisResult);

                    this.screenWidth = document.documentElement.clientWidth;
                    this.myChart = Array(this.analysisResult.length);
                    if(this.screenWidth >= 992){
                        var liChange = document.querySelectorAll('.mem_list>ul>li');
                        liChange[0].style.backgroundColor = '#A0CADB';
                    }
                    if(this.screenWidth < 768){
                        this.rwdUse = true;
                    }
                    else{
                        this.rwdUse = false;
                    }
                    if(this.analysisResult.length != 0){
                        this.checkAnalysisResult = true;
                    }
                    if(this.memberClass.length != 0){
                        this.checkMemClass = true;
                    }
                    if(this.memberClassCollection.length != 0){
                        this.checkMemClassCollection = true;
                    }
                    if(this.memberArticle.length != 0){
                        this.checkMemArticle = true;
                    }
                    if(this.memberPostCard.length != 0){
                        this.checkMemPostcard = true;
                    }
                    if(this.memberOrder.length != 0){
                        this.checkMemOrder = true;
                    }
                    if(this.memberMessage.length != 0){
                        this.checkMemMessage = true;
                    }
                });
            }
        });
    },
    created() {
        window.addEventListener('resize', this.changeWidth);
        window.addEventListener('resize', this.plotRadarReSize);
    },
    destroyed() {
        window.removeEventListener('resize', this.changeWidth);
    },
    methods: {
        changeWidth(e){
            this.screenWidth = document.documentElement.clientWidth;
            if(this.screenWidth < 992){
                var liChange = document.querySelectorAll('.mem_list>ul>li');
                for(var i = 0; i < liChange.length; i++){
                    liChange[i].style.backgroundColor = 'transparent';
                }
            }
            if(this.screenWidth < 768){
                this.rwdUse = true;
            }
            else{
                this.rwdUse = false;
            }
        },
        changePages(e){
            var liChange = document.querySelectorAll('.mem_list>ul>li');
            var liShowSecond = document.querySelectorAll('.mem_list>ul>li')[3].querySelector('ul');
            for(var i = 0; i < liChange.length; i++){
                liChange[i].style.backgroundColor = 'transparent';
            }
            liChange[e].style.backgroundColor = '#A0CADB';
            if(e != 3){
                liShowSecond.classList.remove('li_sec_show');
                this.liSecondArrow = -1;
            }
            else if(this.screenWidth < 975 && e == 3){
                liShowSecond.classList.toggle('li_sec_show');
                this.liSecondArrow = -1;
            }
            else{
                liShowSecond.classList.add('li_sec_show');
                this.liSecondArrow = 0;
                this.collecttionChange = false;
            }
            this.currentPage = this.title[e];
        },
        changeSecondPages(e){
            this.currentPage = this.title[3];
            if(975 < this.screenWidth){
                var liChange = document.querySelectorAll('.mem_list>ul>li');
                for(var i = 0; i < liChange.length; i++){
                liChange[i].style.backgroundColor = 'transparent';
                }
            }
            this.liSecondArrow = e;
            if(e == 0){
                this.collecttionChange = false;
            }
            else{
                this.collecttionChange = true;
            }
        },
        rwdChangePages(e){
            if(this.screenWidth < 975 && e != 3){
                return this.rwdClickPage = !this.rwdClickPage;
            };
        },
        changeImage(e){
            var input = e.target;
            if (input.files){
                var reader = new FileReader();
                reader.onload = (e) => {
                  this.member.src = e.target.result;
                  this.memImage = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
                imageSend = new FormData();
                imageSend.append('imageStore', input.files[0]);
                imageSend.append('memNo', this.memberCheck.split(';')[0]);
                axios
                .post('./php/memberUpdateImage.php',imageSend)
                .then((resp) => {
                    console.log(resp.data);
                })
            }
        },
        showPage(index){
            document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_ana_det').classList.toggle('show');
            var arrowChange = document.querySelectorAll('.mem_ana_area')[index].querySelector('.fas');
            var spanText = document.querySelectorAll('.mem_ana_area')[index].querySelector('span');
            if(spanText.textContent == "詳細資訊"){
                spanText.textContent = "關閉資訊";
                arrowChange.style.transform = "rotate(180deg)";
            }
            else{
                spanText.textContent = "詳細資訊";
                arrowChange.style.transform = "rotate(0deg)";
            }
        },
        plotRadar(index, anaValue){
            this.myChart[index] = echarts.init(document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_plot'), null, {renderer: 'svg'});
            var option = {
                baseOption: {
                    title: {
                        text: '分析結果',
                        show: false
                    },
                    tooltip: {},
                    legend: {
                        data: ['分析結果'],
                        show: false
                    },
                    radar: {
                        shape: 'circle',
                        name: {
                            textStyle: {
                                color: 'black',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 1]
                            }
                        },
                        indicator: [
                            { name: '實作型（R）', max: 100},
                            { name: '研究型（I）', max: 100},
                            { name: '文藝型（A）', max: 100},
                            { name: '社會型（S）', max: 100},
                            { name: '企業型（E）', max: 100},
                            { name: '事務型（C）', max: 100}
                        ]
                    },
                    series: [{
                        name: '分析結果',
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data: [
                            {
                                value: anaValue,
                                name: '分析結果'
                            }
                        ],
                        lineStyle: {
                            color: "rgba(50, 87, 200, 1)"
                        },
                        symbolSize: 10,
                        symbol: "diamond"
                    }]
                },
                media: [
                    {
                        query: {
                            minWidth: 200,
                            maxHeight: 300
                        },
                        option: {
                            series:[{
                                center: ['50%', '50%']
                            }]
                        }
                    }
                ]
            };
            this.myChart[index].setOption(option);
        },
        plotRadarReSize(){
            if(document.querySelectorAll('.mem_plot').length > 0){
                for(var i = 0; i < this.myChart.length; i = i + 1){
                    if(typeof this.myChart[i] != "undefined"){
                        // console.log(i);
                        var index = i;
                        var anaValue = this.analysisResult[i];
                        if (this.myChart[index] != null && this.myChart[index] != "" && this.myChart[index] != undefined) {
                            this.myChart[index].dispose();//銷燬
                        }
                        this.myChart[index] = echarts.init(document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_plot'), null, {renderer: 'svg'});
                        var option = {
                            baseOption: {
                                title: {
                                    text: '分析結果',
                                    show: false
                                },
                                tooltip: {},
                                legend: {
                                    data: ['分析結果'],
                                    show: false
                                },
                                radar: {
                                    shape: 'circle',
                                    name: {
                                        textStyle: {
                                            color: 'black',
                                            backgroundColor: '#999',
                                            borderRadius: 3,
                                            padding: [3, 1]
                                        }
                                    },
                                    indicator: [
                                        { name: '實作型（R）', max: 100},
                                        { name: '研究型（I）', max: 100},
                                        { name: '文藝型（A）', max: 100},
                                        { name: '社會型（S）', max: 100},
                                        { name: '企業型（E）', max: 100},
                                        { name: '事務型（C）', max: 100}
                                    ]
                                },
                                series: [{
                                    name: '分析結果',
                                    type: 'radar',
                                    areaStyle: {normal: {}},
                                    data: [
                                        {
                                            value: anaValue,
                                            name: '分析結果'
                                        }
                                    ],
                                    lineStyle: {
                                        color: "rgba(50, 87, 200, 1)"
                                    },
                                    symbolSize: 10,
                                    symbol: "diamond"
                                }]
                            },
                            media: [
                                {
                                    query: {
                                        minWidth: 200,
                                        maxHeight: 300
                                    },
                                    option: {
                                        series:[{
                                            center: ['50%', '50%']
                                        }]
                                    }
                                }
                            ]
                        };
                        this.myChart[index].setOption(option);
                    }
                }
            }
        },
        showOrderPage(index){
            document.querySelectorAll('.mem_ord_area')[index].querySelector('.mem_ord_det').classList.toggle('show');
            var arrowChange = document.querySelectorAll('.mem_ord_area')[index].querySelector('.fas');
            var spanText = document.querySelectorAll('.mem_ord_area')[index].querySelector('span');
            if(spanText.textContent == "詳細資訊"){
                spanText.textContent = "關閉資訊";
                arrowChange.style.transform = "rotate(180deg)";
            }
            else{
                spanText.textContent = "詳細資訊";
                arrowChange.style.transform = "rotate(0deg)";
            }
        },
        oldDataTempSave(tempData){
            if(!this.fixMode){
                this.memberTemp.name = tempData.name;
                this.memberTemp.tel = tempData.tel;
                this.memberTemp.birthday = tempData.birthday;
                this.memberTemp.code = tempData.code;
                this.fixMode = !this.fixMode;
            }
            else if(this.newCodeEqual || (this.member.codeCheck.length == 0)){
                var formMemberData = new FormData();
                formMemberData.append('memNo', this.memberCheck.split(';')[0]);
                formMemberData.append('memName', this.member.name);
                formMemberData.append('memTel', this.member.tel);
                if(this.member.codeCheck.length == 0){
                    formMemberData.append('memCode', this.memberTemp.code);
                }
                else{
                    formMemberData.append('memCode', this.member.newCode);
                }
                axios
                .post('./php/memberUpdateData.php',formMemberData)
                .then((resp) => {
                    console.log(resp.data);
                })
                this.member.code = tempData.checkNewcode;
                this.fixMode = !this.fixMode;
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.member.codeCheck = '';
                this.memberTemp.name = '';
                this.memberTemp.tel = '';
                this.memberTemp.birthday = '';
                this.memberTemp.code = '';
                this.newCodeEqualWord = false;
                this.newCodeEqual = false;
            }
            else{
                alert("錯誤！請確認：1.欄位不可為空2.新密碼是否輸入正確")
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.member.codeCheck = '';
                this.newCodeEqualWord = false;
            }
            this.fixNewCode = false;
        },
        oldDataTempUse(tempData){
            if(!this.fixMode){
                this.member.name = tempData.name;
                this.member.tel = tempData.tel;
                this.member.birthday = tempData.birthday;
                this.member.code = tempData.code;
                this.member.codeCheck = '';
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.newCodeEqualWord = false;
                this.newCodeEqual = false;
            }
            this.fixNewCode = false;
        },
        checkCode(value){
            if(value == this.memberTemp.code){
                this.fixNewCode = true;
            }
        },
        checkNewCodeEqual(value){
            if(value == this.member.newCode){
                this.newCodeEqual = true;
            }
            else{
                this.newCodeEqual = false;
            }
        }
    },
})