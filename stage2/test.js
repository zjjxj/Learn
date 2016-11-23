function student(name,age) {
    this.name=name;
    this.age=age
};
student.prototype={
    add:function () {
        this.age=this.age+5;
    }
}

var s1=new student("ll",12);
var s2=new student("aa",10);
s1.add();
s2.add();
console.log(s1.age);
console.log(s2.age);