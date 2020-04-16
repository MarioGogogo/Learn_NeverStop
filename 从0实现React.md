## 从0实现React

> 很多新入行的前端开发新手想提高前端技术，进阶必备技术栈绝对绕不开React这座大山，想深入学好 一门框架的最好方式是读源码。市面上会react的前端工程师数不胜数，如何让自己在茫茫人海中脱颖而 出呢?如果能在简历中加 上”对react源码有深入研究”来突出自己个人亮点,那你接到的大厂面试机会 一定很多。网络. 上解读React源码的文章很多，但知识点零散，学习起来抓不住重点，本课程将系统 性的带你从API层面实现React的大部分核心功能，轻松搞定React源码级核心原理。

### 环境部署

安装babel插件  将jsx语法转化js对象(虚拟DOM)

```js
yarn add babel-core babel-preset-env babel-plugin-transform-react-jsx --dev
```

babelrc文件

```js
{
  "presets":["env"] ,
  "plugins": [
    ["transform-react-jsx", {
      "prama": "React.createElement"
    }]
  ]
}
```



### jsx的实现

```js
import React from 'react';
//jsx语法的dom元素
const ele = (
  <div className="active" title="123">
    hello,<span> react</span>
  </div>
);
function createElement(tag,attrs,...childrens){
  // 做其他逻辑
  return {
      tag,
      attrs,
      childrens
  }
}
console.log('ele', ele);

/**
 模拟出以下代码
 var ele = React.createElement("div", {
  cl: true,
  as: true,
  sName: " active",
  title: " 123 "
}, "hello, ", React.createElement("span", null, " react"));
 */
```

![](http://book.52react.cn/20200206170713.png)

我们首先模拟实现下`render`方法.传入参数为`虚拟dom`与`容器节点`,根据虚拟dom的类型做一些验证判断.

```js
ReactDOM.render(<App />, document.getElementById('root'))
```



```js
/**
 * 
 * @param {虚拟dom/root节点} vnode 
 * @param {容器} container 
 */
function  render(vnode,container){
     //判断vnode是否为空
     if (vnode === undefined || vnode === null) return
      //判断vnode是否为字符串
     if (typeof vnode === "string") {
         const textNode = document.createTextNode(vnode)
        return  container.appendChild(textNode)
     }
    //  将虚拟dom转化成真实dom打印到页面中
    const {tag} = vnode
    
    return  container.appendChild(document.createElement(tag))
}
```



分析拟dom转化成真实dom这块逻辑的判断



```js
/**
 *
 * @param {虚拟dom/root节点} vnode
 * @param {容器} container
 */
function render(vnode, container) {
   ..........
  //  将虚拟dom转化成真实dom打印到页面中
  const { tag, attrs } = vnode;
  //创建节点对象
  const dom = document.createElement(tag);
  console.log(attrs);
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      //设置属性值
      setAttribute(dom, key, value);
    });
  }

  //渲染子节点  用递归
  /**
   *   <div>hello,<span>123</span></div>
   */
  vnode.childrens.forEach(child => {
    render(child, dom);
  });

  return container.appendChild(dom);
}

// 对dom中的标签设置属性名   div class="root" or div onclick="add()"
function setAttribute(dom, key, value) {
  //转义class属性
  if (key === "className") {
    key = "class";
  }

  //转义dom事件
  if (/on\w/.test(key)) {
    key = key.toLocaleLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    //例如  div style="xxxx:xxxx" or  stlye={{}}
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      for (const k in value) {
        //  {width:20}
        if (typeof value[k] === "number") {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    //其他属性
    if (key in dom) {
      dom[key] = value || "";
    }
    //更新值
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}
```







