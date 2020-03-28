# Fetch异步中止

## 为什么要异步中止

用户在二次选择城市操作中，引发了2次API请求，最后的结果是哪个请求先返回呢？

会不会看见城市选择广州，天气信息确实上海的情况



## 如何解决

要解决显示不一致的问题，

一种方法是在视图做文章，比如当我第一个请求发出去，立即将城市选择器锁住，设为不可改变

一种方法是发出API请求的时候，将之前的api请求全部中止作废，这样就保证了获得有效结果绝对是用户最后一次的选择结果

但是fetch不支持 取消请求

例如jq中

```js
const xhr = $.ajax(...)
xhr.abort() //取消掉已经发出的ajax请求
```



## 技 巧

有一个技巧可以解决这个问题，只需要修改action的构造函数

```js
let nextSqId =0
export const fetchWeather = (cityCode)=> {
    return (dispatch) => {
        const apiUrl = "xxxx./xxx.html"
        const sqeId = ++nextSqId
        const dispatchIfVaid = (aciton) => {
            if (sqeId === nextSqId) {
                return dispatch(action)
            }
        }
    }
    dispatchIfVaid(fetchWeatherStarted())
    fetch(apiUrl).then(response=>{
        if(status !== 200){
            throw new Error('error')
        }
        response.json().then(res=>{
            dispatchIfVaid(FetchWeatchsuccess(weatchInfo))
        })
    })
}
```



nextSqId变量，是一个递增的整数，给每一个API的请求做序列编号

fetch开始之前，先给nextSqId自增，然后赋值给一个局部变量seqid，这个值就是一次异步请求的编号

随后fetchWeather还会被调用，nextSqid还是会自增，新的异步请求分配给了seqId

dispatchIfVaid检测函数判断当前环境下的sqid是否等于全局环境下的nextSqid，如果相等说明fetchWeather没有被再次调用；继续调用dispatch函数，如果不相等说明这期间有新的fetchWeather被调用，当前seqid已经过期了，

直接丢掉，不需要任何dispatch



虽然不能真正的“中止”一个请求，但我们可以通过这种方法来让API请求的结果被忽视，达到中止一个Api请求的效果

