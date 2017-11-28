内部节点属性

    document.doctype    document.documentElement    document.defaultView
    document.body   document.head
    document.activeElement

节点集合属性

    document.links  document.forms  document.images document.embeds
    document.scripts    document.styleSheets

文档信息属性

    document.documentURI    document.URL
    document.domain
    document.lastModified
    document.location
    document.referrer   document.title  document.characterSet
    document.readyState
    document.designMode
    document.implementation
    document.compatMode
    document.cookie

读写相关的方法

    document.open()
    document.close()
    document.write()
    document.writeln()

查找节点的方法

    document.querySelectot()    document.querySelectorAll()
    document.getElementsByTagName()
    document.getElementsByClassName()
    document.getElementsByName()
    getElementById()
    document.elementFromPoint()

生成节点的方法

    document.createElement()
    document.createTextNode()
    document.createAttribute()
    document.createDocumentFragment()

事件相关的方法

    document.createEvent()
    document.addEventListener() document.removeEventListener()  document.dispathEvent()

其他方法

    document.hasFocus()
    document.createNodeIterator()   document.createTreeWalker()
    document.adoptNode()
    document.importNode()
    document.getSelection()


document节点是文档的根节点，每张网页都有自己的document节点。window.document属性就指向这个节点。只要浏览器开始载入HTML文档，这个节点对象就存在了，可以直接调用。

> 对于正常的网页，直接使用document或window.document。
> 对于iframe载入的网页，使用iframe节点的contentDocument属性。
> 对Ajax操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
> 对于包含某个节点的文档，使用该节点的ownerDocument属性。

上面这四种document节点，都部署了Document接口，因此有共同的属性和方法。当然，各自也有一些自己独特的属性和方法，比如HTML和XML文档的document节点就不一样。

**内部节点属性**

document节点有很多属性，其中相当一部分属于快捷方式，指向文档内部的某个节点。

`document.doctype，document.documentElement，document.defaultView`

对于HTML文档来说，document对象一般有两个子节点。第一个子节点是document.doctype，它是一个对象，包含了当前文档类型（Document Type Declaration，简写DTD）信息。对于HTML5文档，该节点就代表<!DOCTYPE html>。如果网页没有声明DTD，该属性返回null。

document.firstChild通常就返回这个节点。

document.documentElement属性返回当前文档的根节点（root）。它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。对于HTML网页，该属性返回<html>节点。

document.defaultView属性，在浏览器中返回document对象所在的window对象，否则返回null。

```
document.defaultView === window // true
```

`document.body，document.head`

document.head属性返回当前文档的<head>节点，document.body属性返回当前文档的<body>。

这两个属性总是存在的，如果网页源码里面省略了<head>或<body>，浏览器会自动创造。另外，这两个属性是可写的，如果对其写入一个新的节点，会导致原有的所有子节点被移除。

`document.activeElement`

document.activeElement属性返回当前文档中获得焦点的那个元素。用户通常可以使用Tab键移动焦点，使用空格键激活焦点。比如，如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接。

**节点集合属性**

以下属性返回文档内部特定元素的集合，都是类似数组的对象。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

`document.links，document.forms，document.images，document.embeds`

document.links属性返回当前文档所有设定了href属性的a及area元素。

document.forms属性返回页面中所有表单元素form。

document.images属性返回页面所有图片元素（即img标签）。

document.embeds属性返回网页中所有嵌入对象，即embed标签。

以上四个属性返回的都是HTMLCollection对象实例。

```
document.links instanceof HTMLCollection // true
document.images instanceof HTMLCollection // true
document.forms instanceof HTMLCollection // true
document.embeds instanceof HTMLCollection // true
```

由于HTMLCollection实例可以用HTML元素的id或name属性引用，因此如果一个元素有id或name属性，就可以在上面这四个属性上引用。

```
// HTML代码为
// <form name="myForm" >

document.myForm === document.forms.myForm // true
```

`document.scripts，document.styleSheets`

document.scripts属性返回当前文档的所有脚本（即script标签）。

document.scripts返回的也是HTMLCollection实例。

因此，如果一个script标签有id或name属性，就可以在document.scripts上引用。

document.styleSheets属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有cssRules属性，返回该样式表的所有CSS规则，这样这可以操作具体的CSS规则了。

**文档信息属性**

以下属性返回文档信息。

`document.documentURI，document.URL`

document.documentURI属性和document.URL属性都返回一个字符串，表示当前文档的网址。不同之处是documentURI属性可用于所有文档（包括 XML 文档），URL属性只能用于 HTML 文档。

`document.domain`

document.domain属性返回当前文档的域名。比如，某张网页的网址是 http://www.example.com/hello.html ，domain属性就等于www.example.com。如果无法获取域名，该属性返回null。

二级域名的情况下，domain属性可以设置为对应的一级域名。比如，当前域名是sub.example.com，则domain属性可以设置为example.com。除此之外的写入，都是不可以的。

`document.lastModified`

document.lastModified属性返回当前文档最后修改的时间戳，格式为字符串。

注意，lastModified属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用Date.parse方法转成时间戳格式，才能进行比较。

```
if (Date.parse(doc1.lastModified) > Date.parse(doc2.lastModified)) {
  // ...
}
```

`document.location`

document.location属性返回location对象，提供了当前文档的URL信息。

location对象有以下方法。

```
location.assign()
location.reload()
location.toString()

```

```
// 跳转到另一个网址
document.location.assign('http://www.google.com')
// 优先从服务器重新加载
document.location.reload(true)
// 优先从本地缓存重新加载（默认值）
document.location.reload(false)
// 跳转到新网址，并将取代掉history对象中的当前记录
document.location.replace('http://www.google.com');
// 将location对象转为字符串，等价于document.location.href
document.location.toString()
```

如果将新的网址赋值给location对象，网页就会自动跳转到新网址。

```
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';
```

也可以指定相对URL。

```
document.location = 'page2.html';
```

如果指定的是锚点，浏览器会自动滚动到锚点处。

```
document.location = '#top';
```

注意，采用上面的方法重置URL，跟用户点击链接跳转的效果是一样的。上一个网页依然将保存在浏览器历史之中，点击“后退”按钮就可以回到前一个网页。

如果不希望用户看到前一个网页，可以使用location.replace方法，浏览器history对象就会用新的网址，取代当前网址，这样的话，“后退”按钮就不会回到当前网页了。`它的一个应用就是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。`

document.location属性与window.location属性等价。

```
document.location === window.location // true
```

历史上，IE曾经不允许对document.location赋值，为了保险起见，建议优先使用window.location。如果只是单纯地获取当前网址，建议使用document.URL，语义性更好。

`document.referrer，document.title，document.characterSet`

document.referrer属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。

document.referrer的值，总是与HTTP头信息的Referer保持一致，但是它的拼写有两个r。

document.title属性返回当前文档的标题，该属性是可写的。

```
document.title = '新标题';
```

document.characterSet属性返回渲染当前文档的字符集，比如UTF-8、ISO-8859-1。

`document.readyState`

document.readyState属性返回当前文档的状态，共有三种可能的值。

loading：加载HTML代码阶段（尚未完成解析）
interactive：加载外部资源阶段时
complete：加载完成时

这个属性变化的过程如下。

> 1. 浏览器开始解析HTML文档，document.readyState属性等于loading。
> 2. 浏览器遇到HTML文档中的<script>元素，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是等于loading。
> 3. HTML文档解析完成，document.readyState属性变成interactive。
> 4. 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document. readyState属性变成complete。

下面的代码用来检查网页是否加载成功。

```
// 基本检查
if (document.readyState === 'complete') {
  // ...
}

// 轮询检查
var interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    // ...
  }
}, 100);
```

`document.designMode`

document.designMode属性控制当前文档是否可编辑，通常用在制作所见即所得编辑器。打开iframe元素包含的文档的designMode属性，就能将其变为一个所见即所得的编辑器。

`document.implementation`

document.implementation属性返回一个对象，用来甄别当前环境部署了哪些DOM相关接口。implementation属性的hasFeature方法，可以判断当前环境是否部署了特定版本的特定接口

`document.compatMode`

compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。

一般来说，如果网页代码的第一行设置了明确的DOCTYPE（比如<!doctype html>），document.compatMode的值都为CSS1Compat。

`document.cookie`

document.cookie属性用来操作浏览器Cookie，详见《浏览器环境》一章的《Cookie》部分。

**读写相关的方法**

