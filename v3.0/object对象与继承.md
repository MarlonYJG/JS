通过原型链，对象的属性分成两种：自身的属性和继承的属性。JavaScript 语言在Object对象上面，提供了很多相关方法，来处理这两种不同的属性。

1. Object.getOwnPropertyNames()

Object.getOwnPropertyNames方法返回一个数组，成员是对象本身的所有属性的键名，不包含继承的属性键名。

`对象本身的属性之中，有的是可以枚举的（enumerable），有的是不可以枚举的，Object.getOwnPropertyNames方法返回所有键名。`

`只获取那些可以枚举的属性，使用Object.keys方法。`

2. Object.prototype.hasOwnProperty()

`对象实例的hasOwnProperty方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。`

`hasOwnProperty方法是JavaScript之中唯一一个处理对象属性时，不会遍历原型链的方法。`

3. in 运算符和 for…in 循环

`in运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。`

`in运算符常用于检查一个属性是否存在。`

`获得对象的所有可枚举属性（不管是自身的还是继承的），可以使用for...in循环。`

4. 对象的拷贝

如果要拷贝一个对象，需要做到下面两件事情。

> 1. 确保拷贝后的对象，与原对象具有同样的prototype原型对象。
> 2. 确保拷贝后的对象，与原对象具有同样的属性。

