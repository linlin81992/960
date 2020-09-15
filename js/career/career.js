let carData = {
    loadData:'',
    loadDataTemp: new Array(),
    industry:[
        {typeName: "", class: "practical_bg_color", backgroundColor: "", detail: new Array()},
        {typeName: "", class: "research_bg_color", backgroundColor: "", detail: new Array()},
        {typeName: "", class: "art_bg_color", backgroundColor: "", detail: new Array()},
        {typeName: "", class: "social_bg_color", backgroundColor: "", detail: new Array()},
        {typeName: "", class: "thing_bg_color", backgroundColor: "", detail: new Array()},
        {typeName: "", class: "enterprise_bg_color", backgroundColor: "", detail: new Array()}
    ],
    industryCourse: [
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()}
    ],
    industryForum: [
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()},
        {typeName: "", detail: new Array()}
    ],
    careerPlot:{
        industryRank: new Array(5),
        industrySalary: new Array(5),
        crownSrc: "./img/career/crown.png"
    },
    sendDataTemp: [
        {typeIndex: "", name: "", industryIndex: "", proNo: ""},
        {typeIndex: "", name: "", industryIndex: "", proNo: ""}
    ],
    chooseIndustry: -1,
    myChart: '',
    sendData: false,
    showPlotControl: true,
    screenWidth: 0,
}

let careerVueContent = new Vue({
    el: '#car_vue',
    data: carData,
    mounted() {
        axios
        .post('./php/carreerLoadData.php')
        .then((resp) => {
            this.loadData = resp.data;
            this.loadData = this.loadData.split(']');
            for(var i = 0; i < this.loadData.length-1; i++){
                this.loadData[i] = this.loadData[i] + ']';
                this.loadDataTemp[i] = JSON.parse(this.loadData[i]);
            }
            var dataInsertControl = [0, 0, 0, 0, 0, 0];
            for(var i = 0; i < this.loadDataTemp[0].length; i++){
                if(this.loadDataTemp[0][i].IND_NO == 'R'){
                    this.industry[0].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[0].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[0].detail.push(new Object());
                    this.industry[0].detail[dataInsertControl[0]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[0].detail[dataInsertControl[0]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[0].detail[dataInsertControl[0]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[0].detail[dataInsertControl[0]].isCheck = false;
                    dataInsertControl[0] = dataInsertControl[0] + 1;
                }
                else if(this.loadDataTemp[0][i].IND_NO == 'I'){
                    this.industry[1].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[1].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[1].detail.push(new Object());
                    this.industry[1].detail[dataInsertControl[1]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[1].detail[dataInsertControl[1]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[1].detail[dataInsertControl[1]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[1].detail[dataInsertControl[1]].isCheck = false;
                    dataInsertControl[1] = dataInsertControl[1] + 1;
                }
                else if(this.loadDataTemp[0][i].IND_NO == 'A'){
                    this.industry[2].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[2].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[2].detail.push(new Object());
                    this.industry[2].detail[dataInsertControl[2]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[2].detail[dataInsertControl[2]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[2].detail[dataInsertControl[2]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[2].detail[dataInsertControl[2]].isCheck = false;
                    dataInsertControl[2] = dataInsertControl[2] + 1;
                }
                else if(this.loadDataTemp[0][i].IND_NO == 'S'){
                    this.industry[3].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[3].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[3].detail.push(new Object());
                    this.industry[3].detail[dataInsertControl[3]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[3].detail[dataInsertControl[3]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[3].detail[dataInsertControl[3]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[3].detail[dataInsertControl[3]].isCheck = false;
                    dataInsertControl[3] = dataInsertControl[3] + 1;
                }
                else if(this.loadDataTemp[0][i].IND_NO == 'E'){
                    this.industry[4].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[4].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[4].detail.push(new Object());
                    this.industry[4].detail[dataInsertControl[4]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[4].detail[dataInsertControl[4]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[4].detail[dataInsertControl[4]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[4].detail[dataInsertControl[4]].isCheck = false;
                    dataInsertControl[4] = dataInsertControl[4] + 1;
                }
                else if(this.loadDataTemp[0][i].IND_NO == 'C'){
                    this.industry[5].typeName = this.loadDataTemp[0][i].IND_CLASS;
                    this.industry[5].backgroundColor = this.loadDataTemp[0][i].IND_COLOR;
                    this.industry[5].detail.push(new Object());
                    this.industry[5].detail[dataInsertControl[5]].name = this.loadDataTemp[0][i].IND_INT_NAME;
                    this.industry[5].detail[dataInsertControl[5]].src = this.loadDataTemp[0][i].IND_INT_PICTURE;
                    this.industry[5].detail[dataInsertControl[5]].proNo = this.loadDataTemp[0][i].IND_INT_NO;
                    this.industry[5].detail[dataInsertControl[5]].isCheck = false;
                    dataInsertControl[5] = dataInsertControl[5] + 1;
                }
            }
            for(var i = 0; i < this.loadDataTemp[1].length; i++){
                this.careerPlot.industryRank[i] = this.loadDataTemp[1][i].職業名稱;
                this.careerPlot.industrySalary[i] = Math.round(this.loadDataTemp[1][i].薪資平均);
            }
            var dataInsertControl = [0, 0, 0, 0, 0, 0];
            for(var i = 0; i < this.loadDataTemp[2].length; i++){
                if(this.loadDataTemp[2][i].IND_NO == 'R'){
                    this.industryForum[0].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[0].detail.push(new Object());
                    this.industryForum[0].detail[dataInsertControl[0]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[0].detail[dataInsertControl[0]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[0].detail[dataInsertControl[0]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[0] = dataInsertControl[0] + 1;
                }
                else if(this.loadDataTemp[2][i].IND_NO == 'I'){
                    this.industryForum[1].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[1].detail.push(new Object());
                    this.industryForum[1].detail[dataInsertControl[1]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[1].detail[dataInsertControl[1]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[1].detail[dataInsertControl[1]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[1] = dataInsertControl[1] + 1;
                }
                else if(this.loadDataTemp[2][i].IND_NO == 'A'){
                    this.industryForum[2].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[2].detail.push(new Object());
                    this.industryForum[2].detail[dataInsertControl[2]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[2].detail[dataInsertControl[2]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[2].detail[dataInsertControl[2]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[2] = dataInsertControl[2] + 1;
                }
                else if(this.loadDataTemp[2][i].IND_NO == 'S'){
                    this.industryForum[3].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[3].detail.push(new Object());
                    this.industryForum[3].detail[dataInsertControl[3]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[3].detail[dataInsertControl[3]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[3].detail[dataInsertControl[3]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[3] = dataInsertControl[3] + 1;
                }
                else if(this.loadDataTemp[2][i].IND_NO == 'E'){
                    this.industryForum[4].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[4].detail.push(new Object());
                    this.industryForum[4].detail[dataInsertControl[4]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[4].detail[dataInsertControl[4]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[4].detail[dataInsertControl[4]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[4] = dataInsertControl[4] + 1;
                }
                else if(this.loadDataTemp[2][i].IND_NO == 'C'){
                    this.industryForum[5].typeName = this.loadDataTemp[2][i].IND_CLASS;
                    this.industryForum[5].detail.push(new Object());
                    this.industryForum[5].detail[dataInsertControl[5]].name = this.loadDataTemp[2][i].DIS_NAME;
                    this.industryForum[5].detail[dataInsertControl[5]].disClass = this.loadDataTemp[2][i].DIS_CLASS;
                    this.industryForum[5].detail[dataInsertControl[5]].disNo = this.loadDataTemp[2][i].DIS_NO;
                    dataInsertControl[5] = dataInsertControl[5] + 1;
                }
            }
            var dataInsertControl = [0, 0, 0, 0, 0, 0];
            for(var i = 0; i < this.loadDataTemp[3].length; i++){
                if(this.loadDataTemp[3][i].IND_NO == 'R'){
                    if(dataInsertControl[0] < 2){
                        this.industryCourse[0].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[0].detail.push(new Object());
                        this.industryCourse[0].detail[dataInsertControl[0]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[0].detail[dataInsertControl[0]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[0].detail[dataInsertControl[0]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[0].detail[dataInsertControl[0]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[0].detail[dataInsertControl[0]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[0].detail[dataInsertControl[0]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[0] = dataInsertControl[0] + 1;
                }
                else if(this.loadDataTemp[3][i].IND_NO == 'I'){
                    if(dataInsertControl[1] < 2){
                        this.industryCourse[1].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[1].detail.push(new Object());
                        this.industryCourse[1].detail[dataInsertControl[1]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[1].detail[dataInsertControl[1]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[1].detail[dataInsertControl[1]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[1].detail[dataInsertControl[1]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[1].detail[dataInsertControl[1]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[1].detail[dataInsertControl[1]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[1] = dataInsertControl[1] + 1;
                }
                else if(this.loadDataTemp[3][i].IND_NO == 'A'){
                    if(dataInsertControl[2] < 2){
                        this.industryCourse[2].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[2].detail.push(new Object());
                        this.industryCourse[2].detail[dataInsertControl[2]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[2].detail[dataInsertControl[2]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[2].detail[dataInsertControl[2]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[2].detail[dataInsertControl[2]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[2].detail[dataInsertControl[2]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[2].detail[dataInsertControl[2]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[2] = dataInsertControl[2] + 1;
                }
                else if(this.loadDataTemp[3][i].IND_NO == 'S'){
                    if(dataInsertControl[3] < 2){
                        this.industryCourse[3].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[3].detail.push(new Object());
                        this.industryCourse[3].detail[dataInsertControl[3]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[3].detail[dataInsertControl[3]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[3].detail[dataInsertControl[3]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[3].detail[dataInsertControl[3]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[3].detail[dataInsertControl[3]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[3].detail[dataInsertControl[3]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[3] = dataInsertControl[3] + 1;
                }
                else if(this.loadDataTemp[3][i].IND_NO == 'E'){
                    if(dataInsertControl[4] < 2){
                        this.industryCourse[4].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[4].detail.push(new Object());
                        this.industryCourse[4].detail[dataInsertControl[4]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[4].detail[dataInsertControl[4]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[4].detail[dataInsertControl[4]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[4].detail[dataInsertControl[4]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[4].detail[dataInsertControl[4]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[4].detail[dataInsertControl[4]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[4] = dataInsertControl[4] + 1;
                }
                else if(this.loadDataTemp[3][i].IND_NO == 'C'){
                    if(dataInsertControl[0] < 2){
                        this.industryCourse[5].typeName = this.loadDataTemp[3][i].IND_CLASS;
                        this.industryCourse[5].detail.push(new Object());
                        this.industryCourse[5].detail[dataInsertControl[5]].name = this.loadDataTemp[3][i].DIS_NAME;
                        this.industryCourse[5].detail[dataInsertControl[5]].time = this.loadDataTemp[3][i].SKI_TIME;
                        this.industryCourse[5].detail[dataInsertControl[5]].price = this.loadDataTemp[3][i].SKI_PRICE;
                        this.industryCourse[5].detail[dataInsertControl[5]].picture = this.loadDataTemp[3][i].SKI_IMG;
                        this.industryCourse[5].detail[dataInsertControl[5]].num = this.loadDataTemp[3][i].SKI_BUY_NUM;
                        this.industryCourse[5].detail[dataInsertControl[5]].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    dataInsertControl[5] = dataInsertControl[5] + 1;
                }
            }
            this.rankingPlot();
        })
        this.screenWidth = document.documentElement.clientWidth;
    },
    created() {
        window.addEventListener('resize', this.changeWidth);
        window.addEventListener('resize', this.rankingPlot);
    },
    destroyed() {
        window.removeEventListener('resize', this.changeWidth);
        window.removeEventListener('resize', this.rankingPlot);
    },
    methods: {
        ulMove(){
            // if(992 > this.screenWidth){
            //     console.log(123)
            // }
        },
        changeWidth(e){
            this.screenWidth = document.documentElement.clientWidth;
            this.chooseIndustry = -1;
            this.showPlotControl = true;
        },
        rankingPlot(){
            if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
                this.myChart.dispose();//銷燬
            }
            this.myChart = echarts.init(document.querySelector('.car_con_plot'), null, {renderer: 'svg'});
            // var firstRanking = this.careerPlot.industryRank[0];
            if(this.screenWidth > 991){
                var gridUse = 120
            }
            else{
                var gridUse = 80
            }
            var seriesLabel = {
                normal: {
                    show: true,
                    textBorderColor: '#333',
                    textBorderWidth: 2
                }
            }
            var option = {
                title: {
                    text: '工作三到五年薪水排行',
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['平均薪資(新台幣)'],
                    show: true,
                    top: 25,
                    right: 80
                },
                grid: {
                    left: gridUse
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    data: this.careerPlot.industryRank,
                    axisLabel: {
                        formatter: function (value) {
                            return value;
                        },
                        margin: 5,
                        rich: {
                            value: {
                                align: 'center'
                            },
                        }
                    }
                },
                series: [
                    {
                        name: '平均薪資(新台幣)',
                        type: 'bar',
                        label: seriesLabel,
                        data: this.careerPlot.industrySalary,
                        barWidth: 20,
                        itemStyle: {
                            color: "#c70000"
                        }
                    }
                ]
            };
            this.myChart.setOption(option);
        },
        changeContent(index, color){
            this.chooseIndustry = index;
            
            setTimeout(function(){
                var changeBgColor = document.querySelector('.car_con_pro');
                changeBgColor.style.backgroundColor = color;
            }, 1);
            this.showPlotControl = false;
        },
        changePlot(){
            this.chooseIndustry = -1;
            this.showPlotControl = true;
        },
        storeData(indIndex, proIndex){
            if(this.industry[indIndex].detail[proIndex].name == this.sendDataTemp[0].name){
                // this.sendDataTemp[0].typeName = "";
                this.sendDataTemp[0].typeIndex = "";
                // this.sendDataTemp[0].backgroundColor = "";
                this.sendDataTemp[0].industryIndex = "";
                this.sendDataTemp[0].name = "";
                this.sendDataTemp[0].proNo = "";
                this.industry[indIndex].detail[proIndex].isCheck = false;
            }
            else if(this.industry[indIndex].detail[proIndex].name == this.sendDataTemp[1].name){
                // this.sendDataTemp[1].typeName = "";
                this.sendDataTemp[1].typeIndex = "";
                // this.sendDataTemp[1].backgroundColor = "";
                this.sendDataTemp[1].industryIndex = "";
                this.sendDataTemp[1].name = "";
                this.sendDataTemp[1].proNo = "";
                this.industry[indIndex].detail[proIndex].isCheck = false;
            }else{
                if(this.sendDataTemp[0].industryIndex.length == 0){
                    // this.sendDataTemp[0].typeName = this.industry[indIndex].typeName;
                    this.sendDataTemp[0].typeIndex = proIndex;
                    // this.sendDataTemp[0].backgroundColor = this.industry[indIndex].backgroundColor;
                    this.sendDataTemp[0].industryIndex = indIndex;
                    this.sendDataTemp[0].name = this.industry[indIndex].detail[proIndex].name;
                    this.sendDataTemp[0].proNo = this.industry[indIndex].detail[proIndex].proNo;
                    this.industry[indIndex].detail[proIndex].isCheck = true;
                }
                else if(this.sendDataTemp[1].industryIndex.length == 0){
                    // this.sendDataTemp[1].typeName = this.industry[indIndex].typeName;
                    this.sendDataTemp[1].typeIndex = proIndex;
                    // this.sendDataTemp[1].backgroundColor = this.industry[indIndex].backgroundColor;
                    this.sendDataTemp[1].industryIndex = indIndex;
                    this.sendDataTemp[1].name = this.industry[indIndex].detail[proIndex].name;
                    this.sendDataTemp[1].proNo = this.industry[indIndex].detail[proIndex].proNo;
                    this.industry[indIndex].detail[proIndex].isCheck = true;
                }
                else{
                    alert("以選擇兩個職業");
                }
            }
            if((this.sendDataTemp[0].name.length > 0) || (this.sendDataTemp[1].name.length > 0)){
                this.sendData = true;
            }
            else{
                this.sendData = false;
            }
        },
        removeData(index){
            var indIndex = this.sendDataTemp[index].industryIndex;
            var proIndex = this.sendDataTemp[index].typeIndex;
            // this.sendDataTemp[index].typeName = "";
            this.sendDataTemp[index].typeIndex = "";
            // this.sendDataTemp[index].backgroundColor = "";
            this.sendDataTemp[index].industryIndex = "";
            this.sendDataTemp[index].name = "";
            this.sendDataTemp[index].proNo = "";
            this.industry[indIndex].detail[proIndex].isCheck = false;
            if((this.sendDataTemp[0].name.length > 0) || (this.sendDataTemp[1].name.length > 0)){
                this.sendData = true;
            }
            else{
                this.sendData = false;
            }
        },
        viewPro(){
            localStorage.removeItem('proNo_1');
            localStorage.removeItem('proNo_2');
            localStorage.proNo_1 = this.sendDataTemp[0].proNo;
            localStorage.proNo_2 = this.sendDataTemp[1].proNo;
            window.location.href = "./career_profession.html";
        }
    },
})