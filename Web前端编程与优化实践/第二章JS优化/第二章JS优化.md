# 第二章JS优化


## 减少前端代码耦合
什么是代码耦合？

> 表现是改了一点毛发而牵动全身，或者是想改的东西，需要一堆代码里找半天




## 避免全局变量

```javascript
<script>
var PAGE =2;
</script>
<script src="mian.js"></script>

```

需要数据写在页面上可以form表单


```javascript
<form action="">
    <input type="hidden" name="page" value="2">
    <textarea name="list" style="display:none">[{"username":"yin"},{}]</textarea>
</form>

```

## JS.CSS.HTML的耦合

比如页面滑到下面灰色的条再继续往下滑，灰色条就要吸顶状态

很多人写

```javascript
$('.bar').css({
    position:fixed;
    top:0;
    left:0;
}
)

//继续往上滑动则取消fixed
$('.bar').css({
    position:static;
})

```

- [x] 不推荐上面的写法；
- [x] 其实可以通过增删类来控制样式；


```javascript
//增加fixed
$('.bar').addclass('fixed');
//取消fixed
$('.bar').removeclass('fixed');


//fixed的样式初始
.bar.fixed{
    position:fixed;
    left:0;
    top:0;
}

```

## 和耦合相对的内聚；上面是高内聚？？

> 如果一个模块的职责功能十分紧密；不可分割那么就是高内聚；


###  减少重复代码


```javascript
  //前一个方法
  $('#search').on("click",function(){
          var formData = getFormData();
          $.ajax({
              url:'./search',
              data:formData,
              success:function(data){
                  showResult(data);
              }

          })
      })
      
      
      //后一个方法
      $('#search').on("click",function(){
          //用户的搜索条件展示进行变化
          changInputFilterShow();
          var formData = getFormData();
          $.ajax({
              url:'./search',
              data:formData,
              success:function(data){
                  showResult(data);
              }

          })
      })

```

重复代码太多，把发请求处理分离成一个函数？

![mark](http://pc838vczo.bkt.clouddn.com/book/180803/hCjddI0hFL.png)

```javascript
function getAndShowData() {
            var formData = getFormData();
            $.ajax({
                url: './search',
                data: formData,
                success: function (data) {
                    showResult(data);
                }

            })
        }


$('#search').on("click", getAndShowData)
$('#search').on("click", function () {
    //用户的搜索条件展示进行变化
    changInputFilterShow();
    getAndShowData();

})

```

`明天继续拆解getAndShowData`















