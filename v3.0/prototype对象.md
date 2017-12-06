JavaScript 语言的对象继承 以“原型对象”（prototype）为基础

构造函数的缺点

JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。`同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。`

prototype 属性的作用(针对的是构造函数)

`JavaScript 的每个对象都继承另一个对象，后者称为“原型”（prototype）对象。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。null也可以充当原型，区别在于它没有自己的原型对象。`

JavaScript 继承机制的设计就是，原型的所有属性和方法，都能被子对象共享。

`每一个构造函数都有一个prototype属性，这个属性会在生成实例的时候，成为实例对象的原型对象。`

```
function Animal(name) {
  this.name = name;
}

Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```
`原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。`

```
Animal.prototype.color = 'yellow';

cat1.color // "yellow"
cat2.color // "yellow"
```

上面代码中，原型对象的color属性的值变为yellow，两个实例对象的color属性立刻跟着变了。这是因为实例对象其实没有color属性，都是读取原型对象的color属性。也就是说，当实例对象本身没有某个属性或方法的时候，它会到构造函数的prototype属性指向的对象，去寻找该属性或方法。这就是原型对象的特殊之处。

`如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。`

`总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。`


`构造函数就是普通的函数， 所以实际上所有函数都有prototype属性。`


原型链

`对象的属性和方法，有可能定义在自身，也有可能定义在它的原型对象。由于原型本身也是对象，又有自己的原型，所以形成了一条原型链（prototype chain）。`

如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。那么，Object.prototype对象有没有它的原型呢？回答是有的，就是没有任何属性和方法的null对象，而null对象没有自己的原型。

`“原型链”的作用是，读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。`

`如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。`

需要注意的是，一级级向上，在原型链寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

instanceof运算符用来比较一个对象是否为某个构造函数的实例

`constructor 属性`

`prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。`

```
function P() {}

P.prototype.constructor === P
// true
```

由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。(也就是说constructor属性是原型对象上指定它自身构造函数的属性)

constructor属性的作用，是分辨原型对象到底属于哪个构造函数。

`construction属性指向的是构造函数，他自身是在原型对象上存储的`

```
function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
```

constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。

```
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype.copy = function () {
  return new this.constructor(this.name);
};
```

修改原型对象时，一般要同时校正constructor属性的指向。


`instanceof 运算符`

`instanceof运算符返回一个布尔值，表示某个对象是否为指定的构造函数的实例。`

```
var v = new Vehicle();
v instanceof Vehicle // true
```

_instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。_

`instanceof的原理是检查原型链，对于那些不存在原型链的对象，就无法判断。`

`JavaScript 之中，只要是对象，就有对应的构造函数。因此，instanceof运算符的一个用处，是判断值的类型。`

```
var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true
```

`注意，instanceof运算符只能用于对象，不适用原始类型的值。`

此外，对于undefined和null，instanceOf运算符总是返回false。

`Object.getPrototypeOf()`

`Object.getPrototypeOf方法返回一个对象的原型。这是获取原型对象的标准方法。`

`Object.setPrototypeOf()`

`Object.setPrototypeOf方法可以为现有对象设置原型，返回一个新对象。`

`Object.setPrototypeOf方法接受两个参数，第一个是现有对象，第二个是原型对象。`

new命令通过构造函数新建实例对象，实质就是将实例对象的原型，指向构造函数的prototype属性，然后在实例对象上执行构造函数。

```
var F = function () {
  this.foo = 'bar';
};

var f = new F();

// 等同于
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
```

`Object.create()`

`生成实例对象的常用方法，就是使用new命令，让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构造函数生成的，那么能不能从一个实例对象，生成另一个实例对象呢？`

`JavaScript 提供了Object.create方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承继承原型对象的属性。`

```
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);
B.print() // hello
B.print === A.print // true
```

下面三种方式生成的新对象是等价的。

```
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
```

如果想要生成一个不继承任何属性（比如没有toString和valueOf方法）的对象，可以将Object.create的参数设为null。

`使用Object.create方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。`

object.create方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。

```
var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
obj2.p
// 2
```

`除了对象的原型，Object.create方法还可以接受第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。`

```
var obj = Object.create({}, {
  p1: {
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
```

Object.create方法生成的对象，继承了它的原型对象的构造函数。

```
function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A // true
b instanceof A // true
```

`Object.prototype.isPrototypeOf()`

`对象实例的isPrototypeOf方法，用来判断一个对象是否是另一个对象的原型。`

```
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3) // true
o1.isPrototypeOf(o3) // true
```

上面代码表明，只要某个对象处在原型链上，isPrototypeOf都返回true。

7. Object.prototype.__proto__(针对的是实例对象指向的原型对象)

`__proto__属性（前后各两个下划线）可以改写某个对象的原型对象。`

```
var obj = {};
var p = {};

obj.__proto__ = p;
Object.getPrototypeOf(obj) === p // true
```

上面代码通过__proto__属性，将p对象设为obj对象的原型。

`根据语言标准，__proto__属性只有浏览器才需要部署，其他环境可以没有这个属性，而且前后的两根下划线，表示它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用Object.getPrototypeof()（读取）和Object.setPrototypeOf()（设置），进行原型对象的读写操作。`

8. 获取原型对象方法的比较

`如前所述，__proto__属性指向当前对象的原型对象，即构造函数的prototype属性。`

```
var obj = new Object();

obj.__proto__ === Object.prototype
// true
obj.__proto__ === obj.constructor.prototype
// true
```

因此，获取实例对象obj的原型对象，有三种方法。

> 1. obj.__proto__
> 2. obj.constructor.prototype
> 3. Object.getPrototypeOf(obj)

上面三种方法之中，前两种都不是很可靠。最新的ES6标准规定，__proto__属性只有浏览器才需要部署，其他环境可以不部署。而obj.constructor.prototype在手动改变原型对象时，可能会失效。

```
var P = function () {};
var p = new P();

var C = function () {};
C.prototype = p;
var c = new C();

c.constructor.prototype === p // false
```

上面代码中，C构造函数的原型对象被改成了p，结果c.constructor.prototype就失真了。所以，在改变原型对象时，一般要同时设置constructor属性。

所以，推荐使用第三种Object.getPrototypeOf方法，获取原型对象。

```
var o = new Object();
Object.getPrototypeOf(o) === Object.prototype
// true
```

