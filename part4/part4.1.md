# 盒尺寸四大家族

盒尺寸的四个盒子contentbox padding border margin


4.1深入理解content
 什么是替换元素
 通过修改某个属性值呈现的内容就可以被替换的元素称为”替换元素“。
 
 比如：
 
```css
<img> <object> <video> <iframe> <textarea> <input>还有<select>
```

 特性：
- [x]  内容的外观不受页面上css的影响
- [x]  有自己的尺寸
- [x]  在很多css属性上有自己的一套规则


注意：所有替换元素都是内联水平元素，但是元素默认的display值不一样；
如图：
![image](http://pc838vczo.bkt.clouddn.com/%E6%9B%BF%E6%8D%A2%E5%85%83%E7%B4%A0display.jpg)


css尺寸特指通过css的width和height或者max-width/max-heigth 设置的尺寸
有三层结构计算规则：

```css
<img src="1.jpg">
```

1.假设1.jpg图片原始尺寸256*192 则此图所显示的宽高也是256*192

2.如果没有css尺寸 使用html尺寸作为最终宽高

```css
<img src="1.jpg" width=“128” height=“96”>
```

3 如果有css尺寸 则最终尺寸由css属性决定

```css
img{
    width：200px；
    height：150px；
}
<img src="1.jpg" width=“128” height=“96”>
```
最终图片宽高200*150


4.如果固有尺寸由宽高比例
```css
img{
    width：200px；
   
}
<img src="1.jpg" >
```
最终图片宽高200*150；


5.如果上面的条件都不符合 则宽高为300*150 （默认）
比如 <video></video>

6.内联元素变成块级元素 尺寸计算规则相同
```css
img{
   display：bolck
   
}
<img src="1.jpg" >
```
还是256*192；


小技巧：
     web开发过程中，图片需要请求；这里<img>没有了src属性，图片就不会请求，高效优化的一种方式；
     
     
我们平时打交道的图片尺寸规则是“默认的宽高设置会覆盖固有高度”，这是被误会的；
```css
div：before{
    content：url（1.jpg）；
    display：block；
    width：200px；
    height：300px；
}

```
css世界中，图片资源的固有尺寸是无法改变的；


我们看的图片并不是css设定的200*200 200仅仅设定了contentbox


在css世界中，<img>和其他替换元素的替换内容适配方式通过object-fit属性修改；

我们可以设置

```css
object-fit：contain

```

则图片保持比例关系；

替换元素和非替换元素只隔了一个src属性
我们把src去掉，<img/>其实就是一个和《span》类似的普通内联标签


基于伪元素图片内容生成技能

```css
img：：after{
    content：attr（alt）；
    position：absolute bottom 0；
    width：100%；
    background-color：rgba（0,0,0，。5）
    transform：translateY（100%）；
    transition：transform .2s;
}

img:hover:after{
    transform:translateY(0);
}

```















