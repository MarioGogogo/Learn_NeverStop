###流/元素/基本尺寸

## 3.1块级元素
块级元素与display：block的元素不是一个概念；
例如：
- li元素默认display list-item  
- table的元素默认display table但他们都是块级元素

在实际开发过程中不会使用list-item的原因：
1. 1个字符的比较多；
1. 会出现不需要的项目符号；当然加一行list-style：none解决；
1. ie浏览器不支持display：list-item 兼容性不好；普通元素设置display：list-item有效但是 ：before ：after 伪元素不行；

问题：为什么list-item元素会出现项目符号？为什么ie不支持？
应为list-item元素会出现项目符号是应为生成了一个附加的盒子，我们叫`附加盒子`;
专门用来放原点 数字这些符号；
ie浏览器不支持list-item创建这个标记盒子导致的


另外每一个元素其实都有2个盒子；`外在盒子`和`内在盒子`；外在盒子负责元素是可以一行显示的还是换行显示；内在盒子负责宽高，内容显示什么；

display：block 块级盒子和内在的块级容器盒子；
display：inline-block 外在的内联盒子和内在的块级容器盒子
display：inline  内外都是内联盒子
现在知道为什么inline-block 元素技能和图文一行显示又能设置宽高了吧；

display：inline-table呢？ 外在内联盒子 内在table盒子；可以和文字一行显示的表格



```css
.inline-table{
    display:inline-table;
    width:128px;
    margin-left:10px;
    border:1px solid #cad5eb
}
```

![image](http://pc838vczo.bkt.clouddn.com/IMG_2023.PNG)


## 3.2 width:auto
四种不同的宽度表现
1. 充分利用可用空间  div p这些默认100%父级容器
1. 收缩与包裹。 比如浮动 绝对定位 inline-block元素
1. 收缩到最小  table-layout为auto表格；
2. 超出容器限制：除非有明确的width设置，否则上面3种情况都不会出现超过父级容器，除非white-space：nowarp的内联元素

css世界中盒子分内在盒子和外在盒子；显示也分内在显示和外在显示；尺寸也分内部尺寸和外部尺寸
外部尺寸与流体特效；
1正常的流宽度
例如 

```css
a{
      display：block；（内联inline 转block）
      width：100%      （多余了没必要写）
}

```

2.格式化宽度
格式化宽度出现在绝对定位模型中。
例如

```css
div{
    position:absolute;
    left:20px;
    right:20px;
}
```
假设div最近的具有定位特性的祖先元素宽度为1000px;则这个div元素宽度则为960px



> 所谓流动性：并不是看上去宽度100&显示那么简单；而是一种margin/padding/border/connent 内容区域自动分配水平空间的机制；

内部尺寸与流体性；
对于一个元素如果里面没有内容，宽度为0，那么就应用了“内部尺寸”
对于一个元素如果display值为inline-block 那么即使其里面的内容再多，只要是正常的文本，宽度也不会超过容器；

比如：按钮是css世界上既具有代表性的inline-block特性的元素；
> 按钮文字越多宽度越长，文字足够多则换行
> input标签的按钮 默认是white-space：pre 是不会换行的，需要pre改成normal


3.最大宽度
最大的连续内联盒子的宽度
比如

```css
<div>
  "我是文本"
   <span>我在inline标签内</span>
   <button>我是按钮</button>
   <img src='' alt='12'/>
   <br/>
   "我是下一行"
   <p>我是一段描述</p>
</div>

```
在最大宽度模型下，最后一个宽度是第一个连续内联盒子的宽度；


width值作用细节
css流体布局下的宽度分离原则
嵌套一层标签，子元素因为width使用默认的auto；所以会填满整个父容器；


改变width/height作用细节的box-sizing；
box-sizing：盒尺寸；



## 3.3 height:auto
## 3.4 内联元素


幽灵空白节点是内联盒模型中一个非常重要的概念

存在的前提：文档声明必须是html5的；

```css
<!document html>
<html>
我们可以举一个简单的例子
div{
    background-color：#cd0000；
    
}

span{
    display：inline-block
}

<div><span></span></div>

```
![image](http://pc838vczo.bkt.clouddn.com/%E5%B9%BD%E7%81%B5%E7%A9%BA%E7%99%BD.png)





结果div的高度不是0  是18？





