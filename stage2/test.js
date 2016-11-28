function useSlice(num) {
    var a=num.slice(0,3);
    return a;
};
 

document.getElementsByTagName("button")[0].onclick=function () {
    var stringing="zhoujie";
    console.log(useSlice(stringing));
}