let express = require('express');
let app = express();
//白名单
let whitelist = ['http://localhost:3000']
app.use(function(req,res,next){
  console.log(req.headers);
   let origin = req.headers.origin;
   if(whitelist.includes(origin)){
     //设置哪个源可以访问我
    //  res.setHeader("Access-Control-Allow-Origin", '*'); //任务接口
     res.setHeader("Access-Control-Allow-Origin", '*'); //任务接口
     res.setHeader("Access-Control-Allow-Origin", origin);
     //设置哪个头访问我
     res.setHeader('Access-Control-Allow-Headers','name');
      //允许哪个方法访问我
      res.setHeader('Access-Control-Allow-Methods','PUT');
      // 允许携带cookie (如果Allow-Origin带*号就不能设置这个)
      res.setHeader('Access-Control-Allow-Credentials',true);
      // 预检存活时间
      res.setHeader('Access-Control-Max-Age', 6);
      // 允许前端获取某个头(返回的头)
      res.setHeader('Access-Control-Expose-Headers', 'name');
     if (req.method === "OPTIONS") {
        res.end(); //PUT请求不做任何处理
     }
   }
   next();
})
app.get('/getData', function (req, res) {
  res.setHeader('name','chan') //返回某个头
  res.end('you get 4000')
})
app.put('/getData',function(req,res) {
  res.end('you look 4000')
})

app.listen('4000');
console.log('启动4000');
