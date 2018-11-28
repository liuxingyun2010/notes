## this、call和apply
除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种。
* 作为对象的方法调用。
```js
let obj = {
  name: 'xm',
  getName: function() {
    console.log(this === obj) // true
    console.log(this.name) // xm
  }
}

obj.getName()
```
* 作为普通函数调用。
```js
window.name = 'tingting'
let obj = {
  name: 'xingyun',
  getName: function() {
    return this.name
  }
}

console.log(obj.getName()) // xingyun

let getName = obj.getName()
console.log(getName) // tingting
```
* 构造器调用。
```js
let MyPeople = function() {
  this.name = 'caodagou'
}

let p1 = new MyPeople()
console.log(p1.name) // caodagou

let MyPeople2 = function() {
  this.name = 'caodagou'
  return { // 显示返回一个对象时，this永远指向这个对象
    name: 'caodagouzi'
  }
}

let p2 = new MyPeople2()
console.log(p2.name) // caodagouzi

let MyPeople3 = function() {
  this.name = 'caodagouzia'
  return 'caoxiaoting'
}

let p3 = new MyPeople3()
console.log(p3.name) // caodagouzia
```
* Function.prototype.call 或 Function.prototype.apply 调用。
```js
let obj1 = {
  name: 'obj1',
  getName: function() {
    return this.name
  }
}
let obj2 = {
  name: 'obj2'
}

console.log(obj1.getName()) // obj1
console.log(obj1.getName.call(obj2)) //obj2
```
call和apply，改变this的指向，区别仅在于传入的参数不同。bind改变this指向，返回一个新的函数
用途：
* 改变this指向

apply接受两个参数，第一个表示函数体内this的指向，
第二个是参数数组。

call是分别传入多个参数。

```js
let func = function(a, b, c) {
  alert([a, b, c])
}

func.apply(null, [4, 5, 6]) // [4, 5, 6]
func.call(null, 4, 5, 6) // [4, 5, 6]

// 第一个参数传入null，表示this指向默认的宿主对象，浏览器中即为window; 严格模式下仍为null
let func2 = function(a, b) {
  if (this === window) {
    alert('window')
    return
  }
  alert([a, b])
}
func2.apply(null, [1, 2]) // window

func2.apply(func, [3, 4]) // [3, 4]

let func3 = function(a, b) {
  'use strict'
  if (window === this) {
    alert('window')
    return 
  }
  alert([a, b])
}

func3.call(null, 6, 7) // [6, 7]
func3.apply(null, [88, 99]) // [88, 99]


```
 模拟实现bind：在 Function.prototype.bind 的内部实现中，我们先把 func 函数的引用保存起来，然后返回一 个新的函数
 ```js
Function.prototype.bind = function(context) {
  let self = this 
  return function() {
    return self.apply(context, arguments)
  }
}
let obj1 = {
  name: '123'
}
let func = function() {
  alert(this.name)
}.bind(obj1)

func() // 123
```
