特征相关属性

Element.attributes
Element.id  Element.tagName
Element.innerHTML
Element.outerHTML
Element.className   Element.classList

盒状模型相关属性

Element.clientHeight    Element.clientWidth
Element.clientLeft  Element.clientTop
Element.scrollHeight    Element.scrollWidth
Element.scrollLeft  Element.scrollTop
Element.offsetHeight    element.offsetWidth
Element.offsetLeft  Element.offsetTop
Element.style
总结

相关节点的属性

Element.children    Element.childElementCount
Element.firstElementChild   Element.lastElementChild
Element.nextElementSibling   Element.previousElementSibling
Element.offsetParent

属性相关的方法

查找相关的方法

Element.querySelector()
Element.querySelectorAll()
Element.getElementsByClassName()
Element.getElementsByTagName()
Element.closest()
Element.matches()

事件相关方法

其他方法

Element.scrollIntoView()
Element.getBoundingClientRect()
Element.getClientRects()
Element.insertAdjacentHTML()
Element.remove()
Element.focus()

Element对象对应网页的HTML标签元素。每一个HTML标签元素，在DOM树上都会转化成一个Element节点对象（以下简称元素节点）。

元素节点的nodeType属性都是1，但是不同HTML标签生成的元素节点是不一样的。JavaScript内部使用不同的构造函数，生成不同的Element节点，比如<a>标签的节点对象由HTMLAnchorElement()构造函数生成，<button>标签的节点对象由HTMLButtonElement()构造函数生成。因此，元素节点不是一种对象，而是一组对象。

**特征相关的属性**

以下属性与元素特点本身的特征相关。

`Element.attributes`

Element.attributes属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点，详见本章《属性的操作》一节。

`Element.id，Element.tagName`

Element.id属性返回指定元素的id属性，该属性可读写。

Element.tagName属性返回指定元素的大写标签名，与nodeName属性的值相等。

`Element.innerHTML`

Element.innerHTML属性返回该元素包含的 HTML 代码。该属性可读写，常用来设置某个节点的内容。

如果将innerHTML属性设为空，等于删除所有它包含的所有节点。

注意，如果文本节点中包含&、小于号（<）和大于号（>），innerHTML属性会将它们转为实体形式&amp;、&lt;、&gt;。

如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有<script>标签，虽然可以生成script节点，但是插入的代码不会执行。

```
var name = "<script>alert('haha')</script>";
el.innerHTML = name;
```

上面代码将脚本插入内容，脚本并不会执行。但是，innerHTML还是有安全风险的。

```
var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;
```

上面代码中，alert方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用textContent属性代替innerHTML。

`Element.outerHTML`

Element.outerHTML属性返回一个字符串，内容为指定元素节点的所有HTML代码，包括它自身和包含的所有子元素。

outerHTML属性是可读写的，对它进行赋值，等于替换掉当前元素。

`Element.className，Element.classList`

className属性用来读写当前元素节点的class属性。它的值是一个字符串，每个class之间用空格分割。

classList属性则返回一个类似数组的对象，当前元素节点的每个class就是这个对象的一个成员。

```
document.getElementById('myDiv').className
// "one two three"

document.getElementById('myDiv').classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
```

从上面代码可以看出，className属性返回一个空格分隔的字符串，而classList属性指向一个类似数组的对象，该对象的length属性（只读）返回当前元素的class数量。
classList对象有下列方法。

add()：增加一个class。
remove()：移除一个class。
contains()：检查当前元素是否包含某个class。
toggle()：将某个class移入或移出当前元素。
item()：返回指定索引位置的class。
toString()：将class的列表转为字符串。

```
myDiv.classList.add('myCssClass');
myDiv.classList.add('foo', 'bar');
myDiv.classList.remove('myCssClass');
myDiv.classList.toggle('myCssClass'); // 如果myCssClass不存在就加入，否则移除
myDiv.classList.contains('myCssClass'); // 返回 true 或者 false
myDiv.classList.item(0); // 返回第一个Class
myDiv.classList.toString();
```

toggle方法可以接受一个布尔值，作为第二个参数。如果为true，则添加该属性；如果为false，则去除该属性。

**盒状模型相关属性**

`Element.clientHeight，Element.clientWidth`

Element.clientHeight属性返回元素节点可见部分的高度

Element.clientWidth属性返回元素节点可见部分的宽度。

所谓“可见部分”，指的是不包括溢出（overflow）的大小，只返回该元素在容器中占据的大小，对于有滚动条的元素来说，它们等于滚动条围起来的区域大小。这两个属性的值包括Padding、但不包括滚动条、边框和Margin，单位为像素。

这两个属性可以计算得到，等于元素的CSS高度（或宽度）加上CSS的Padding，减去滚动条（如果存在）。

对于整张网页来说，当前可见高度（即视口高度）要从document.documentElement对象（即<html>节点）上获取，等同于window.innerHeight属性减去水平滚动条的高度。没有滚动条时，这两个值是相等的；有滚动条时，前者小于后者。

```
var rootElement = document.documentElement;

// 没有水平滚动条时
rootElement.clientHeight === window.innerHeight // true

// 没有垂直滚动条时
rootElement.clientWidth === window.innerWidth // true
```

注意，这里不能用document.body.clientHeight或document.body.clientWidth，因为document.body返回<body>节点，与视口大小是无关的。

`Element.clientLeft，Element.clientTop`

Element.clientLeft属性等于元素节点左边框（left border）的宽度，Element.clientTop属性等于网页元素顶部边框的宽度，单位为像素。

这两个属性包括滚动条的宽度，但不包括Margin和Padding。不过，一般来说，除非排版方向是从右到左，且发生元素高度溢出，否则不可能存在左侧滚动条，亦不可能存在顶部的滚动条。

如果元素的显示设为display: inline，它的clientLeft属性一律为0，不管是否存在左边框。

`Element.scrollHeight，Element.scrollWidth`

Element.scrollHeight属性返回某个网页元素的总高度，Element.scrollWidth属性返回总宽度，可以理解成元素在垂直和水平两个方向上可以滚动的距离。它们都包括由于溢出容器而无法显示在网页上的那部分高度或宽度。这两个属性是只读属性。

它们返回的是整个元素的高度或宽度，包括由于存在滚动条而不可见的部分。默认情况下，它们包括Padding，但不包括Border和Margin。

整张网页的总高度可以从document.documentElement或document.body上读取。

```
document.documentElement.scrollHeight
```

如果内容正好适合它的容器，没有溢出，那么Element.scrollHeight和Element.clientHeight是相等的，scrollWidth属性与clientWidth属性是相等的。如果存在溢出，那么scrollHeight属性大于clientHeight属性，scrollWidth属性大于clientWidth属性。

存在溢出时，当滚动条滚动到内容底部时，下面的表达式为true。

```
element.scrollHeight - element.scrollTop === element.clientHeight
```

如果滚动条没有滚动到内容底部，上面的表达式为false。这个特性结合onscroll事件，可以判断用户是否滚动到了指定元素的底部，比如向用户展示某个内容区块时，判断用户是否滚动到了区块的底部。

```
var rules = document.getElementById('rules');
rules.onscroll = checking;

function checking(){
  if (this.scrollHeight - this.scrollTop === this.clientHeight) {
    console.log('谢谢阅读');
  } else {
    console.log('您还未读完');
  }
}
```

`Element.scrollLeft，Element.scrollTop`

Element.scrollLeft属性表示网页元素的水平滚动条向右侧滚动的`像素数量`，Element.scrollTop属性表示网页元素的垂直滚动条向下滚动的`像素数量`。对于那些没有滚动条的网页元素，这两个属性总是等于0。

如果要查看整张网页的水平的和垂直的滚动距离，要从document.documentElement元素上读取。

```
document.documentElement.scrollLeft
document.documentElement.scrollTop
```

这两个属性都可读写，设置该属性的值，会导致浏览器将指定元素自动滚动到相应的位置。

`Element.offsetHeight，Element.offsetWidth`

Element.offsetHeight属性返回元素的垂直高度，Element.offsetWidth属性返回水平宽度。offsetHeight可以理解成元素左下角距离左上角的位移，offsetWidth是元素右上角距离左上角的位移。它们的单位为像素，都是只读。

这两个属性值包括Padding和Border、以及滚动条。这也意味着，如果不存在内容溢出，Element.offsetHeight只比Element.clientHeight多了边框的高度。

整张网页的高度，可以在document.documentElement和document.body上读取。

```
// 网页总高度
document.documentElement.offsetHeight
document.body.offsetHeight

// 网页总宽度
document.documentElement.offsetWidth
document.body.offsetWidth
```

`Element.offsetLeft，Element.offsetTop`

Element.offsetLeft返回当前元素左上角相对于Element.offsetParent节点的水平位移，Element.offsetTop返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

`Element.style`

每个元素节点都有style用来读写该元素的行内样式信息，具体介绍参见《CSS操作》一节。

总结

整张网页的高度和宽度，可以从document.documentElement（即<html>元素）或<body>元素上读取。

```
// 网页总高度
document.documentElement.offsetHeight
document.documentElement.scrollHeight
document.body.offsetHeight
document.body.scrollHeight

// 网页总宽度
document.documentElement.offsetWidth
document.documentElement.scrollWidth
document.body.offsetWidth
document.body.scrollWidth
```
由于<html>和<body>的宽度可能设得不一样，因此从<body>上取值会更保险一点。

视口的高度和宽度（包括滚动条），有两种方法可以获得。

```
// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条
```

某个网页元素距离视口左上角的坐标，使用Element.getBoundingClientRect方法读取。

```
// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top
```

某个网页元素距离网页左上角的坐标，使用视口坐标加上网页滚动距离。

```
// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop
```

网页目前滚动的距离，可以从document.documentElement节点上得到。

```
// 网页滚动的水平距离
document.documentElement.scrollLeft

// 网页滚动的垂直距离
document.documentElement.scrollTop
```

网页元素本身的高度和宽度（不含overflow溢出的部分），通过offsetHeight和offsetWidth属性（包括Padding和Border）或Element.getBoundingClientRect方法获取。

```
// 网页元素的高度
Element.offsetHeight

// 网页元素的宽度
Element.offsetWidth
```

**相关节点的属性**

以下属性返回元素节点的相关节点。

`Element.children，Element.childElementCount`

Element.children属性返回一个HTMLCollection对象，包括当前元素节点的所有子元素。它是一个类似数组的动态对象（实时反映网页元素的变化）。如果当前元素没有子元素，则返回的对象包含零个成员。

这个属性与Node.childNodes属性的区别是，它只包括HTML元素类型的子节点，不包括其他类型的子节点。

Element.childElementCount属性返回当前元素节点包含的子HTML元素节点的个数，与Element.children.length的值相同。注意，该属性只计算HTML元素类型的子节点。

`Element.firstElementChild，Element.lastElementChild`

Element.firstElementChild属性返回第一个HTML元素类型的子节点，Element.lastElementChild返回最后一个HTML元素类型的子节点。

如果没有HTML类型的子节点，这两个属性返回null。

`Element.nextElementSibling，Element.previousElementSibling`

Element.nextElementSibling属性返回当前HTML元素节点的后一个同级HTML元素节点，如果没有则返回null。

Element.previousElementSibling属性返回当前HTML元素节点的前一个同级HTML元素节点，如果没有则返回null。

`Element.offsetParent`

Element.offsetParent属性返回当前 HTML 元素的最靠近的、并且 CSS 的position属性不等于static的上层元素。

```
<div style="position: absolute;">
  <p>
    <span>Hello</span>
  </p>
</div>
```

上面代码中，span元素的offsetParent属性就是div元素。

该属性主要用于确定子元素位置偏移的计算基准，Element.offsetTop和Element.offsetLeft就是offsetParent元素计算的。

如果该元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回null。

如果某个元素的所有上层节点的position属性都是static，则Element.offsetParent属性指向<body>元素。

**属性相关的方法**

元素节点提供以下四个方法，用来操作HTML标签的属性。

Element.getAttribute()：读取指定属性
Element.setAttribute()：设置指定属性
Element.hasAttribute()：返回一个布尔值，表示当前元素节点是否有指定的属性
Element.removeAttribute()：移除指定属性

**查找相关的方法**

以下四个方法用来查找与当前元素节点相关的节点。这四个方法也部署在document对象上，用法完全一致。

Element.querySelector()
Element.querySelectorAll()
Element.getElementsByTagName()
Element.getElementsByClassName()

`Element.querySelector()`

Element.querySelector方法接受CSS选择器作为参数，返回父元素的第一个匹配的子元素。

需要注意的是，浏览器执行querySelector方法时，是先在全局范围内搜索给定的CSS选择器，然后过滤出哪些属于当前元素的子元素。

`Element.querySelectorAll()`

Element.querySelectorAll方法接受CSS选择器作为参数，返回一个NodeList对象，包含所有匹配的子元素。

该方法的执行机制与querySelector相同，也是先在全局范围内查找，再过滤出当前元素的子元素。因此，选择器实际上针对整个文档的。

`Element.getElementsByClassName()`

Element.getElementsByClassName方法返回一个HTMLCollection对象，成员是当前元素节点的所有匹配指定class的子元素。该方法与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

`Element.getElementsByTagName()`

Element.getElementsByTagName方法返回一个HTMLCollection对象，成员是当前元素节点的所有匹配指定标签名的子元素。该方法与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

`Element.closest()`

Element.closest方法返回当前元素节点的最接近的父元素（或者当前节点本身），条件是必须匹配给定的CSS选择器。如果不满足匹配，则返回null。

`Element.matches()`

Element.matches方法返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。

```
if (el.matches('.someClass')) {
  console.log('Match!');
}
```

该方法带有浏览器前缀，下面的函数可以兼容不同的浏览器，并且在浏览器不支持时，自行部署这个功能。

**事件相关的方法**

以下三个方法与Element节点的事件相关。这些方法都继承自EventTarget接口，详见本章的《Event对象》一节。

Element.addEventListener()：添加事件的回调函数
Element.removeEventListener()：移除事件监听函数
Element.dispatchEvent()：触发事件

**其他方法**

`Element.scrollIntoView()`

Element.scrollIntoView方法滚动当前元素，进入浏览器的可见区域，类似于设置window.location.hash的效果。

```
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
```

该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

`Element.getBoundingClientRect()`

Element.getBoundingClientRect方法返回一个对象，该对象提供当前元素节点的大小、位置等信息，基本上就是CSS盒状模型提供的所有信息。

```
var rect = obj.getBoundingClientRect();
```

上面代码中，getBoundingClientRect方法返回的rect对象，具有以下属性（全部为只读）。

x：元素左上角相对于视口的横坐标
left：元素左上角相对于视口的横坐标，与x属性相等
right：元素右边界相对于视口的横坐标（等于x加上width）
width：元素宽度（等于right减去left）
y：元素顶部相对于视口的纵坐标
top：元素顶部相对于视口的纵坐标，与y属性相等
bottom：元素底部相对于视口的纵坐标
height：元素高度（等于y加上height）

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将left属性加上window.scrollX，top属性加上window.scrollY。

注意，getBoundingClientRect方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 + padding + border。

`Element.getClientRects()`

Element.getClientRects方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

对于盒状元素（比如<div>和<p>），该方法返回的对象中只有该元素一个成员。对于行内元素（比如span、a、em），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和Element.getBoundingClientRect()方法的主要区别，对于行内元素，后者总是返回一个矩形区域，前者可能返回多个矩形区域，所以方法名中的Rect用的是复数。

`Element.insertAdjacentHTML()`

Element.insertAdjacentHTML方法解析HTML字符串，然后将生成的节点插入DOM树的指定位置。

```
element.insertAdjacentHTML(position, text);
```

该方法接受两个参数，第一个是指定位置，第二个是待解析的字符串。

指定位置共有四个。

beforebegin：在当前元素节点的前面。
afterbegin：在当前元素节点的里面，插在它的第一个子元素之前。
beforeend：在当前元素节点的里面，插在它的最后一个子元素之后。
afterend：在当前元素节点的后面。

该方法不是彻底置换现有的DOM结构，这使得它的执行速度比innerHTML操作快得多。

`Element.remove()`

Element.remove方法用于将当前元素节点从DOM树删除。

`Element.focus()`

Element.focus方法用于将当前页面的焦点，转移到指定元素上。

```
document.getElementById('my-span').focus();
```
