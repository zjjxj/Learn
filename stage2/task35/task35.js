(function () {
    var $ = function (el) {
        return document.querySelector(el)
    };

    (function createMap() {
        for (var i = 0; i < 10; i++) {
            $("#map").innerHTML += "<div><span></span><span></span><span>" +
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

    //生成棋子，dir表示方向 1，2，3，4依次表示上右下左
    function showChess(rows, cols, dir) {
        var elem = $("#map").getElementsByTagName("div")[rows].getElementsByTagName("span")[cols];
        elem.style.backgroundColor = "red";
        switch (dir) {
            case 1:
                elem.style.borderTop = "10px solid blue";
                elem.style.height = "41px";
                break;
            case 2:
                elem.style.borderRight = "10px solid blue";
                elem.style.width = "41px";
                break;
            case 3:
                elem.style.borderBottom = "10px solid blue";
                elem.style.height = "41px";
                break;
            case 4:
                elem.style.borderLeft = "10px solid blue";
                elem.style.width = "41px";
                break;
        }
    };
    var flag=1;
    //控制操作
    var control = {
        getElem: function () {
            return $("#map").getElementsByTagName("div")[initRow].getElementsByTagName("span")[initCol];
        },
        clearElem: function () {
            var elem = this.getElem();
            elem.style.backgroundColor = "";
            elem.style.height = "50px";
            elem.style.width = "50px"
            elem.style.border = "";

        },
        getDeg: function (initDeg, newDeg) {  //获得旋转角度
            var x = newDeg - initDeg;
            return 90 * x;
        },
        resitInitDir: function (dir, deg) {   //重置初始方向，参数为初始方向和旋转角度
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
        rorate: function (rows, cols, newDir) {   //旋转
            var elem = this.getElem();
            elem.style.transform = "rotate(" + this.getDeg(initDir, newDir) + "deg)";
            console.log(initDir)
            console.log(this.getDeg(initDir, newDir));
            this.resitInitDir(initDir, this.getDeg(initDir, newDir));
        },
        TraLef: function (steps) {
            flag=1;
            while(steps>0){
                if (initCol > 0) {
                    this.clearElem();
                    initCol -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    flag=0;
                    return;
                }

            }

        },
        TraRig: function (steps) {
            flag=1;
            while(steps>0){
                if (initCol < 9) {
                    this.clearElem();
                    initCol += 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    flag=0;
                    return;
                }
            }

        },
        TraTop: function (steps) {
            flag=1;
            while(steps>0){
                if (initRow > 0) {
                    this.clearElem();
                    initRow -= 1;
                    showChess(initRow, initCol, initDir);
                    steps--;
                }else{
                    flag=0;
                    return;
                }
            }
        },
        TraBot: function (steps) {
            flag=1;
            while(steps>0){
                if (initRow < 9) {
                    this.clearElem();
                    initRow += 1;
                    showChess(initRow, initCol, initDir);
                    steps--
                }else{
                    flag=0;
                    return;
                }
            }

        },
        MovLef: function (steps) {
            if (initCol > 0) {
                this.TraLef(steps);
                this.rorate(initRow, initCol, 4);
            }
        },
        MovRig: function (steps) {
            if (initCol < 9) {
                this.TraRig(steps);
                this.rorate(initRow, initCol, 2);
            }
        },
        MovTop: function (steps) {
            if (initRow > 0) {
                this.TraTop(steps);
                this.rorate(initRow, initCol, 1);
            }
        },
        MovBot: function (steps) {
            if (initRow < 9) {
                this.TraBot(steps);
                this.rorate(initRow, initCol, 3);
            }
        }
    };

    //点击事件
    $("button").onclick = function () {
        inputValue.map(function (input) {
            var step=input.slice(7,input.length);
            switch (input.slice(0,7)) {
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
            }
        })

        return false;
    };

    //
    var inputValue=[];  //保存输入的指令
    var remindRow=2;    //同步行数
    var controlArr=["mov lef","mov top","mov bot","mov rig","tra top","tra bot","tra rig","tra lef"];//合法指令
    $("textarea").onkeyup=function (e) {
        if(e.keyCode===13){
            var newSpan=document.createElement("span");
            newSpan.innerHTML=remindRow;
            $("#wrap").appendChild(newSpan);

            inputValue=this.value.replace(/\n/g,",").split(",");
            inputValue=inputValue.slice(0,inputValue.length-1);
            if(inputValue.length>0){
                inputValue.map(function (data,index) {
                    var steps=data.slice(7,data.length);
                    var controls=data.slice(0,7);
                    var spanElem=$("#wrap").children[index];
                    if(steps<1||steps>9||controlArr.indexOf(controls)==-1){
                        spanElem.style.backgroundColor="red";
                        spanElem.style.borderRadius="12px";
                    }else{
                        spanElem.style.backgroundColor="";
                        spanElem.style.borderRadius="";
                    }
                })
            }
            remindRow++;
        }
    };

    $("textarea").onscroll=function () {
        $("#wrap").style.marginTop=-this.scrollTop+"px";
    };
    showChess(initRow, initCol, initDir);

})();

