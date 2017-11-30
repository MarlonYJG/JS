1. 基本概念

    DOM         节点          节点树

2. 特征相关的属性

    Node.nodeName   Node.nodeType
    Node.nodeValue
    Node.textContent
    Node.baseURI

3. 相关节点的属性

    Node.ownerDocument
    Node.nextSibling
    Node.previouseSibling
    Node.parentNode
    Node.parentElement
    Node.childNodes
    Node.firstChild     Node.lastChild

4. 节点对象的方法

    Node.appendChild()
    Node.hasChildNodes()
    Node.cloneNode()
    Node.insertBefore()
    Node.removeChild()
    Node.replaceChild()
    Node.contains()
    Node.compareDocumentPosition()
    Node.isEqualNode()
    Node.normalize()

5. NodeList对象，HTMLCollection对象

6. ParentNode接口，ChildNode接口

**DOM**

*DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。*

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。所以，DOM 可以理解成网页的编程接口。DOM 有自己的国际标准，目前的通用版本是DOM 3，下一代版本DOM 4正在拟定中。

严格地说，DOM 不属于 JavaScript，但是操作 DOM 是 JavaScript 最常见的任务，而 JavaScript 也是最常用于 DOM 操作的语言。本章介绍的就是 JavaScript 对 DOM 标准的实现和用法。

**节点**

*DOM的最小组成单位叫做节点（node）。文档的树形结构（DOM树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。*

Document：整个文档树的顶层节点
DocumentType：doctype标签（比如<!DOCTYPE html>）
Element：网页的各种HTML标签（比如<`body`>、<`a`>等）
Attribute：网页元素的属性（比如class="right"）
Text：标签之间或标签包含的文本
Comment：注释
DocumentFragment：文档的片段

这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

**节点树**

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是DOM。

最顶层的节点就是document节点，它代表了整个文档。文档里面最高一层的HTML标签，一般是<`html`>，它构成树结构的根节点（root node），其他HTML标签节点都是它的下级。

除了根节点以外，其他节点对于周围的节点都存在三种关系。

父节点关系（parentNode）：直接的那个上级节点
子节点关系（childNodes）：直接的下级节点
同级节点关系（sibling）：拥有同一个父节点的节点

DOM提供操作接口，用来获取三种关系的节点。其中，子节点接口包括firstChild（第一个子节点）和lastChild（最后一个子节点）等属性，同级节点接口包括nextSibling（紧邻在后的那个同级节点）和previousSibling（紧邻在前的那个同级节点）属性。

**特征相关的属性**

*所有节点对象都是浏览器内置的Node对象的实例，继承了Node属性和方法。这是所有节点的共同特征。*

`Node.nodeName，Node.nodeType`


column0 | column1 | column2
------- | ------- | -------
类型 | nodeName | nodeType
ELEMENT_NODE | 大写的HTML元素名 | 1
ATTRIBUTE_NODE | 等同于Attr.name | 2
TEXT_NODE | #text | 3
COMMENT_NODE | #comment | 8
DOCUMENT_NODE | #document | 9
DOCUMENT_FRAGMENT_NODE | #document-fragment | 11
DOCUMENT_TYPE_NODE | 等同于DocumentType.name | 10

`document.nodeName // "#document"`
`document.nodeType // 9`

`Node.nodeValue`

Node.nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

由于只有Text节点、Comment节点、XML文档的CDATA节点有文本值，因此只有这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。同样的，也只有这三类节点可以设置nodeValue属性的值。对于那些返回null的节点，设置nodeValue属性是无效的。

`Node.textContent`

Node.textContent属性返回当前节点和它的所有后代节点的文本内容。

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对HTML标签转义。这很适合用于用户提供的内容。

对于Text节点和Comment节点，该属性的值与nodeValue属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括Comment节点。如果一个节点没有子节点，则返回空字符串。

document节点和doctype节点的textContent属性为null。如果要读取整个文档的内容，可以使用document.documentElement.textContent。

`Node.baseURI`

_Node.baseURI属性返回一个字符串，表示当前网页的绝对路径。如果无法取到这个值，则返回null。浏览器根据这个属性，计算网页上的相对路径的URL。该属性为只读。_


```
// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI
// "http://www.example.com/index.html"
```

该属性的值一般由当前网址的URL（即window.location属性）决定，但是可以使用HTML的<`base`>标签，改变该属性的值。

```
<base href="http://www.example.com/page.html">
<base target="_blank" href="http://www.example.com/page.html">
```

设置了以后，baseURI属性就返回<`base`>标签设置的值。

**相关节点的属性**

以下属性返回当前节点的相关节点。

`Node.ownerDocument`

Node.ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。

document对象本身的ownerDocument属性，返回null。

`Node.nextSibling`

Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回null。注意，该属性还包括文本节点和评论节点。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

`Node.previousSibling`

previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。

对于当前节点前面有空格，则previousSibling属性会返回一个内容为空格的文本节点。

`Node.parentNode`

parentNode属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：element节点、document节点和documentfragment节点。

对于document节点和documentfragment节点，它们的父节点都是null。另外，对于那些生成后还没插入DOM树的节点，父节点也是null。

`Node.parentElement`

parentElement属性返回当前节点的父Element节点。如果当前节点没有父节点，或者父节点类型不是Element节点，则返回null。

在IE浏览器中，只有Element节点才有该属性，其他浏览器则是所有类型的节点都有该属性。

`Node.childNodes`

childNodes属性返回一个NodeList集合，成员包括当前节点的所有子节点。注意，除了HTML元素节点，该属性返回的还包括Text节点和Comment节点。如果当前节点不包括任何子节点，则返回一个空的NodeList集合。由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

`Node.firstChild，Node.lastChild`

firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null（注意，不是undefined）。

注意，firstChild返回的除了HTML元素子节点，还可能是文本节点或评论节点。

Node.lastChild属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。

**节点对象的方法**

`Node.appendChild()`

Node.appendChild方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。

如果参数节点是DOM中已经存在的节点，appendChild方法会将其从原来的位置，移动到新位置。

`Node.hasChildNodes()`

Node.hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点。

`Node.cloneNode()`

Node.cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是false，即不克隆子节点。

_需要注意的是，克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即node.onclick = fn），添加在这个节点上的事件回调函数。_

克隆一个节点之后，DOM树有可能出现两个有相同ID属性（即id="xxx"）的HTML元素，这时应该修改其中一个HTML元素的ID属性。

`Node.insertBefore()`

insertBefore方法用于将某个节点插入当前节点内部的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点内部的一个子节点，新的节点将插在这个子节点的前面。该方法返回被插入的新节点。

```
var text1 = document.createTextNode('1');
var li = document.createElement('li');
li.appendChild(text1);

var ul = document.querySelector('ul');
ul.insertBefore(li, ul.firstChild);
```

如果insertBefore方法的第二个参数为null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。

注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。

由于不存在insertAfter方法，如果要插在当前节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟。

`Node.removeChild()`

Node.removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点。它返回被移除的子节点。

注意，这个方法是在父节点上调用的，不是在被移除的节点上调用的。

```
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```

`Node.replaceChild()`

Node.replaceChild方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

```
replacedNode = parentNode.replaceChild(newChild, oldChild);
```

`Node.contains()`

Node.contains方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。

注意，如果将当前节点传入contains方法，会返回true。虽然从意义上说，一个节点不应该包含自身。

```
nodeA.contains(nodeA) // true
```
`Node.compareDocumentPosition()`

compareDocumentPosition方法的用法，与contains方法完全一致，返回一个7个比特位的二进制值，表示参数节点与当前节点的关系。


二进制值 | 数值 | 含义
------- | ------- | -------
000000 | 0 | 两个节点相同
000001 | 1 | 两个节点不在同一个文档（即有一个节点不在当前文档）
000010 | 2 | 参数节点在当前节点的前面
000100 | 4 | 参数节点在当前节点的后面
001000 | 8 | 参数节点包含当前节点
010000 | 16 | 当前节点包含参数节点
100000 | 32 | 浏览器的私有用途

`Node.isEqualNode()`

isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

`Node.normalize()`

normailize方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。

该方法是Text.splitText的逆方法.

`NodeList对象，HTMLCollection对象`

_节点都是单个对象，有时会需要一种数据结构，能够容纳多个节点。DOM提供两种集合对象，用于实现这种节点的集合：NodeList和HTMLCollection。_

这两个对象都是构造函数。

```
typeof NodeList // "function"
typeof HTMLCollection // "function"
```

**NodeList对象**

NodeList实例对象是一个类似数组的对象，它的成员是节点对象。Node.childNodes、document.querySelectorAll()返回的都是NodeList实例对象。

NodeList实例对象可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM树删除或新增一个相关节点，都会立刻反映在NodeList接口之中。Node.childNodes返回的，就是一个动态集合。

document.querySelectorAll方法返回的是一个静态集合。DOM内部的变化，并不会实时反映在该方法的返回结果之中。

NodeList接口实例对象提供length属性和数字索引，因此可以像数组那样，使用数字索引取出每个节点，但是它本身并不是数组，不能使用pop或push之类数组特有的方法。

遍历NodeList实例对象的首选方法，是使用for循环。

不要使用for...in循环去遍历NodeList实例对象，因为for...in循环会将非数字索引的length属性和下面要讲到的item方法，也遍历进去，而且不保证各个成员遍历的顺序。

ES6新增的for...of循环，也可以正确遍历NodeList实例对象。

NodeList实例对象的item方法，接受一个数字索引作为参数，返回该索引对应的成员。如果取不到成员，或者索引不合法，则返回null。

```
nodeItem = nodeList.item(index)

// 实例
var divs = document.getElementsByTagName("div");
var secondDiv = divs.item(1);
```

所有类似数组的对象，都可以使用方括号运算符取出成员，所以一般情况下，都是使用下面的写法，而不使用item方法。

```
nodeItem = nodeList[index]
```

**HTMLCollection对象**

HTMLCollection实例对象与NodeList实例对象类似，也是节点的集合，返回一个类似数组的对象。document.links、docuement.forms、document.images等属性，返回的都是HTMLCollection实例对象。

HTMLCollection与NodeList的区别有以下几点。

（1）HTMLCollection实例对象的成员只能是Element节点，NodeList实例对象的成员可以包含其他节点。

（2）HTMLCollection实例对象都是动态集合，节点的变化会实时反映在集合中。NodeList实例对象可以是静态集合。

（3）HTMLCollection实例对象可以用id属性或name属性引用节点元素，NodeList只能使用数字索引引用。

HTMLCollection实例的item方法，可以根据成员的位置参数（从0开始），返回该成员。如果取不到成员或数字索引不合法，则返回null。

HTMLCollection实例的namedItem方法根据成员的ID属性或name属性，返回该成员。如果没有对应的成员，则返回null。这个方法是NodeList实例不具有的。

```
// HTML代码为
// <form id="myForm"></form>
var elem = document.forms.namedItem('myForm');
// 等价于下面的写法
var elem = document.forms['myForm'];
```

由于item方法和namedItem方法，都可以用方括号运算符代替，所以建议一律使用方括号运算符。

**ParentNode接口，ChildNode接口**

`ParentNode接口`

ParentNode接口用于获取Element子节点。Element节点、Document节点和DocumentFragment节点，部署了ParentNode接口。凡是这三类节点，都具有以下四个属性，用于获取Element子节点。

（1）children

children属性返回一个动态的HTMLCollection集合，由当前节点的所有Element子节点组成。

（2）firstElementChild

firstElementChild属性返回当前节点的第一个Element子节点，如果不存在任何Element子节点，则返回null。

（3）lastElementChild

lastElementChild属性返回当前节点的最后一个Element子节点，如果不存在任何Element子节点，则返回null。

（4）childElementCount

childElementCount属性返回当前节点的所有Element子节点的数目。

`ChildNode 接口`

ChildNode接口用于处理子节点（包含但不限于Element子节点）。Element节点、DocumentType节点和CharacterData接口，部署了ChildNode接口。凡是这三类节点（接口），都可以使用下面四个方法。

（1）remove()

remove方法用于移除当前节点。

注意，调用这个方法的节点，是被移除的节点本身，而不是它的父节点。

（2）before()

before方法用于在当前节点的前面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

（3）after()

after方法用于在当前节点的后面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

（4）replaceWith()

replaceWith方法使用参数指定的节点，替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。
