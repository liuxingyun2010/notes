/*
* @名称：工厂模式
* @优点：解决了创建多个相似对象的问题
* @缺点：没有解决对象识别问题
*/

function createPerson(name, age, job){
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function(){
    return this.name
  }
  return o
}

let person1 = createPerson('小明', 20, '学生')
let person2 = createPerson('Alex', 35, '程序员')

alert(typeof person1) // object
alert(typeof person2) // object
alert(Object.prototype.toString.call(person1) === '[object Object]') // true



/*
* @名称：构造函数模式
* @优点：可以解决对象的识别问题，可以将它的实例标识为一种特定的类型
* @缺点：每个实例都会创建一个方法，无法公用
*/


function Person(name, age, job){
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function(){
    alert(this.name)
  }
}

let person1 = new Person('小明', 20, '学生')
let person2 = new Person('Alex', 35, '程序员')

alert(person1 instanceof Object) // true
alert(person1 instanceof Person) // true
alert(person2 instanceof Object) // true
alert(person2 instanceof Person) // true
alert(Object.prototype.toString.call(person1) === '[object Object]') // true
alert(Object.prototype.toString.call(person2) === '[object Object]') // true

alert(person1.constructor === Person) // true
alert(person2.constructor === Person) // true

alert(person1.constructor === Object) // false
alert(person1.constructor === Object) // false

/* 如果直接调用构造函数，不使用new的方式，则会当做普通对象 */
Person('张三', 34, '销售') // Person内部的this指向了window，记住一点：谁调用，this就指向谁
console.log(window.name) // 张三

/* 通过call, aplly, bind可以改变this指向 */
let o = new Object()
/* console.log(o.sayName()) //报错 */
Person.call(o, 'Allen', 38, '打酱油')
o.sayName()


