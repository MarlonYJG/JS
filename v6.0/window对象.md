概述

window对象的属性

    window.window   window.name
    window.location
    window.closed   window.opener
    window.frames   window.length
    window.screenX  window.screenY
    window.innerHeight  window.innerWidth
    window.outerHeight  window.outerWidth
    window.pageXOffset  window.pageYOffset

navigator对象

    navigator.userAgent
    navigator.plugins
    navigator.platform
    navigator.onLine
    navigator.geolocation
    navigator.javaEnabled() navigator.cookieEnabled

window.screen对象

window对象的方法

    window.moveTo() window.moveBy()
    window.scrollTo()   window.scrollBy()
    window.open()   window.close()
    window.print()
    window.getComputedStyle()
    window.matchMedia()
    window.focus()
    window.getSelection()

多窗口操作

    窗口的引用
    iframe标签
    frames属性

事件

    load事件和onload属性
    error事件和onerror属性

URL的编码/解码方法

    encodeURI
    encodeURIComponent
    decodeURI
    decodeURIComponent

alert() prompt()    confirm()


概述

在浏览器中，window对象（注意，w为小写）指当前的浏览器窗口。它也是所有对象的顶层对象。

“顶层对象”指的是最高一层的对象，所有其他对象都是它的下属。JavaScript规定，浏览器环境的所有全局变量，都是window对象的属性。

```
var a = 1;
window.a // 1
```

上面代码中，变量a是一个全局变量，但是实质上它是window对象的属性。声明一个全局变量，就是为window对象的同名属性赋值。

从语言设计的角度看，所有变量都是window对象的属性，其实不是很合理。因为window对象有自己的实体含义，不适合当作最高一层的顶层对象。这个设计失误与JavaScript语言匆忙的设计过程有关，最早的设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者Brendan Eich就把window对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。

**window对象的属性**

`window.window，window.name`

```
window.window === this // true
```

window.name属性用于设置当前浏览器窗口的名字。

各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。

该属性只能保存字符串，且当浏览器窗口关闭后，所保存的值就会消失。因此局限性比较大，但是与<`iframe`>窗口通信时，非常有用。

`window.location`

window.location返回一个location对象，用于获取窗口当前的URL信息。它等同于document.location对象，详细介绍见《document对象》一节。

```
window.location === document.location // true
```

`window.closed，window.opener`

window.closed属性返回一个布尔值，表示窗口是否关闭。

```
window.closed // false
```

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。

```
var popup = window.open();

if ((popup !== null) && !popup.closed) {
  // 窗口仍然打开着
}
```

window.opener属性返回打开当前窗口的父窗口。如果当前窗口没有父窗口，则返回null。

```
window.open().opener === window // true
```

上面表达式会打开一个新窗口，然后返回true。

通过opener属性，可以获得父窗口的的全局变量和方法，比如window.opener.propertyName和window.opener.functionName()。但这只限于两个窗口属于同源的情况（参见《同源政策》一节），且其中一个窗口由另一个打开。

`window.frames，window.length`

window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window.frames[0]表示页面中第一个框架窗口。

如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。比如<`iframe` name="myIFrame">就可以用frames['myIFrame']或者frames.myIFrame来引用。

frames属性实际上是window对象的别名。

```
frames === window // true
```

因此，frames[0]也可以用window[0]表示。但是，从语义上看，frames更清晰，而且考虑到window还是全局对象，因此推荐表示多窗口时，总是使用frames[0]的写法。更多介绍请看下文的《多窗口操作》部分。

window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。

```
window.frames.length === window.length // true
```
window.frames.length与window.length应该是相等的。

`window.screenX，window.screenY`

window.screenX和window.screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角（(0, 0)）的水平距离和垂直距离，单位为像素。

`window.innerHeight，window.innerWidth`

window.innerHeight和window.innerWidth属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport），单位为像素。

当用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

注意，这两个属性值包括滚动条的高度和宽度。

`window.outerHeight，window.outerWidth`

window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框，单位为像素。

`window.pageXOffset，window.pageYOffset`

window.pageXOffset属性返回页面的水平滚动距离，window.pageYOffset属性返回页面的垂直滚动距离，单位都为像素。

举例来说，如果用户向下拉动了垂直滚动条75像素，那么window.pageYOffset就是75。用户水平向右拉动水平滚动条200像素，window.pageXOffset就是200。

**navigator对象**

window对象的navigator属性，指向一个包含浏览器信息的对象。

`navigator.userAgent`

navigator.userAgent属性返回浏览器的User-Agent字符串，标示浏览器的厂商和版本信息。

下面是Chrome浏览器的userAgent。

```
navigator.userAgent
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```
通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的JavaScript功能。

不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。

```
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

```
/mobi|android|touch|mini/i.test(ua)
```

`navigator.plugins`

navigator.plugins属性返回一个类似数组的对象，成员是浏览器安装的插件，比如Flash、ActiveX等。

`navigator.platform`

navigator.platform属性返回用户的操作系统信息。

`navigator.onLine`

navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线。

```
navigator.onLine // true
```

`navigator.geolocation`

navigator.geolocation返回一个Geolocation对象，包含用户地理位置的信息。

`navigator.javaEnabled()，navigator.cookieEnabled`

javaEnabled方法返回一个布尔值，表示浏览器是否能运行Java Applet小程序。

```
navigator.javaEnabled() // false
```

cookieEnabled属性返回一个布尔值，表示浏览器是否能储存Cookie。

```
navigator.cookieEnabled // true
```

注意，这个返回值与是否储存某个网站的Cookie无关。用户可以设置某个网站不得储存Cookie，这时cookieEnabled返回的还是true。

**window.screen对象**

window.screen对象包含了显示设备的信息。

screen.height和screen.width两个属性，一般用来了解设备的分辨率。

```
// 显示设备的高度，单位为像素
screen.height // 1920

// 显示设备的宽度，单位为像素
screen.width // 1080
```

上面代码显示，某设备的分辨率是1920x1080。

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码。

```
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

screen.availHeight和screen.availWidth属性返回屏幕可用的高度和宽度，单位为像素。它们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

screen.colorDepth属性返回屏幕的颜色深度，一般为16（表示16-bit）或24（表示24-bit）

**window对象的方法**

`window.moveTo()，window.moveBy()`

window.moveTo方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

```
window.moveTo(100, 200)
```

上面代码将窗口移动到屏幕(100, 200)的位置。

window.moveBy方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

```
window.moveBy(25, 50)
```

上面代码将窗口向右移动25像素、向下移动50像素。

`window.scrollTo()，window.scrollBy()`

window.scrollTo方法用于将网页的指定位置，滚动到浏览器左上角。它的参数是相对于整张网页的横坐标和纵坐标。它有一个别名window.scroll。

```
window.scrollTo(0, 1000);
```

window.scrollBy方法用于将网页移动指定距离，单位为像素。它接受两个参数：向右滚动的像素，向下滚动的像素。

```
window.scrollBy(0, window.innerHeight)
```

上面代码用于将网页向下滚动一屏。

`window.open(), window.close()`

window.open方法用于新建另一个浏览器窗口，并且返回该窗口对象。

```
var popup = window.open('somefile.html');
```

上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的somefile.html。

open方法一共可以接受四个参数。

第一个参数：字符串，表示新窗口的网址。如果省略，默认网址就是about:blank。
第二个参数：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则跳到该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。
第三个参数：字符串，内容为逗号分隔的键值对，表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整UI的新窗口。
第四个参数：布尔值，表示第一个参数指定的网址，是否应该替换history对象之中的当前网址记录，默认值为false。显然，这个参数只有在第二个参数指向已经存在的窗口时，才有意义。
下面是一个例子。

```
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);

```
上面代码表示，打开的新窗口高度和宽度都为200像素，没有地址栏和滚动条，但有状态栏，允许用户调整大小。

注意，如果在第三个参数中设置了一部分参数，其他没有被设置的yes/no参数都会被设成no，只有titlebar和关闭按钮除外（它们的值默认为yes）。

另外，open方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许open方法指向该窗口。

open方法返回新窗口的引用。

```
var windowB = window.open('windowB.html', 'WindowB');
windowB.window.name // "WindowB"
```

```
var w = window.open();
w.alert('已经打开新窗口');
w.location = 'http://example.com';
```
上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向example.com。

由于open这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。

```
if (popup === null) {
  // 新建窗口失败
}
```

window.close方法用于关闭当前窗口，一般用来关闭window.open方法新建的窗口。

```
popup.close()
```
该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。

`window.print()`

print方法会跳出打印对话框，同用户点击菜单里面的“打印”命令效果相同。

页面上的打印按钮代码如下。

```
document.getElementById('printLink').onclick = function() {
  window.print();
}
```

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。

```
if (typeof window.print === 'function') {
  // 支持打印功能
}
```

`window.getComputedStyle()`

getComputedStyle方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象。详见《DOM》一章的CSS章节。

`window.matchMedia()`

window.matchMedia方法用来检查CSS的mediaQuery语句。详见《DOM》一章的CSS章节。

`window.focus()`

focus方法会激活指定当前窗口，使其获得焦点。

```
var popup = window.open('popup.html', 'Popup Window');

if ((popup !== null) && !popup.closed) {
  popup.focus();
}
```

上面代码先检查popup窗口是否依然存在，确认后激活该窗口。

当前窗口获得焦点时，会触发focus事件；当前窗口失去焦点时，会触发blur事件。

`window.getSelection()`

window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。

```
var selObj = window.getSelection();
```

使用Selction对象的toString方法可以得到选中的文本。

```
var selectedText = selObj.toString();
```

**多窗口操作**

由于网页可以使用iframe元素，嵌入其他网页，因此一个网页之中会形成多个窗口。另一情况是，子网页之中又嵌入别的网页，形成多级窗口。

`窗口的引用`

各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。

top：顶层窗口，即最上层的那个窗口
parent：父窗口
self：当前窗口，即自身

下面代码可以判断，当前窗口是否为顶层窗口。

```
top === self

// 更好的写法
window.top === window.self
```

下面的代码让父窗口的访问历史后退一次。

```
parent.history.back();
```

与这些变量对应，浏览器还提供一些特殊的窗口名，供open方法、<`a`>标签、<`form`>标签等引用。

_top：顶层窗口
_parent：父窗口
_blank：新窗口
下面代码就表示在顶层窗口打开链接。

```
`<a href="somepage.html" target="_top">Link</a>`
```

**iframe标签**

对于iframe嵌入的窗口，document.getElementById方法可以拿到该窗口的DOM节点，然后使用contentWindow属性获得iframe节点包含的window对象，或者使用contentDocument属性获得包含的document对象。

```
var frame = document.getElementById('theFrame');
var frameWindow = frame.contentWindow;

// 等同于 frame.contentWindow.document
var frameDoc = frame.contentDocument;

// 获取子窗口的变量和属性
frameWindow.function()

// 获取子窗口的标题
frameWindow.title
```

iframe元素遵守同源政策，只有当父页面与框架页面来自同一个域名，两者之间才可以用脚本通信，否则只有使用window.postMessage方法。

iframe窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口。

```
if (window.parent !== window.self) {
  // 当前窗口是子窗口
}
```

iframe嵌入窗口的window对象，有一个frameElement属性，返回它在父窗口中的DOM节点。对于那么非嵌入的窗口，该属性等于null。

```
var f1Element = document.getElementById('f1');
var fiWindow = f1Element.contentWindow;
f1Window.frameElement === f1Element // true
window.frameElement === null // true
```

**frames属性**

window对象的frames属性返回一个类似数组的对象，成员是所有子窗口的window对象。可以使用这个属性，实现窗口之间的互相引用。比如，frames[0]返回第一个子窗口，frames[1].frames[2]返回第二个子窗口内部的第三个子窗口，parent.frames[1]返回父窗口的第二个子窗口。

需要注意的是，window.frames每个成员的值，是框架内的窗口（即框架的window对象），而不是iframe标签在父窗口的DOM节点。如果要获取每个框架内部的DOM树，需要使用window.frames[0].document的写法。

另外，如果iframe元素设置了name或id属性，那么属性值会自动成为全局变量，并且可以通过window.frames属性引用，返回子窗口的window对象。

```
// HTML代码为<iframe id="myFrame">
myFrame // [HTMLIFrameElement]
frames.myframe === myFrame // true
```

另外，name属性的值会自动成为子窗口的名称，可以用在window.open方法的第二个参数，或者<`a`>和<`frame`>标签的target属性。

**事件**

window对象可以接收以下事件。

`load事件和onload属性`

load事件发生在文档在浏览器窗口加载完毕时。window.onload属性可以指定这个事件的回调函数

```
window.onload = function() {
  var elements = document.getElementsByClassName('example');
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};
```

上面代码在网页加载完毕后，获取指定元素并进行处理。

`error事件和onerror属性`

浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。

```
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```

由于历史原因，window的error事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

出错信息
出错脚本的网址
行号
列号
错误对象
老式浏览器只支持前三个参数。

并不是所有的错误，都会触发JavaScript的error事件（即让JavaScript报错），只限于以下三类事件。

JavaScript语言错误
JavaScript脚本文件不存在
图像文件不存在
以下两类事件不会触发JavaScript的error事件。

CSS文件不存在
iframe文件不存在

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error.”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置Access-Control-Allow-Origin的HTTP头信息。

```
Access-Control-Allow-Origin: *
```

然后，在网页的<`script`>标签中设置crossorigin属性。

```
<script crossorigin="anonymous" src="//example.com/file.js"></script>
```

上面代码的crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要cookie和HTTP认证信息。如果设为crossorigin="use-credentials"，就表示浏览器会上传cookie和HTTP认证信息，同时还需要服务器端打开HTTP头信息Access-Control-Allow-Credentials。

**URL的编码/解码方法**

网页URL的合法字符分成两类。

URL元字符：分号（;），逗号（’,’），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（\），圆括号（()`）

除了以上字符，其他字符出现在URL之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。比如，UTF-8的操作系统上，http://www.example.com/q=春节这个URL之中，汉字“春节”不是URL的合法字符，所以被浏览器自动转成http://www.example.com/q=%E6%98%A5%E8%8A%82。其中，“春”转成了%E6%98%A5，“节”转成了“%E8%8A%82”。这是因为“春”和”节“的UTF-8编码分别是E6 98 A5和E8 8A 82，将每个字节前面加上百分号，就构成了URL编码。

JavaScript提供四个URL的编码/解码方法。

encodeURI()
encodeURIComponent()
decodeURI()
decodeURIComponent()

`encodeURI`

encodeURI 方法的参数是一个字符串，代表整个URL。它会将元字符和语义字符之外的字符，都进行转义。

```
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

`encodeURIComponent`

encodeURIComponent只转除了语义字符之外的字符，元字符也会被转义。因此，它的参数通常是URL的路径或参数值，而不是整个URL。

```
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

上面代码中，encodeURIComponent会连URL元字符一起转义，所以通常只用它转URL的片段。

`decodeURI`

decodeURI用于还原转义后的URL。它是encodeURI方法的逆运算。

```
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
// "http://www.example.com/q=春节"
```

`decodeURIComponent`

decodeURIComponent用于还原转义后的URL片段。它是encodeURIComponent方法的逆运算。

```
decodeURIComponent('%E6%98%A5%E8%8A%82')
// "春节"
```

`alert()，prompt()，confirm()`

alert()、prompt()、confirm()都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。

需要注意的是，alert()、prompt()、confirm()这三个方法弹出的对话框，都是浏览器统一规定的式样，是无法定制的。

alert方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。

用户只有点击“确定”按钮，对话框才会消失。在对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。

alert方法的参数只能是字符串，没法使用CSS样式，但是可以用\n指定换行。

prompt方法弹出的对话框，在提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。

prompt方法的返回值是一个字符串（有可能为空）或者null，具体分成三种情况。

用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
用户点击了“取消”（或者按了Esc按钮），则返回值是null。

prompt方法的第二个参数是可选的，但是如果不提供的话，IE浏览器会在输入框中显示undefined。因此，最好总是提供第二个参数，作为输入框的默认值。

confirm方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户的意见。

confirm方法返回一个布尔值，如果用户点击“确定”，则返回true；如果用户点击“取消”，则返回false。

confirm的一个用途是，当用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。

```
window.onunload = function() {
  return confirm('你确定要离开当面页面吗？');
}
```

这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。
