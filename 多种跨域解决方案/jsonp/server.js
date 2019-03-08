let express  = require('express');
let app = express();

app.get('/say',function(req,res) {
  let {wd,cb} = req.query;
  console.log(wd,cb);
  res.end({
    data: 0,
    msg : 'hello'
  })
})

app.listen('3000');
console.log('启动');
