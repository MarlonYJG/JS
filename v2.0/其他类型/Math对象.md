属性
方法
Math.random()
三角函数方法

Math是JavaScript的内置对象，提供一系列数学常数和数学方法。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。

**属性**

Math对象提供以下一些只读的数学常数。

Math.E：常数e。
Math.LN2：2的自然对数。
Math.LN10：10的自然对数。
Math.LOG2E：以2为底的e的对数。
Math.LOG10E：以10为底的e的对数。
Math.PI：常数Pi。
Math.SQRT1_2：0.5的平方根。
Math.SQRT2：2的平方根。

```
Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951
```

**方法**

Math对象提供以下一些数学方法。

Math.abs()：绝对值
Math.ceil()：向上取整
Math.floor()：向下取整
Math.max()：最大值
Math.min()：最小值
Math.pow()：指数运算
Math.sqrt()：平方根
Math.log()：自然对数
Math.exp()：e的指数
Math.round()：四舍五入
Math.random()：随机数

Math.abs方法返回参数值的绝对值。

Math.max方法和Math.min方法都可以接受多个参数，Math.max返回其中最大的参数，Math.min返回最小的参数。有趣的是, Math.min 不传参数返回 Infinity, Math.max 不传参数返回 -Infinity。

Math.floor方法接受一个参数，返回小于该参数的最大整数。

Math.ceil方法接受一个参数，返回大于该参数的最小整数。

Math.round方法用于四舍五入。

Math.pow方法返回以第一个参数为底数、第二个参数为幂的指数值。

Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN。

Math.log方法返回以e为底的自然对数值。

Math.exp方法返回常数e的参数次方。

`Math.random()`

Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。

任意范围的随机数生成函数如下。

```
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5)
// 2.4942810038223864
```

任意范围的随机整数生成函数如下。

```
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

**三角函数方法**

Math对象还提供一系列三角函数方法。

Math.sin()：返回参数的正弦
Math.cos()：返回参数的余弦
Math.tan()：返回参数的正切
Math.asin()：返回参数的反正弦（弧度值）
Math.acos()：返回参数的反余弦（弧度值）
Math.atan()：返回参数的反正切（弧度值）

```
Math.sin(0) // 0
Math.cos(0) // 1
Math.tan(0) // 0
Math.asin(1) // 1.5707963267948966
Math.acos(1) // 0
Math.atan(1) // 0.7853981633974483
```
