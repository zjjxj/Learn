(function () {
    var $ = function (el) {
        return document.querySelector(el)
    };

    (function createMap() {
        for (var i = 0; i < 10; i++) {
            $("#map").innerHTML += "<div class='grad'><span></span><span></span><span>" +
                "</span><span></span><span></span><span></span>" +
                "<span></span><span></span><span></span><span></span></div>"
        }
    })();

    function getDir() {
        var num = Math.ceil(Math.random() * 4);
        return num;
    };

    function getRowCol() {
        var num = Math.ceil(Math.random() * 10);
        return num - 1;
    };
    var initDir = getDir();
    var initRow = getRowCol();
    var initCol = getRowCol();


    //根据行列数和方向生成棋子，dir表示方向 1，2，3，4依次表示上右下左
    function showChess(rows, cols, dir) {  //51
        var elem = $("#chess");
         switch (dir) {
            case 1:
                elem.style.top = rows*51+"px";
                elem.style.left = cols*52+"px";
                break;
            case 2:
                elem.style.top = rows*51+"px";
                elem.style.left = cols*52+"px";
                elem.style.transform="rotate(90deg)";
                initDeg=90;
                break;
            case 3:
                elem.style.top = rows*51+"px";
                elem.style.left = cols*52+"px";
                elem.style.transform="rotate(180deg)";
                initDeg=180;
                break;
            case 4:
                elem.style.top = rows*51+"px";
                elem.style.left = cols*52+"px";
                elem.style.transform="rotate(270deg)";
                initDeg=270;
                break;
        }
    };

    //根据行列数和颜色建墙
    function buildingWall(row,col,color) {
        if(row<10&&row>=0&&col<10&&col>=0){
            var elem = $("#map").getElementsByClassName("grad")[row].getElementsByTagName("span")[col];
            elem.style.backgroundColor = color;
        }

    }

    //控制器
    var initDeg=0 ; //旋转角度
    var control = {
        getElem: function (row,col) {
            if(row<10&&row>=0&&col<10&&col>=0){
                return $("#map").getElementsByClassName("grad")[row].getElementsByTagName("span")[col];

            }
            return false;
        },
        clearElem: function () {
            var elem = this.getElem(initRow,initCol);
            elem.style.backgroundColor = "";
            elem.style.height = "50px";
            elem.style.width = "50px"
            elem.style.border = "";

        },
        getDeg: function (dir, newDir) {  //每次的旋转角度
            var x = newDir - dir;
            if(x>0) return 90*x;
            else return 360+90*x;

        },
        rorate: function (newDir) {   //旋转
            initDeg=initDeg+this.getDeg(initDir, newDir);
            $("#chess").style.transform = "rotate(" +initDeg + "deg)";
            initDir=(initDeg/90)%4+1;
        },
        TraLef: function (steps) {
            while(steps>0){
                if (initCol > 0&&this.getElem(initRow, initCol-1).style.backgroundColor!=="darkgrey") {
                    initCol -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    return;
                }
            }
        },
        TraRig: function (steps) {
            while(steps>0){
                if (initCol < 9&&this.getElem(initRow, initCol+1).style.backgroundColor!=="darkgrey") {
                    console.log(this.getElem(initRow, initCol).style.backgroundColor);
                    initCol += 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    return;
                }
            }
        },
        TraTop: function (steps) {
            while(steps>0){
                if (initRow > 0&&this.getElem(initRow-1, initCol).style.backgroundColor!=="darkgrey") {
                    console.log(this.getElem(initRow, initCol).style.backgroundColor);

                    initRow -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    return;
                }
            }
        },
        TraBot: function (steps) {
            while(steps>0){
                if (initRow < 9&&this.getElem(initRow+1, initCol).style.backgroundColor!=="darkgrey") {
                    console.log(this.getElem(initRow, initCol).style.backgroundColor);

                    initRow += 1;
                    showChess(initRow, initCol, initDir);
                    steps--
                }else{
                    return;
                }
            }
        },
        MovLef: function (steps) {
            if (initCol > 0) {
                this.TraLef(steps);
                this.rorate(4);
            }
        },
        MovRig: function (steps) {
            if (initCol < 9) {
                this.TraRig(steps);
                this.rorate(2);
            }
        },
        MovTop: function (steps) {
            if (initRow > 0) {
                this.TraTop(steps);
                this.rorate(1);
            }
        },
        MovBot: function (steps) {
            if (initRow < 9) {
                this.TraBot(steps);
                this.rorate(3);
            }
        },
        buildWall:function () {
            switch (initDir){
                case 1:
                    if(initRow-1>=0&&(this.getElem(initRow-1,initCol).style.backgroundColor!=="darkgrey")){
                        buildingWall(initRow-1,initCol,"darkgrey");
                    }else {
                        console.log("error");
                    }
                    break;
                case 2:
                    if(initCol+1<=9&&(this.getElem(initRow,initCol+1).style.backgroundColor!=="darkgrey")){
                        buildingWall(initRow,initCol+1,"darkgrey");
                    }else{
                        console.log("error")
                    }
                    break;
                case 3:
                    if(initRow+1<=9&&(this.getElem(initRow+1,initCol).style.backgroundColor!=="darkgrey")){
                        buildingWall(initRow+1,initCol,"darkgrey");
                    }else{
                        console.log("error");
                    }
                    break;
                case 4:
                    if(initCol-1>=0&&(this.getElem(initRow,initCol-1).style.backgroundColor!=="darkgrey")){
                        buildingWall(initRow,initCol-1,"darkgrey");
                    }else{
                        console.log("error");
                    }
                    break;
            }
        },
        changeColor:function (color) {
            switch (initDir){
                case 1:
                    var elem=this.getElem(initRow-1,initCol);
                    if(elem&&elem.style.backgroundColor=="darkgrey"){
                        elem.style.backgroundColor=color;
                    }else {
                        console.log("error");
                    }
                    break;
                case 2:
                    var elem=this.getElem(initRow,initCol+1);
                    if(elem&&elem.style.backgroundColor=="darkgrey"){
                        elem.style.backgroundColor=color;
                    }else {
                        console.log("error");
                    }
                    break;
                case 3:
                    var elem=this.getElem(initRow+1,initCol);
                    if(elem&&elem.style.backgroundColor=="darkgrey"){
                        elem.style.backgroundColor=color;
                    }else {
                        console.log("error");
                    }
                    break;
                case 4:
                    var elem=this.getElem(initRow,initCol-1);
                    if(elem&&elem.style.backgroundColor=="darkgrey"){
                        elem.style.backgroundColor=color;
                    }else {
                        console.log("error");
                    }
                    break;
            }
        },
        moveTo:function (x,y) {
            // console.log(initRow,initCol)
            traverseMap(x,y);
            console.log(movCommand);
        }

    };

    var movCommand=[[initRow,initCol]];

    function verifySite(a,b) {
        if( control.getElem(a,b)
            &&control.getElem(a,b).style.backgroundColor!=="darkgrey"
            &&movCommand.indexOf([a,b])==-1){
            return true;
        }
        return false;
    }

    var x1=initRow;
    var y1=initCol;
    function traverseMap(x,y) {    //参数为目标坐标，零开始
        if(control.getElem(x,y)!==control.getElem(x1,y1)){
            if(verifySite(x1-1,y1)){
                x1--;
                movCommand.push([x1,y1]);
                traverseMap(x,y);
            }else if(verifySite(x1,y1+1)){
                y1++;
                movCommand.push([x1,y1]);
                traverseMap(x,y);
            }else if(verifySite(x1+1,y1)){
                x1++;
                movCommand.push([x1,y1]);
                traverseMap(x,y);
            }else if(verifySite(x1,y1-1)){
                y1--;
                movCommand.push([x1,y1]);
                traverseMap(x,y);
            }
        }
    }
    //执行指令
   var doCommand= function(commands) {
        var step=commands.slice(7,commands.length);
        var colorWall=commands.slice(4);
        switch (commands.slice(0,7)) {
            case "mov lef":
                control.MovLef(step);
                break;
            case "mov rig":
                control.MovRig(step);
                break;
            case "mov bot":
                control.MovBot(step);
                break;
            case "mov top":
                control.MovTop(step);
                break;
            case "tra lef":
                control.TraLef(step);
                break;
            case "tra rig":
                control.TraRig(step);
                break;
            case "tra bot":
                control.TraBot(step);
                break;
            case "tra top":
                control.TraTop(step);
                break;
            case "build":
                control.buildWall();
                break;
            case "mov to ":
                var site=step.split(",");
                control.moveTo(parseInt(site[0]-1),parseInt(site[1])-1);
        }
        if(commands.slice(0,3)==="bru"){
            control.changeColor(colorWall);
        }
    };

    //点击执行按钮
    $("button").onclick = function () {
        setTimeout(function () {
            doCommand(inputValue.shift());
            if(inputValue.length>0){
                setTimeout(arguments.callee,1100);
            }
        },100);
        return false;
    };

    $("#button2").onclick=function () {
        var wallNum=15;
        while(wallNum!==0){
            var row=Math.ceil((Math.random()*10))-1;
            var col=Math.ceil((Math.random()*10))-1;
            if(row!==initRow||col!==initCol){
                buildingWall(row,col,"darkgrey");
            }
            wallNum--;
        }
        return false;

    };

    var inputValue=[];  //保存输入的指令
    var controlArr=["mov lef","mov top","mov bot","mov rig","tra top"
        ,"tra bot","tra rig","tra lef","build","bru","mov to "];//合法指令数组

    function verify(){
        if(inputValue.length>0){
            inputValue.map(function (data,index) {
                var steps=data.slice(7,data.length);
                var spanElem=$("#wrap").children[index];
                if((steps&&steps<1)||(steps&&steps>9)||controlArr.indexOf(data.slice(0,7))===-1){
                    spanElem.style.backgroundColor="red";
                    spanElem.style.borderRadius="12px";
                    if(!(controlArr.indexOf(data.slice(0,3))===-1)){
                        spanElem.style.backgroundColor="";
                        spanElem.style.borderRadius="";
                    }
                }else {
                    spanElem.style.backgroundColor="";
                    spanElem.style.borderRadius="";
                }
            })
        }
    }

    function upDateInputValue(){
        inputValue=$("textarea").value.replace(/\n/g,"|").split("|");
        inputValue=inputValue.slice(0,inputValue.length-1);

    }
    function upDateRemindRows() {
        var initSpan=document.createElement("span");
        initSpan.innerHTML=1;
        $("#wrap").appendChild(initSpan);
        inputValue.map(function (data,index) {
            var newSpan=document.createElement("span");
            newSpan.innerHTML=index+2;
            $("#wrap").appendChild(newSpan);
        })
    }
    //按回车键进行输入验证
    document.onkeyup=function (e) {
        if(e.keyCode===13){
            $("#wrap").innerHTML="";
            upDateInputValue();
            upDateRemindRows();
            verify();
        }else if(e.keyCode==8){
            $("#wrap").innerHTML="";
            inputValue=$("textarea").value.replace(/\n/g,"|").split("|");
            inputValue.map(function (data,index) {
                var newSpan=document.createElement("span");
                newSpan.innerHTML=index+1;
                $("#wrap").appendChild(newSpan);
            });
            verify();
        }else if(e.keyCode===37){
            control.MovLef(1);
        }else if(e.keyCode===38){
            control.MovTop(1);
        }else if(e.keyCode===39){
            control.MovRig(1);
        }else if(e.keyCode===40){
            control.MovBot(1);
        }
    };

    //滑动事件，提示行号同步滑动
    $("textarea").onscroll=function () {
        $("#wrap").style.marginTop=-this.scrollTop+"px";
    };

    //初始化棋子
    showChess(initRow, initCol, initDir);
})();

