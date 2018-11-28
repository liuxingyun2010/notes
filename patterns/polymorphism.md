## 多态
多态的思想：做什么和谁去做以及怎样去做分开来

```js
    let makeSound = function(animal) {
      animal && animal.sound && animal.sound()
    }

    let Duck = function(){}
    Duck.prototype.sound = function() {
      console.log('鸭叫')
    }

    let Chicken = function(){}
    Chicken.prototype.sound = function() {
      console.log('鸡叫')
    }

    makeSound(new Duck())
    makeSound(new Chicken())
```
