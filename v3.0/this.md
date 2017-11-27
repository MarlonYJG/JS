
1. `this总是返回一个对象，简单说，就是返回属性或方法“当前”所在的对象。`

由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的。

总结一下，JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是这个对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。

可以近似地认为，this是所有函数运行时的一个隐藏参数，指向函数的运行环境。

2. 使用场合

（1）全局环境

在全局环境使用this，它指的就是顶层对象window。

（2）构造函数

构造函数中的this，指的是实例对象。

（3）对象的方法

当 A 对象的方法被赋予 B 对象，该方法中的this就从指向 A 对象变成了指向 B 对象。所以要特别小心，将某个对象的方法赋值给另一个对象，会改变this的指向。

如果某个方法位于多层对象的内部，这时this只是指向当前一层的对象，而不会继承更上面的层。

3. 使用注意点

（1）避免多层 this

由于this的指向是不确定的，所以切勿在函数中包含多层的this。

`事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，有大量应用，请务必掌握。`

```
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
```

JavaScript 提供了严格模式，也可以硬性避免这种问题。在严格模式下，如果函数内部的this指向顶层对象，就会报错。

（2）避免数组处理方法中的this

数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。

解决方法
```
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()
// hello a1
// hello a2
```

（3）避免回调函数中的this


4. 绑定 this 的方法

`this的动态切换，固然为JavaScript创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把this固定下来，避免出现意想不到的情况。JavaScript提供了call、apply、bind这三个方法，来切换/固定this的指向。`

`function.prototype.call()`

`函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。`

call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。

```
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。

```
var f = function () {
  return this;
};

f.call(5)
// Number {[[PrimitiveValue]]: 5}
```

`call方法还可以接受多个参数。`

```
func.call(thisValue, arg1, arg2, ...)
```

call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。

```
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3
```

call方法的一个应用是调用对象的原生方法。

```
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

`function.prototype.apply()`

`apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。`

```
func.apply(thisValue, [arg1, arg2, ...])
```

apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加。

（1）找出数组最大元素

JavaScript不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素。

```
var a = [10, 2, 4, 15, 9];

Math.max.apply(null, a)
// 15
```

（2）将数组的空元素变为undefined

通过apply方法，利用Array构造函数将数组的空元素变成undefined。

```
Array.apply(null, ["a",,"b"])
// [ 'a', undefined, 'b' ]
```

（3）转换类似数组的对象

另外，利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。

```
Array.prototype.slice.apply({0:1,length:1})
// [1]

Array.prototype.slice.apply({0:1})
// []

Array.prototype.slice.apply({0:1,length:2})
// [1, undefined]

Array.prototype.slice.apply({length:1})
// [undefined]
```

上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。

（4）绑定回调函数的对象

```
var o = new Object();

o.f = function () {
  console.log(this === o);
}

var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};

$('#button').on('click', f);
```

`function.prototype.bind()`

`bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。`

bind比call方法和apply方法更进一步的是，除了绑定this以外，还可以绑定原函数的参数。

```
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);

newAdd(5)
// 20
```

上面代码中，bind方法除了绑定this对象，还将add函数的第一个参数x绑定成5，然后返回一个新函数newAdd，这个函数只要再接受一个参数y就能运行了。

如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（在浏览器中为window）。

```
function add(x, y) {
  return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10) // 15
```

`bind方法有一些使用注意点。`

（1）每一次返回一个新函数

bind方法每运行一次，就返回一个新函数，这会产生一些问题。

（2）结合回调函数使用

回调函数是JavaScript最常用的模式之一，但是一个常见的错误是，将包含this的方法直接当作回调函数。

（3）结合call方法使用
