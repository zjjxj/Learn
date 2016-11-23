(function () {
    var $=function (el) {
        return document.querySelector(el)
    };

    (function createMap() {
        for(var i=0;i<10;i++){
            $("#map").innerHTML+="<div><span></span><span></span><span>" +
                "</span><span></span><span></span><span></span>" +
                "<span></span><span></span><span></span><span></span></div>"
        }
    })();

    function getDir(){
        var num=Math.ceil(Math.random()*4)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ;
        return num;
    };

    function getRowCol() {
        var num=Math.ceil(Math.random()*10)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ;
        return num-1;
    };

    var initDir=getDir();
    var initRow=getRowCol();
    var initCol=getRowCol();

    //生成棋子，dir表示方向 1，2，3，4依次表示上右下左
    function showChess(rows,cols,dir) {
        var elem=$("#map").getElementsByTagName("div")[rows].getElementsByTagName("span")[cols];
        elem.style.backgroundColor="red";
        switch (dir){
            case 1:
                elem.style.borderTop="10px solid blue";
                elem.style.height="40px";
                break;
            case 2:
                elem.style.borderRight="10px solid blue";
                elem.style.width="41px";
                break;
            case 3:
                elem.style.borderBottom="10px solid blue";
                elem.style.height="41px";
                break;
            case 4:
                elem.style.borderLeft="10px solid blue";
                elem.style.width="40px";
                break;
        }
    };

    //控制操作
    var control={
        getElem:function () {
          return  $("#map").getElementsByTagName("div")[initRow].getElementsByTagName("span")[initCol];
        },
        clearChess:function (rows,cols,dir) {
            var elem=this.getElem();
            elem.style.backgroundColor="";
            switch (dir){
                case 1:
                    elem.style.borderTop="";
                    elem.style.height="50px";
                    break;
                case 2:
                    elem.style.borderRight="1px solid gainsboro";
                    elem.style.width="50px";
                    break;
                case 3:
                    elem.style.borderBottom="1px solid gainsboro";
                    elem.style.height="50px";
                    elem.style.width="50px";
                    break;
                case 4:
                    elem.style.borderLeft="";
                    elem.style.width="50px";
                    break;
            }
        },
        go:function (row,col,dir) {
            switch (dir){
                case 1:
                    if(row>0){
                        this.clearChess(initRow,initCol,initDir);
                        initRow=row-1;
                        showChess(row-1,col,1);
                    }
                    break;
                case 2:
                    if(col<9){
                        this.clearChess(initRow,initCol,initDir);
                        initCol=col+1;
                        showChess(row,col+1,2);
                    }
                    break;
                case 3:

                    if(row<9){
                        this.clearChess(initRow,initCol,initDir);
                        initRow=row+1;
                        showChess(row+1,col,3);
                    }
                    break;
                case 4:
                    if(col>0){
                        this.clearChess(initRow,initCol,initDir);
                        initCol=col-1;
                        showChess(row,col-1,4);
                    }
                    break;
            }
        },
        turnRight:function () {
            this.clearChess(initRow,initCol,initDir);
            if(initDir===4){
                showChess(initRow,initCol,1);
                initDir=1;
            }else{
                showChess(initRow,initCol,initDir+1);
                initDir+=1;
            }

        },
        turnLeft:function () {
            this.clearChess(initRow,initCol,initDir);
            if(initDir===1){
                showChess(initRow,initCol,4);
                initDir=4;
            }else{
                showChess(initRow,initCol,initDir-1);
                initDir-=1;
            }
        }
    };

    //点击事件
    $("button").onclick=function () {
        var input=$("input").value.toLowerCase().trim();
        switch (input){
            case "turn left":
            case "tur lef":
                control.turnLeft();
                break;
            case "turn right":
            case "tur rig":
                control.turnRight();
                break;
            case "go":
                control.go(initRow,initCol,initDir);
                break;
        }
        return false;
    };

    showChess(initRow,initCol,initDir);
})();

