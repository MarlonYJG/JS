
## console 对象的方法 ##

1. 如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。

```
console.log(' %s + %s = %s', 1, 1, 2)
//  1 + 1 = 2
```

`console.log方法支持以下占位符，不同格式的数据必须使用对应格式的占位符。`

```
%s 字符串
%d 整数
%i 整数
%f 浮点数
%o 对象的链接
%c CSS格式字符串
```

console.info()和console.debug()都是console.log方法的别名，用法完全一样。只不过console.info方法会在输出信息的前面，加上一个蓝色图标。

2. console.warn()，console.error()

warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错，同时会显示`错误发生的堆栈`。其他方面都一样。

可以这样理解，log方法是写入标准输出（stdout），warn方法和error方法是写入标准错误（stderr）。

3. console.table()

`对于某些复合类型的数据，console.table方法可以将其转为表格显示。`

`复合型数据转为表格显示的条件是，必须拥有主键。对于数组来说，主键就是数字键。对于对象来说，主键就是它的最外层键。`

4. `console.count()`

`count方法用于计数，输出它被调用了多少次。`

```
function greet(user) {
  console.count();
  return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')
//  : 3
// "hi bob"
```

上面代码每次调用greet函数，内部的console.count方法就输出执行次数。


`该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。`

```
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet('bob')
// bob: 1
// "hi bob"

greet('alice')
// alice: 1
// "hi alice"

greet('bob')
// bob: 2
// "hi bob"
```

上面代码根据参数的不同，显示bob执行了两次，alice执行了一次。

5. console.dir()，console.dirxml()

`dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。`

```
console.log({f1: 'foo', f2: 'bar'})
// Object {f1: "foo", f2: "bar"}

console.dir({f1: 'foo', f2: 'bar'})
// Object
//   f1: "foo"
//   f2: "bar"
//   __proto__: Object
```

`该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。`

```
console.dir(document.body)
```

Node 环境之中，还可以指定以代码高亮的形式输出。

```
console.dir(obj, {colors: true})
```
`dirxml方法主要用于以目录树的形式，显示 DOM 节点。`

```
console.dirxml(document.body)
```

`如果参数不是 DOM 节点，而是普通的 JavaScript 对象，console.dirxml等同于console.dir。`

```
console.dirxml([1, 2, 3])
// 等同于
console.dir([1, 2, 3])
```

6. console.assert()

`assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。`

它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}
```


下面是另一个例子，判断子节点的个数是否大于等于500。

```
console.assert(list.childNodes.length < 500, '节点个数大于等于500')
```

上面代码中，如果符合条件的节点小于500个，不会有任何输出；只有大于等于500时，才会在控制台提示错误，并且显示指定文本。

7. `console.time()，console.timeEnd()`

`这两个方法用于计时，可以算出一个操作所花费的准确时间。`

```
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
```

`time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，console窗口会显示“计时器名称: 所耗费的时间”。`

8. console.profile()，console.profileEnd()

console.profile方法用来新建一个性能测试器（profile），它的参数是性能测试器的名字。

```
console.profile('p')
// Profile 'p' started.
```

console.profileEnd方法用来结束正在运行的性能测试器。

```
console.profileEnd()
// Profile 'p' finished.
```

打开浏览器的开发者工具，在profile面板中，可以看到这个性能调试器的运行结果。

9. console.group()，console.groupend()，console.groupCollapsed()

console.group和console.groupend这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

10. `console.trace()，console.clear()`

`console.trace方法显示当前执行的代码在堆栈中的调用路径。`

```
console.trace()
// console.trace()
//   (anonymous function)
//   InjectedScript._evaluateOn
//   InjectedScript._evaluateAndWrap
//   InjectedScript.evaluate
```

console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，网页脚本调用console.log将不起作用，但手动在控制台执行该方法依然有效。

## 命令行 API ##

`getEventListeners(object)`

getEventListeners(object)方法返回一个对象，该对象的成员为登记了回调函数的各种事件（比如click或keydown），每个事件对应一个数组，数组的成员为该事件的回调函数。

`monitorEvents(object[, events]) ，unmonitorEvents(object[, events])`

monitorEvents(object[, events])方法监听特定对象上发生的特定事件。当这种情况发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。

```
monitorEvents(window, "resize");
monitorEvents(window, ["resize", "scroll"])
```

上面代码分别表示单个事件和多个事件的监听方法。

```
monitorEvents($0, 'mouse');
unmonitorEvents($0, 'mousemove');
```

上面代码表示如何停止监听。


`monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。`

> 1. mouse：”mousedown”, “mouseup”, “click”, “dblclick”, “mousemove”, “mouseover”, “mouseout”, “mousewheel”
> 2. key：”keydown”, “keyup”, “keypress”, “textInput”
> 3. touch：”touchstart”, “touchmove”, “touchend”, “touchcancel”
> 4. control：”resize”, “scroll”, “zoom”, “focus”, “blur”, “select”, “change”, “submit”, “reset”


```
monitorEvents($("#msg"), "key");
```

上面代码表示监听所有key大类的事件。

`profile([name])，profileEnd()`

profile方法用于启动一个特定名称的CPU性能测试，profileEnd方法用于结束该性能测试

```
profile('My profile')
profileEnd('My profile')
```

## debugger语句 ##

`debugger语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。如果没有除错工具，debugger语句不会产生任何结果，JavaScript引擎自动跳过这一句。`

在Chrome浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开控制台界面。

```
for(var i = 0; i < 5; i++){
  console.log(i);
  if (i === 2) debugger;
}
```

上面代码打印出0，1，2以后，就会暂停，自动打开控制台，等待进一步处理。
