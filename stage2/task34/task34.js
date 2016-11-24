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
        TraLef: function () {
            if (initCol > 0) {
                this.clearElem();
                initCol -= 1;
                showChess(initRow, initCol, initDir);
            }
        },
        TraRig: function () {
            if (initCol < 9) {
                this.clearElem();
                initCol += 1;
                showChess(initRow, initCol, initDir);
            }
        },
        TraTop: function () {
            if (initRow > 0) {
                this.clearElem();
                initRow -= 1;
                showChess(initRow, initCol, initDir);
            }
        },
        TraBot: function () {
            if (initRow < 9) {
                this.clearElem();
                initRow += 1;
                showChess(initRow, initCol, initDir);
            }
        },
        MovLef: function () {
            if (initCol > 0) {
                this.TraLef();
                this.rorate(initRow, initCol, 4);
            }
        },
        MovRig: function () {
            if (initCol < 9) {
                this.TraRig();
                this.rorate(initRow, initCol, 2);
            }
        },
        MovTop: function () {
            if (initRow > 0) {
                this.TraTop();
                this.rorate(initRow, initCol, 1);
            }
        },
        MovBot: function () {
            if (initRow < 9) {
                this.TraBot();
                this.rorate(initRow, initCol, 3);
            }
        }
    };

    //点击事件
    $("button").onclick = function () {
        var input = $("input").value.toLowerCase().trim();
        switch (input) {
            case "mov left":
            case "mov lef":
                control.MovLef();
                break;
            case "mov right":
            case "mov rig":
                control.MovRig();
                break;
            case "mov bot":
            case "mov bottom":
                control.MovBot();
                break;
            case "mov top":
                control.MovTop();
                break;
            case "tra left":
            case "tra lef":
                control.TraLef();
                break;
            case "tra right":
            case "tra rig":
                control.TraRig();
                break;
            case "tra bot":
            case "tra bottom":
                control.TraBot();
                break;
            case "tra top":
                control.TraTop();
                break;
        }
        return false;
    };

    showChess(initRow, initCol, initDir);
})();

