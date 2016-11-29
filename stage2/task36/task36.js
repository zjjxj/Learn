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
    // window.onload=createMap;

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
    var initDeg=0 ; //旋转角度

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
                initDeg=270
                break;
        }
    };

    //根据行列数和颜色建墙
    function buildingWall(row,col,color) {
        var elem = $("#map").getElementsByClassName("grad")[row].getElementsByTagName("span")[col];
        elem.style.backgroundColor = color;
    }

    //控制器
    var control = {
        getElem: function (row,col) {
            return $("#map").getElementsByClassName("grad")[row].getElementsByTagName("span")[col];
        },
        clearElem: function () {
            var elem = this.getElem(initRow,initCol);
            elem.style.backgroundColor = "";
            elem.style.height = "50px";
            elem.style.width = "50px"
            elem.style.border = "";

        },
        getDeg: function (dir, newDir) {  //获得旋转角度
            var x = newDir - dir+initDeg/90;
            return 90 * x;
        },
        resetInitDir: function (dir, deg) {   //重置初始方向，参数为初始方向和旋转角度
            deg = Math.abs(deg);
            if (dir === 1) {
                if (deg === 90) {
                    initDir = 2
                } else if (deg === 180) {
                    initDir = 3
                } else if (deg === 270) {
                    initDir = 4
                }
            } else if (dir === 2) {
                if (deg === 90) {
                    initDir = 3
                } else if (deg === 180) {
                    initDir = 4
                } else if (deg === 270) {
                    initDir = 1
                }
            } else if (dir === 3) {
                if (deg === 90) {
                    initDir = 4
                } else if (deg === 180) {
                    initDir = 1
                } else if (deg === 270) {
                    initDir = 2
                }
            } else if (dir === 4) {
                if (deg === 90) {
                    initDir = 1;
                } else if (deg === 180) {
                    initDir = 2;
                } else if (deg === 270) {
                    initDir = 3;
                }
            }
        },
        rorate: function (newDir) {   //旋转
            var elem = $("#chess");
            console.log(initDeg);
            initDeg=this.getDeg(initDir, newDir);
            elem.style.transform = "rotate(" +initDeg  + "deg)";

            // this.resetInitDir(initDir, this.getDeg(initDir, newDir));
            // console.log(initDir);
            console.log(initDeg);
            initDir=(initDir+initDeg/90);
            // console.log(initDir)
        },
        TraLef: function (steps) {
            while(steps>0){
                if (initCol > 0) {
                    initCol -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }
            }
        },
        TraRig: function (steps) {
            while(steps>0){
                if (initCol < 9) {
                    initCol += 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }
            }
        },
        TraTop: function (steps) {
            while(steps>0){
                if (initRow > 0) {
                    initRow -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }
            }
        },
        TraBot: function (steps) {
            while(steps>0){
                if (initRow < 9) {
                    initRow += 1;
                    showChess(initRow, initCol, initDir);
                    steps--
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
        }
    };

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
                setTimeout(arguments.callee,1300);
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
    var remindRow=2;    //同步行数
    var controlArr=["mov lef","mov top","mov bot","mov rig","tra top"
        ,"tra bot","tra rig","tra lef","build","bru"];//合法指令数组


    function verify(value){
        inputValue=value.replace(/\n/g,",").split(",");
        inputValue=inputValue.slice(0,inputValue.length-1);
        if(inputValue.length>0){
            inputValue.map(function (data,index) {
                var steps=data.slice(7,data.length);
                var controls=data.slice(0,7);
                var wallColor=data.slice(0,3);
                var spanElem=$("#wrap").children[index];
                if((steps&&steps<1)||(steps&&steps>9)||controlArr.indexOf(controls)===-1){
                    spanElem.style.backgroundColor="red";
                    spanElem.style.borderRadius="12px";
                    if(!(controlArr.indexOf(wallColor)===-1)){
                        spanElem.style.backgroundColor="";
                        spanElem.style.borderRadius="";
                    }
                }else {
                    spanElem.style.backgroundColor="";
                    spanElem.style.borderRadius="";
                }
            })
        }
    };

    //按回车键进行输入验证
    $("textarea").onkeyup=function (e) {
        if(e.keyCode===13){
            var newSpan=document.createElement("span");
            newSpan.innerHTML=remindRow;
            $("#wrap").appendChild(newSpan);
            verify(this.value);
            remindRow++;
        }
    };

    //滑动事件，提示行号同步滑动
    $("textarea").onscroll=function () {
        $("#wrap").style.marginTop=-this.scrollTop+"px";
    };

    //初始化棋子
    showChess(initRow, initCol, initDir);
})();

