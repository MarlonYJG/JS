概述
history.pushState()
history.replaceState()
history.state属性
popstate事件
URLSearchParams API

概述

浏览器窗口有一个history对象，用来保存浏览历史。

如果当前窗口先后访问了三个网址，那么history对象就包括三项，history.length属性等于3。

history对象提供了一系列方法，允许在浏览历史之间移动。

back()：移动到上一个访问页面，等同于浏览器的后退键。
forward()：移动到下一个访问页面，等同于浏览器的前进键。
go()：接受一个整数作为参数，移动到该整数指定的页面，比如go(1)相当于forward()，go(-1)相当于back()。

```
history.back();
history.forward();
history.go(-2);
```

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败。

history.go(0)相当于刷新当前页面。

注意，返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

`history.pushState()`

