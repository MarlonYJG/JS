构造函数
Array.isArray()
Array实例的方法

    valueOf() toString()
    push()
    pop()
    join()
    concat()
    shift()
    unfhift()
    reverse()
    slice()
    splice()
    sort()
    map()
    forEach()
    filter()
    some()  every()
    reduce()    reduceRight()
    indexof()   lastIndexof()
    链式使用

**构造函数**

Array是JavaScript的内置对象，同时也是一个构造函数，可以用它生成新的数组。

```
var arr = new Array(2);
// 等同于
var arr = Array(2);
```

`Array构造函数有一个很大的问题，就是不同的参数，会导致它的行为不一致。`

```
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ undefined ]
new Array(2) // [ undefined x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非正整数参数（比如字符串、布尔值、对象等），
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```
`从上面代码可以看到，Array作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。`

**Array.isArray()**

Array.isArray方法用来判断一个值是否为数组。它可以弥补typeof运算符的不足。

```
var a = [1, 2, 3];

typeof a // "object"
Array.isArray(a) // true
```

**Array实例的方法**

`valueOf()，toString()`

valueOf方法返回数组本身。

toString方法返回数组的字符串形式。

```
var a = [1, 2, 3];
a.valueOf() // [1, 2, 3]

var a = [1, 2, 3, [4, 5, 6]];
a.toString() // "1,2,3,4,5,6"
```

`push()`

push方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

push方法还可以用于向对象添加元素，添加后的对象变成类似数组的对象，即新加入元素的键对应数组的索引，并且对象有一个length属性。

```
var a = [1, 2, 3];
var b = [4, 5, 6];

Array.prototype.push.apply(a, b)
// 或者
a.push.apply(a, b)

// 上面两种写法等同于
a.push(4, 5, 6)

a // [1, 2, 3, 4, 5, 6]
------------------
var a = {a: 1};

[].push.call(a, 2);
a // {a:1, 0:2, length: 1}

[].push.call(a, [3]);
a // {a:1, 0:2, 1:[3], length: 2}
```

`pop()`

pop方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。

push和pop结合使用，就构成了“后进先出”的栈结构（stack）。

`join()`

join方法以参数作为分隔符，将所有数组成员组成一个字符串返回。如果不提供参数，默认用逗号分隔。

通过call方法，这个方法也可以用于字符串。

join方法也可以用于类似数组的对象。

```
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

-----------
var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

`concat()`

concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

如果不提供参数，concat方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是如果数组成员包括复合类型的值（比如对象），则新数组拷贝的是该值的引用。

```
var obj = { a:1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a // 2
```

上面代码中，原数组包含一个对象，concat方法生成的新数组包含这个对象的引用。所以，改变原对象以后，新数组跟着改变。事实上，只要原数组的成员中包含对象，concat方法不管有没有参数，总是返回该对象的引用。

concat方法也可以用于将对象合并为数组。

```
[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[].concat({a: 1}, [2])
// [{a: 1}, 2]

[2].concat({a: 1})
// [2, {a: 1}]
```

`shift()`

shift方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

push和shift结合使用，就构成了“先进先出”的队列结构（queue）。

`unshift()`

unshift方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

`reverse()`

reverse方法用于颠倒数组中元素的顺序，返回改变后的数组。注意，该方法将改变原数组。

`slice()`

slice方法用于提取原数组的一部分，返回一个新数组，原数组不变。

它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

```
// 格式
arr.slice(start_index, upto_index);
```

如果slice方法的参数是负数，则表示倒数计算的位置。

如果参数值大于数组成员的个数，或者第二个参数小于第一个参数，则返回空数组。

slice方法的一个重要应用，是将类似数组的对象转为真正的数组。

```
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

`splice()`

splice方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。

splice的第一个参数是删除的起始位置，第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```
// 格式
arr.splice(index, count_to_remove, addElement1, addElement2, ...);
```

起始位置如果是负数，就表示从倒数位置开始删除。

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

`sort()`

sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。(unidicode)

```
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort()
// [10111, 1101, 111]
```

如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数，表示按照自定义方法进行排序。该函数本身又接受两个参数，表示进行比较的两个元素。如果返回值大于0，表示第一个元素排在第二个元素后面；其他情况下，都是第一个元素排在第二个元素前面。

```
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

`map()`

map方法对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。

```
var numbers = [1, 2, 3];

numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

numbers
// [1, 2, 3]
```

map方法接受一个函数作为参数。该函数调用时，map方法会将其传入三个参数，分别是当前成员、当前位置和数组本身。

```
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```

map方法不仅可以用于数组，还可以用于字符串，用来遍历字符串的每个字符。但是，不能直接使用，而要通过函数的call方法间接使用，或者先将字符串转为数组，然后使用。

```
var upper = function (x) {
  return x.toUpperCase();
};

[].map.call('abc', upper)
// [ 'A', 'B', 'C' ]

// 或者
'abc'.split('').map(upper)
// [ 'A', 'B', 'C' ]
```

map方法还可以接受第二个参数，表示回调函数执行时this所指向的对象。

如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位。

`forEach()`

forEach方法与map方法很相似，也是遍历数组的所有成员，执行某种操作，但是forEach方法一般不返回值，只用来操作数据。如果需要有返回值，一般使用map方法。

forEach方法的参数与map方法一致，也是一个函数，数组的所有成员会依次执行该函数。它接受三个参数，分别是当前位置的值、当前位置的编号和整个数组。

```
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

forEach方法也可以接受第二个参数，用来绑定回调函数的this关键字。

```
var out = [];

[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);

out // [1, 4, 9]
```

注意，forEach方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用for循环。

forEach方法也可以用于类似数组的对象和字符串。

`filter()`

filter方法的参数是一个函数，所有数组成员依次执行该函数，返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。

```
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]
```

filter方法的参数函数可以接受三个参数，第一个参数是当前数组成员的值，这是必需的，后两个参数是可选的，分别是当前数组成员的位置和整个数组。

filter方法还可以接受第二个参数，指定测试函数所在的上下文对象（即this对象）。

`some()，every()`

这两个方法类似“断言”（assert），用来判断数组成员是否符合某种条件。

它们接受一个函数作为参数，所有数组成员依次执行该函数，返回一个布尔值。该函数接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。

some方法是只要有一个数组成员的返回值是true，则整个some方法的返回值就是true，否则false。

```
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

every方法则是所有数组成员的返回值都是true，才返回true，否则false。

```
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

注意，对于空数组，some方法返回false，every方法返回true，回调函数都不会执行。

some和every方法还可以接受第二个参数，用来绑定函数中的this关键字。

`reduce()，reduceRight()`

reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。

它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样。

这两个方法的第一个参数都是一个函数。该函数接受以下四个参数。

1.累积变量，默认为数组的第一个成员
2.当前变量，默认为数组的第二个成员
3.当前位置（从0开始）
4.原数组

这四个参数之中，只有前两个是必须的，后两个则是可选的。

下面的例子求数组成员之和。

```
[1, 2, 3, 4, 5].reduce(function(x, y){
  console.log(x, y)
  return x + y;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

上面代码中，第一轮执行，x是数组的第一个成员，y是数组的第二个成员。从第二轮开始，x为上一轮的返回值，y为当前数组成员，直到遍历完所有成员，返回最后一轮计算后的x。

利用reduce方法，可以写一个数组求和的sum方法。

```
Array.prototype.sum = function (){
  return this.reduce(function (partial, value) {
    return partial + value;
  })
};

[3, 4, 5, 6, 10].sum()
// 28
```

如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数。

```
[1, 2, 3, 4, 5].reduce(function(x, y){
  return x + y;
}, 10);
// 25
```

`indexOf()，lastIndexOf()`

indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

indexOf方法还可以接受第二个参数，表示搜索的开始位置。

注意：in运算符针对的是键名

lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

```
['a', 'b', 'c'].indexOf('a', 1) // -1
```
注意，如果数组中包含NaN，这两个方法不适用，即无法确定数组成员是否包含NaN。

`链式使用`

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。
