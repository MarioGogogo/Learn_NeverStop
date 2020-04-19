# Prototype 源码分析

## AJAX 之旅 (1)


    2020年,现在就从一个 javascript 的开发框架 `prototype_1.3.1`（下面简称为 prototype）开始。我本来是想先介绍一下 javascript 的高级应用，但怕水平不够，说的没有条理，所以就结合 prototype 来说，顺便 会提及 js 的语法使用。
下面是框架最前面的两段代码：

```js
var Prototype = {
  Version: '1.3.1',
  emptyFunction: function() {}
}
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
```



首先，让我们来看下面两个语法的区别：

```js
var o={};
var f=function(){};
```

后 面一个很容易理解，它等价于function f(){}; 定义一个函数 f。但前面一个就不常见了：这其实是创建一个对象，在 {}中可以指定对象的成员，比如上面的 Prototype，就是一个对象， 有两个成员，第一个是版本号，第二个是一个空方法（函数）。像这种不用定义类，就能直接创建对象的功能可能只有 js 能做到。后面一种语法其实还有一个功 能，就是定义一个类 f。如果你在函数体中用了` this`，那么 this 后面的变量就是类的成员。
不仅 this 可以定义类成员，还有一种语法：

```js
function c(){
 member1:value,
 member2:function(){}
}
//这等价于:
function c(){
 this.member1=value;
 this.member2=function(){};
}
```

需要注意的是，用前一种办法时，最后一个成员的最后不能加逗号，我想这种语法应该和数组有关。
在 js 里，函数和类是没有区别的，都可以 new，new 的作用是把函数体的语句都执行一遍，然后`返回一个对象`。如果函数里有 this，那么 this 后面的变量会 作为对象成员；如果没有，那么 new 的作用只是返回一个没有任何成员的空对象。所以你用 typeof 查看一个所谓类的类型时，仍然会返回 function。在 js 里也基本没有类型的概念，所有变量的声明都用 var，即使是函数，也是如此。函数，其实也只是一个变量。
说函数是变量，可能很多人不解。但是你试试下面的做法：

```js
function fTest(){
 var a=1;
 alert(a);
}
alert(fTest);
```

你 会发现显示的是 fTest 这个函数的函数体，所以我们可以认为，所谓函数，仅仅是 js 引擎可以解析的一段代码字符串。函数名变量存储的只是这个字符串。说 的更准确一点，`函数名是一个指针变量`，它存储的是这个代码字符串在内存中的位置。这样就不难理解将函数作为参数传递，可以作为值返回了，这是以后会大量使 用的技术。因为类也是函数，所以理解了函数，也就理解了类。
虽然在 js 里函数和类没有区别，但是类的概念却可以方便我们进行程序设计，于是 prototype 很有创意的创建了一个全局对象 Class：

```js
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
```

Class 是一个全局对象，它的唯一方法就是 create，作用返回一个函数，前面已经讲过函数作为返回值的机制，这里不再遨述。返回的函数包括一条语句：

```js
this.initialize.apply(this, arguments);
```

前面讲过，new 一个函数时，会执行函数里的代码，最后返回对象。所以当使用 Class.create() 创建了一个函数，再 `new` 这个返回的函数时，首先会执行这条语句。后面可以看到，这其实是为了调用类的构造函数。
就 是这样，Class 成为了整个 prototype 的类型创建模型，并且能很好的把类和函数在代码上区分开来。Class.create() 仅仅是返回一个 空类，而且它会默认为这个类是具有` initialize `方法的，所以要使用这个类，至少需要有一个构造函数，这就需要使用到类的继承。类只是一个函数，那 么函数怎么继承呢？看起来匪夷所思，javascript 能做到这一点，`prototype `使得实现更为优雅，至于它是怎么做到的，且听下回分解。

## AJAX 之旅 (2)

上回说到了类的定义，prototype 通过一个全局对象 `Class` 从形式上将函数和类区别开来。既然是类，那么就有抽象类，具体类，类的继承，同时，类的成员可以有实例成员和静态成员。下面来看一下 prototype 是怎么做到这些的。
先看 prototype 中的以下的代码：

```js
var Abstract = new Object();
//浅复制
 Object.extend = function(destination, source) {
  for (property in source) {
   destination[property] = source[property];
  }
  return destination;
 }
 Object.prototype.extend = function(object) {
  return Object.extend.apply(this, [this, object]);
 }
```

第一个声明了一个对象 Abstract，Object 其实是一个函数，他没有任何成员，所以是一个空类，所以 Abstract 也就没有任何成员。这个暂时不说，后面可以看到这是抽象类的基础。先解释以下这个语法：

```js
function.member=function(){}
```

在这种情况下，function 一般都是已经定义过的，这条语句的作用是给 function 增加一个静态成员 member，member 的内容是等号后面的。如上面第二段代码 ==Object.extend=……==，就是给 Object 这个类增加了一个静态方法 extend。ok，我们知道了怎样给一个类定义静态成员，那么你一定很想知道==实例成员怎么定义==，很简单，在类名和成员名之间加上 ==prototype==：

```js
function.prototype.member=function(){}

prototype 不仅可以这么使用，还可以：
 function.prototype={
 member1:function(){……},
 member2:"abc",
 member3:function(){……}
 }
```

这样就是实现了实例成员的定义。但 prototype 代表什么意思呢？在第一篇我说过，直接用 {} 括起来，表示一个对象，如 Prototype，Class 都是这样定义的全局对象。而看下面一种用法，==prototype 后面就是一个 {} 的结构，难道它也是对象？是的，没错==，prototype 其实也是一个对象！在 javascript 里，一个对象我们可以任意增加它的成员，用如下的语法：

```js
object.member=function(){……};
```

只要经过这样的定义，一个对象就可以立刻具有 member 这个方法！javascript 就是这么神奇！
好，我们现在知道了 prototype 是一个对象，而 function 是一个函数或者类，那么我们可以认为 prototype 是任何一个类（函数）都内部保留的一个静态成员。它的功能就是存储这个类的所有成员指针，但这些成员都只是原型，没有经过初始化，这也符合 prototype 的原义。你可以随时通过 prototype 这个对象来扩充成员。在 new 一个类时，prototype 的成员就经过初始化，然后赋给了实例化的对象。
上面第三段代码 Object.prototype.extend=……，就是给 Object 增加了一个实例方法 extend，实例方法中就可以引用 this 指针，指向由这个类实例化的对象本身。当然，这个对象就具有成员 extend。
继续之前，先了解一下两个语句：

```js
for(var p in object){}
 method.apply(object,arguments);
```

开始有点晕了，不过不要急，还是可以看懂的，apply 语法刚刚已经讲过了，它的调用者是一个方法，而 Object.extend 是一个静态方法，它被应用到 this 上面，也就是 Object 的实例，假设为 obj，后面方括号是一个数组，包括两个成员，this 和 object。这个数组实际上就是 Object 静态成员 extend 的 arguments 参数。那么这条语句就相当于执行==obj.extend(this,object);==
this 不解释了，表示本身。object 是什么？参数，恩，是实例方法 extend 传来的参数，不要混淆。extend 呢？obj 并没有定义 extend 实例成员，但通过 apply，它可以把 Object 的静态成员 extend 拿来使用，再看一下 extend 的函数体：

只要经过这样的定义，一个对象就可以立刻具有 member 这个方法！javascript 就是这么神奇！
好，我们现在知道了 prototype 是一个对象，而 function 是一个函数或者类，那么我们可以认为 prototype 是任何一个类（函数）都内部保留的一个静态成员。==它的功能就是存储这个类的所有成员指针，但这些成员都只是原型==，没有经过初始化，这也符合 prototype 的原义。你可以随时通过 prototype 这个对象来扩充成员。在 new 一个类时，prototype 的成员就经过初始化，然后赋给了实例化的对象。
上面第三段代码 ==Object.prototype.extend=……==，就是给 Object 增加了一个实例方法 extend，实例方法中就可以引用 this 指针，指向由这个类实例化的对象本身。当然，这个对象就具有成员 extend。
继续之前，先了解一下两个语句：

```js
for(var p in object){}

 method.apply(object,arguments);
```

第一句：列举出一个变量的所有成员，如果是函数，那么是所有静态成员；如果是对象，那就是所有实例成员，p 的类型是一个字符串。表示成员的名称。引用一个成员不仅可以用 variabel.member，还可以用 variabel["member"]。反过来，赋值也是如此。这就给枚举一个变量的成员带来了很大方便。

第二条语句：将 method 这个方法应用到 object 去执行，参数是 arguments 这个数组。注意：method 并不是 object 的成员。但是，==我们可以认为这条语句执行的意思就是：object.method(arguments)==。这是一个很重要的方法，后面会经常用到，你也会逐渐熟悉它的。
下面继续 extend，它是一个非常重要的方法，可以看到它既是类 Object 的静态成员，也是其实例成员，那它有什么作用呢？让我们来看：它接收两个参数，destination 和 source，如果 destination 和 source 都是类，那么它的功能是把类 source 的所有静态成员都复制给类 destination，如果 destination 和 source 都是对象，那么是把所有实例成员都复制过来。这时 destination 中如果已经有同名成员，那么这个成员将被覆盖。也就是说让 destination 具有了 source 的所有成员，并且函数返回这个 destination。下面看 extend 作为 Object 的实例成员：

```js
Object.prototype.extend = function(object) {
   return Object.extend.apply(this, [this, object]);
 }
```



因为 obj 是对象，object 也是对象，即 destination 和 source 都是对象，于是函数的作用就是使 obj 具有 object 的所有成员。并且会返回 obj。听起来有点拗口，但逻辑很简单：让 obj“继承于”object！很好，我们看到了继承，但你肯定会问，对象的继承，第一次听说啊，我们讲继承都是讲的类的继承。没错，现在的确还没有看到真正的类继承，但已经近在眼前了：类不就是有个 prototype 吗，而 prototype 是对象！
好，想到这一点，类的继承语法看似很简单了：
b.prototype.extend(a.prototype);
让 b 继承 a。
可是事实却没那么简单：prototype 是存放方法原型指针，extend 方法没有初始化，不能使用！要使用 extend，就必须实例化一个对象。还是看看 prototype 是怎么做的吧：
b.prototype=(new a()).extend(b.prototype);
很高明的办法！充分说明了函数其实也是一个变量的道理。先实例化 a 对象，然后在它基础上调用 extend，将所有的成员 b.prototype 的成员覆盖到 a 的对象，然后把这个 a 对象再赋值给 b.prototype。完成了 b 从 a 继承的工作。在实际使用中，一般的用法都是：
b.prototype=(new a()).extend({});
因为让一个 b 继承自 a，通常 b 之前都是一个未定义的类，所以后面的 {} 中其实就可以定义类成员。当然，你也可以先定义，再继承，只是和传统概念有所区别了。

prototype 不仅可以这么使用，还可以：

```js
 function.prototype={
 member1:function(){……},
 member2:"abc",
 member3:function(){……}
 }
```

这样就是实现了实例成员的定义。但 prototype 代表什么意思呢？在第一篇我说过，直接用 {} 括起来，表示一个对象，如 Prototype，Class 都是这样定义的全局对象。而看下面一种用法，prototype 后面就是一个 {} 的结构，难道它也是对象？是的，没错，prototype 其实也是一个对象！在 javascript 里，一个对象我们可以任意增加它的成员，用如下的语法：
object.member=function(){……};
只要经过这样的定义，一个对象就可以立刻具有 member 这个方法！javascript 就是这么神奇！
好，我们现在知道了 prototype 是一个对象，而 function 是一个函数或者类，那么我们可以认为 prototype 是任何一个类（函数）都内部保留的一个静态成员。它的功能就是存储这个类的所有成员指针，但这些成员都只是原型，没有经过初始化，这也符合 prototype 的原义。你可以随时通过 prototype 这个对象来扩充成员。在 new 一个类时，prototype 的成员就经过初始化，然后赋给了实例化的对象。
上面第三段代码 Object.prototype.extend=……，就是给 Object 增加了一个实例方法 extend，实例方法中就可以引用 this 指针，指向由这个类实例化的对象本身。当然，这个对象就具有成员 extend。
继续之前，先了解一下两个语句：

这样就是实现了实例成员的定义。但 prototype 代表什么意思呢？在第一篇我说过，直接用 {} 括起来，表示一个对象，如 Prototype，Class 都是这样定义的全局对象。而看下面一种用法，prototype 后面就是一个 {} 的结构，难道它也是对象？是的，没错，prototype 其实也是一个对象！在 javascript 里，一个对象我们可以任意增加它的成员，用如下的语法：
object.member=function(){……};
只要经过这样的定义，一个对象就可以立刻具有 member 这个方法！javascript 就是这么神奇！
好，我们现在知道了 prototype 是一个对象，而 function 是一个函数或者类，那么我们可以认为 prototype 是任何一个类（函数）都内部保留的一个静态成员。它的功能就是存储这个类的所有成员指针，但这些成员都只是原型，没有经过初始化，这也符合 prototype 的原义。你可以随时通过 prototype 这个对象来扩充成员。在 new 一个类时，prototype 的成员就经过初始化，然后赋给了实例化的对象。
上面第三段代码 Object.prototype.extend=……，就是给 Object 增加了一个实例方法 extend，实例方法中就可以引用 this 指针，指向由这个类实例化的对象本身。当然，这个对象就具有成员 extend。
继续之前，先了解一下两个语句：

```js
for(var p in object){}
method.apply(object,arguments);
```

第一句：列举出一个变量的所有成员，如果是函数，那么是所有静态成员；如果是对象，那就是所有实例成员，p 的类型是一个字符串。表示成员的名称。引用一个成员不仅可以用 variabel.member，还可以用 variabel["member"]。反过来，赋值也是如此。这就给枚举一个变量的成员带来了很大方便。

第二条语句：将 method 这个方法应用到 object 去执行，参数是 arguments 这个数组。注意：method 并不是 object 的成员。但是，我们可以认为这条语句执行的意思就是：object.method(arguments)。这是一个很重要的方法，后面会经常用到，你也会逐渐熟悉它的。
下面继续 extend，它是一个非常重要的方法，可以看到它既是类 Object 的静态成员，也是其实例成员，那它有什么作用呢？让我们来看：它接收两个参数，destination 和 source，如果 destination 和 source 都是类，那么它的功能是把类 source 的所有静态成员都复制给类 destination，如果 destination 和 source 都是对象，那么是把所有实例成员都复制过来。这时 destination 中如果已经有同名成员，那么这个成员将被覆盖。也就是说让 destination 具有了 source 的所有成员，并且函数返回这个 destination。下面看 extend 作为 Object 的实例成员：

```js
Object.prototype.extend = function(object) {
  return Object.extend.apply(this, [this, object]);
 }
```

开始有点晕了，不过不要急，还是可以看懂的，apply 语法刚刚已经讲过了，它的调用者是一个方法，而 Object.extend 是一个静态方法，它被应用到 this 上面，也就是 Object 的实例，假设为 obj，后面方括号是一个数组，包括两个成员，this 和 object。这个数组实际上就是 Object 静态成员 extend 的 arguments 参数。那么这条语句就相当于执行

```js
obj.extend(this,object);
```

this 不解释了，表示本身。object 是什么？参数，恩，是实例方法 extend 传来的参数，不要混淆。extend 呢？obj 并没有定义 extend 实例成员，但通过 apply，它可以把 Object 的静态成员 extend 拿来使用，再看一下 extend 的函数体：

```js
Object.extend = function(destination, source) {
  for (property in source) {
   destination[property] = source[property];
  }
  return destination;
 }
```

因为 obj 是对象，object 也是对象，即 destination 和 source 都是对象，于是函数的作用就是使 obj 具有 object 的所有成员。并且会返回 obj。听起来有点拗口，但逻辑很简单：让 obj“继承于”object！很好，我们看到了继承，但你肯定会问，对象的继承，第一次听说啊，我们讲继承都是讲的类的继承。没错，现在的确还没有看到真正的类继承，但已经近在眼前了：类不就是有个 prototype 吗，而 prototype 是对象！
好，想到这一点，类的继承语法看似很简单了：

```js
b.prototype.extend(a.prototype);
```

让 b 继承 a。
可是事实却没那么简单：prototype 是存放方法原型指针，extend 方法没有初始化，不能使用！要使用 extend，就必须实例化一个对象。还是看看 prototype 是怎么做的吧：

```js
b.prototype=(new a()).extend(b.prototype);
```

很高明的办法！充分说明了函数其实也是一个变量的道理。先实例化 a 对象，然后在它基础上调用 extend，将所有的成员 b.prototype 的成员覆盖到 a 的对象，然后把这个 a 对象再赋值给 b.prototype。完成了 b 从 a 继承的工作。在实际使用中，一般的用法都是：

```js
b.prototype=(new a()).extend({});
```

因为让一个 b 继承自 a，通常 b 之前都是一个未定义的类，所以后面的 {} 中其实就可以定义类成员。当然，你也可以先定义，再继承，只是和传统概念有所区别了。



## AJAX之旅（3)

### javascript中的事件设计模式 

今天暂时抛开prototype1.3.1，分享一下我的javscript事件设计心得。其实现的技术基础在于函数的本质，javascript内置的对象都有事件功能，比如button就有onclick事件，input就有onchange事件。那么如何在我们自定义的类中实现事件呢？很简单：

```js
var myClass=Class.create();
myClass.prototype={
 show:function(){
  //statement
  onshow();
 },
 onshow:function(){}
}
```

这段代码其实就是实现了onshow事件，在myClass实例show的时候触发，你可以给onshow绑定一个函数，从而使用事件功能。在javascript中，内置的对象事件使用方法都是如此，其内部实现应该也是基于这样的模式。但是，这样的实现却有两个突出的问题：

1.只能绑定一个回调函数。如果要实现多绑定，必须自己写很多代码来封装要回调的函数到一个函数中。

2.不能传递参数。因为onshow只能赋给函数名，即函数体本身，并不能传递参数进去，为了传递参数，我曾写过一篇：《用外壳包装法给javascript触发器传递参数》，可见，同样需要写很多代码。

那么，==这些问题怎么解决呢==？javascript内置对象的事件使用我们就暂时不管，来考虑一下怎么在自己实现的类中避免如上两个问题。实现之前，先来考虑下面这个问题，或许有助于理解实现这个功能的意义：
我的页面需要用javascript进行一些==初始化==，但初始化必须在页面载入完成之后进行。

通常我们会将代码放到html文件最下面。但此时，在页面载入完成之前，页面上的按钮点击需要调用必须经过初始化的方法，如果不作判断，那么就很容易出现脚本错误。因为还没有初始化，一个简单的想法是：用一个bool变量loaded来判断，初始为false，初始化完成后为true，那么按钮点击时遇到false就简单返回。这实现固然简单，但有可能造成用户发现点击无效，而不知其所以然。所以完善的做法应该是能捕获这个方法，将其绑定到页面载入完成事件上，当页面载入完成后自动调用。

好，现在看事件设计模式的实现代码：

```js
var myClass=Class.create();
myClass.prototype={
 initialize:function(){
  this.initEvent=new Object();
 },
 init:function(){
  //初始化要执行的语句
  
  //下面是调用绑定的回调函数
  for(var p in this.initEvent){
   //extend是内置方法，不可作为回调关键字
   if(p=="extend")continue;
   this.initEvent[p].apply(_object,[]);
  }
 },
 attachOnInit:function(_key,_object,_method,_arguments){
  this.initEvent[_key]=createFunction(_object,_method,_arguments);
 },
}
function createFunction(_object,_method,_arguments){
 return function(){
  _method.apply(_object,_arguments);
 }
}
```

这段代码就实现了一个类myClass，

|      参数      |                             说明                             |
| :------------: | :----------------------------------------------------------: |
|      init      |                        触发oninit事件                        |
|  attachOnInit  |       使用时要想绑定一个事件，可以调用attachOnInit方法       |
|     object     | object回调函数的对象，如果是直接在script中的函数，可以传递this指针进去即document对象 |
|      _key      |         回调参函数的唯一标识，如果重复，后者覆盖前者         |
|    _method     |  _method，要回调的函数，注意，这是一个函数名，不是字符串；_  |
|   arguments    |                      回调函数的参数数组                      |
| createFunction |               作用是包装一个函数，使其内置参数               |

这是外壳包装法那篇文章的一个通用实现。如果大家看过ajax之旅系列的前两篇文章，应该容易理解上面的代码，如果有什么问题，欢迎评论。

```js
function myFunc(s){
 alert(s);
}
var myObj=new myClass();
myClass.attach("key1",this,myFunc,[123]);
myClass.init();
```

这就将myFunc函数绑定到myObj的init函数，执行后会弹出对话框123。 