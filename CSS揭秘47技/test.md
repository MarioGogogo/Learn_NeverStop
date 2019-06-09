# 菱形
主要思路与平行四边形的一个解决方法一致。

```css
  .pic{
             width: 280px;
             transform: rotate(45deg);
             overflow: hidden;
         }
         .pic >img{
             max-width: 100%;
             transform: rotate(-45deg);
         }
```
![](http://book.52react.cn/20190603231416.png)

但是有问题 在与max-width: 100%;100%会被解析为容器的边长。

如果我们希望要图片宽度与容器的对角线相等，怎么办？

```css
  .pic1{
            width: 280px;
            transform: rotate(45deg);
            overflow: hidden;
            margin-left: 100px;
        }
        .pic1 >img{
            max-width: 100%;
            transform: rotate(-45deg) scale(1.42);
        }
```

1.42 是怎么来的
首先一个正方形的对角线长度 等于它的边长乘以 根号2； 约等于1.414；

max-width: 100%乘以1.414 约等于1.42；

![](http://book.52react.cn/20190603232136.png)

### 更好的方案 裁切路径方法

### 使用svg中的clip-path属性

```css
pic2{
	max-width: 250px;
	margin: 20px;
	-webkit-clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	transition: 1s;
}

pic2:hover {
	-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

使用多边形函数polygon







