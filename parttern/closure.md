## 闭包
变量的搜索是从内到外而非从外到内的。
```js
let nodes = document.getElementsByTagName( 'div' );
for ( let i = 0, len = nodes.length; i < len; i++ ){ 
  nodes[ i ].onclick = function(){
    alert ( i );  // 5
  }
}
```
解决方法是在闭包的帮助下，把每次循环的 i 值都封闭起来。
当在事件函数中顺着作用域链 中从内到外查找变量 i 时，会先找到被封闭在闭包环境中的 i，如果有 5 个 div，
这里的 i 就分别 是 0,1,2,3,4
```js
for ( let i = 0, len = nodes.length; i < len; i++ ){ 
  (function( i ){
    nodes[ i ].onclick = function(){ console.log(i);} 
  })( i )
}
```

```js
const Type = {}
const type = ['String', 'Array', 'Number']
for (let i = 0; i < type.length; i++) {
  (function(j){
    Type['is' + type[j]] = function(obj) {
      console.log(Object.prototype.toString.call(obj))
      return Object.prototype.toString.call(obj) === '[object '+ type[j] +']'
    }
  })(i)
}
console.log(Type.isString('123')) // true
console.log(Type.isArray([])) // true
console.log(Type.isNumber(12)) // true
console.log(Type.isNumber('12')) // false

```

### 作用
* 封装私有变量