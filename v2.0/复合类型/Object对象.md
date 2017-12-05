概述
Object()
Object 对象的静态方法

    Object.keys()   Object.getOwnPropertyNames()
    其他方法

Object对象的实例方法

    Object.prototype.valueOf()
    Object.prototype.toString()
    toString()的应用：判断数据类型

**概述**

`JavaScript 原生提供Object对象（注意起首的O是大写），所有其他对象都继承自这个对象。Object本身也是一个构造函数，可以直接通过它来生成新对象。`

```
var obj = new Object();

注意，通过new Object()的写法生成新对象，与字面量的写法o = {}是等价的。
```

`Object作为构造函数使用时，可以接受一个参数。如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象。`

```
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

new Object(123) instanceof Number
// true
```

与其他构造函数一样，如果要在Object对象上面部署一个方法，有两种做法。

（1）部署在Object对象本身

比如，在Object对象上面定义一个print方法，显示其他对象的内容。
```
Object.print = function(o){ console.log(o) };

var o = new Object();

Object.print(o)
// Object
```

（2）部署在Object.prototype对象

所有构造函数都有一个prototype属性，指向一个原型对象。凡是定义在Object.prototype对象上面的属性和方法，将被所有实例对象共享。（关于prototype属性的详细解释，参见《面向对象编程》一章。）

```
Object.prototype.print = function(){ console.log(this)};

var o = new Object();

o.print() // Object
```

可以看到，尽管上面两种写法的print方法功能相同，但是用法是不一样的，因此必须区分“构造函数的方法”和“实例对象的方法”。

**Object**

Object本身当作工具方法使用时，可以将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数是原始类型的值，Object方法返回对应的包装对象的实例（参见《原始类型的包装对象》一节）。

```
Object() // 返回一个空对象
Object() instanceof Object // true

Object(undefined) // 返回一个空对象
Object(undefined) instanceof Object // true

Object(null) // 返回一个空对象
Object(null) instanceof Object // true

Object(1) // 等同于 new Number(1)
Object(1) instanceof Object // true
Object(1) instanceof Number // true

Object('foo') // 等同于 new String('foo')
Object('foo') instanceof Object // true
Object('foo') instanceof String // true

Object(true) // 等同于 new Boolean(true)
Object(true) instanceof Object // true
Object(true) instanceof Boolean // true
```
`如果Object方法的参数是一个对象，它总是返回原对象。`

**Object 对象的静态方法**

所谓“静态方法”，是指部署在Object对象自身的方法。

`Object.keys()，Object.getOwnPropertyNames()`

Object.keys方法和Object.getOwnPropertyNames方法很相似，一般用来遍历对象的属性。它们的参数都是一个对象，都返回一个数组，该数组的成员都是对象自身的（而不是继承的）所有属性名。它们的区别在于，Object.keys方法只返回可枚举的属性（关于可枚举性的详细解释见后文），Object.getOwnPropertyNames方法还返回不可枚举的属性名。

```
var a = ["Hello", "World"];

Object.keys(a)
// ["0", "1"]

Object.getOwnPropertyNames(a)
// ["0", "1", "length"]
```

**其他方法**

（1）对象属性模型的相关方法

Object.getOwnPropertyDescriptor()：获取某个属性的attributes对象。
Object.defineProperty()：通过attributes对象，定义某个属性。
Object.defineProperties()：通过attributes对象，定义多个属性。
Object.getOwnPropertyNames()：返回直接定义在某个对象上面的全部属性的名称。

（2）控制对象状态的方法

Object.preventExtensions()：防止对象扩展。
Object.isExtensible()：判断对象是否可扩展。
Object.seal()：禁止对象配置。
Object.isSealed()：判断一个对象是否可配置。
Object.freeze()：冻结一个对象。
Object.isFrozen()：判断一个对象是否被冻结。

（3）原型链相关方法

Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
Object.getPrototypeOf()：获取对象的Prototype对象。

**Object对象的实例方法**

除了Object对象本身的方法，还有不少方法是部署在Object.prototype对象上的，所有Object的实例对象都继承了这些方法。

Object实例对象的方法，主要有以下六个。

valueOf()：返回当前对象对应的值。
toString()：返回当前对象对应的字符串形式。
toLocaleString()：返回当前对象对应的本地字符串形式。
hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
isPrototypeOf()：判断当前对象是否为另一个对象的原型。
propertyIsEnumerable()：判断某个属性是否可枚举。


`Object.prototype.valueOf()`

valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

valueOf方法的主要用途是，JavaScript自动类型转换时会默认调用这个方法（详见《数据类型转换》一节）。

`Object.prototype.toString()`

toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

`数组、字符串、函数、Date对象都分别部署了自己版本的toString方法，覆盖了Object.prototype.toString方法。`

```
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

`toString()的应用：判断数据类型`

Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型。

```
var o = {};
o.toString() // "[object Object]"
```

上面代码调用空对象的toString方法，结果返回一个字符串object Object，其中第二个Object表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法。通过函数的call方法，可以在任意值上调用Object.prototype.toString方法，帮助我们判断这个值的类型。

```
Object.prototype.toString.call(value)
```

不同数据类型的Object.prototype.toString方法返回值如下。

数值：返回[object Number]。
字符串：返回[object String]。
布尔值：返回[object Boolean]。
undefined：返回[object Undefined]。
null：返回[object Null]。
数组：返回[object Array]。
arguments对象：返回[object Arguments]。
函数：返回[object Function]。
Error对象：返回[object Error]。
Date对象：返回[object Date]。
RegExp对象：返回[object RegExp]。
其他对象：返回[object Object]。

也就是说，Object.prototype.toString可以得到一个实例对象的构造函数。

```
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```
