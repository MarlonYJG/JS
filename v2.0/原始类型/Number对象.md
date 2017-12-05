概述
Number对象的属性
Number对象实例的方法

    Number.prototype.toString()
    Number.prototoye.toFixed()
    Number.prototype.toExponential()
    Number.prototype.toPrecision()

自定义方法

**概述**

Number对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

作为构造函数时，它用于生成值为数值的对象。

作为工具函数时，它可以将任何类型的值转为数值。

**Number对象的属性**

Number对象拥有以下一些属性。

Number.POSITIVE_INFINITY：正的无限，指向Infinity。
Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
Number.NaN：表示非数值，指向NaN。
Number.MAX_VALUE：表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。
Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。

```
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991
```

**Number 对象实例的方法**

Number对象有4个实例方法，都跟将数值转换成指定格式有关。

`Number.prototype.toString()`

Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。

toString方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。

```
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

将其他进制的数，转回十进制，需要使用parseInt方法。

`Number.prototype.toFixed()`

toFixed方法用于将一个数转为指定位数的小数，返回这个小数对应的字符串。

```
(10).toFixed(2) // "10.00"
10.005.toFixed(2) // "10.01"
```

toFixed方法的参数为指定的小数位数，有效范围为0到20，超出这个范围将抛出RangeError错误。

`Number.prototype.toExponential()`

toExponential方法用于将一个数转为科学计数法形式。

```
(10).toExponential()  // "1e+1"
(10).toExponential(1) // "1.0e+1"
(10).toExponential(2) // "1.00e+1"

(1234).toExponential()  // "1.234e+3"
(1234).toExponential(1) // "1.2e+3"
(1234).toExponential(2) // "1.23e+3"
```
toExponential方法的参数表示小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个RangeError。

`Number.prototype.toPrecision()`

toPrecision方法用于将一个数转为指定位数的有效数字。
```
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

toPrecision方法的参数为有效数字的位数，范围是1到21，超出这个范围会抛出RangeError错误。

toPrecision方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。

**自定义方法**

与其他对象一样，Number.prototype对象上面可以自定义方法，被Number的实例继承。

```
Number.prototype.add = function (x) {
  return this + x;
};
```

需要注意的是，数值的自定义方法，只能定义在它的原型对象Number.prototype上面，数值本身是无法自定义属性的。
