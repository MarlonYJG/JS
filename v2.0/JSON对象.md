# 目录 #

> 1. JSON格式
> 2. JSON.stringify()

>           2.1 基本用法
>           2.2 第二个参数
>           2.3 第三个参数
>           2.4 toJSON方法

> 3. JSON.parse()

## JSON格式 ##

JSON 格式（JavaScript Object Notation 的缩写）是一种用于`数据交换的文本格式`，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

`JSON 对值的类型和格式有严格的规定。`

> 1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

> 2. 简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。

> 3. `字符串必须使用双引号表示，不能使用单引号。`

> 4. `对象的键名必须放在双引号里面。`

> 5. `数组或对象最后一个成员的后面，不能加逗号。`

以下是合格的 JSON 值。

```
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]

```

需要注意的是，空数组和空对象都是合格的 JSON 值，null本身也是一个合格的 JSON 值。

## JSON.stringify() ##

1. 基本用法

JSON.stringify方法用于将一个值转为字符串。该字符串符合 JSON 格式，并且可以被JSON.parse方法还原。

需要注意的是，对于原始类型的字符串，转换结果会带双引号。

```
JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
```

如果原始对象中，有一个成员的值是undefined、函数或 XML 对象，这个成员会被过滤。

```
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```

上面代码中，对象obj的a属性是undefined，而b属性是一个函数，结果都被JSON.stringify过滤。

如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。

```
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

上面代码中，数组arr的成员是undefined和函数，它们都被转成了null。

正则对象会被转成空对象。

```
JSON.stringify(/foo/) // "{}"
```

JSON.stringify方法会忽略对象的不可遍历属性。

```
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // "{"foo":1}"
```

2. 第二个参数

`JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。`

```
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

`这个类似“白名单”的数组，只对对象的属性有效，对数组无效。`

```
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"
```

`第二个参数还可以是一个函数，用来更改JSON.stringify的默认行为。`

```
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

上面代码中的f函数，接受两个参数，分别是被转换的对象的键名和键值。如果键值是数值，就将它乘以2，否则就原样返回。

`注意，这个处理函数是递归处理所有的键。`
```
var o = {a: {b: 1}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(o, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'
```

上面代码中，对象o一共会被f函数处理三次。第一次键名为空，键值是整个对象o；第二次键名为a，键值是{b: 1}；第三次键名为b，键值为1。

`递归处理中，每一次处理的对象，都是前一次返回的值。`

```
var o = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(o,f)
// "{"b": 4}"
```

`如果处理函数返回undefined或没有返回值，则该属性会被忽略。`

```
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: "abc", b: 123 }, f)
// '{"b": 123}'
```

3. 第三个参数

`JSON.stringify还可以接受第三个参数，用于增加返回的JSON字符串的可读性。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。`

```
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/

JSON.stringify({ p1:1, p2:2 }, null, '|-');
/*
"{
|-"p1": 1,
|-"p2": 2
}"
*/
```

4. toJSON方法

`如果对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性。`

```
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张","fullName":"张三"}"
```

现在，为这个对象加上toJSON方法。

```
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    var data = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    return data;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张"}"
```

上面代码中，JSON.stringify发现参数对象有toJSON方法，就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。

`Date对象就有一个自己的toJSON方法。`

```
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```

上面代码中，JSON.stringify发现处理的是Date对象实例，就会调用这个实例对象的toJSON方法，将该方法的返回值作为参数。

`toJSON方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify默认不能转换正则对象，但是设置了toJSON方法以后，就可以转换正则对象了。`

```
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

上面代码在正则对象的原型上面部署了toJSON方法，将其指向toString方法，因此遇到转换成JSON时，正则对象就先调用toJSON方法转为字符串，然后再被JSON.stingify方法处理。

## JSON.parse() ##

`JSON.parse方法用于将JSON字符串转化成对象。`

如果传入的字符串不是有效的JSON格式，JSON.parse方法将报错。

```
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合JSON格式，所以报错。

为了处理解析错误，可以将JSON.parse方法放在try...catch代码块中。

`JSON.parse方法可以接受一个处理函数，用法与JSON.stringify方法类似。`

```
function f(key, value) {
  if (key === ''){
    return value;
  }
  if (key === 'a') {
    return value + 10;
  }
}

var o = JSON.parse('{"a":1,"b":2}', f);
o.a // 11
o.b // undefined
```
