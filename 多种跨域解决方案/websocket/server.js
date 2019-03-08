let express = require('express');
let app       = express();
let WebSocket = require('ws');
let wss       = new WebSocket.Server({port:3000});

wss.on('connection',function(ws) {
   ws.on('message',function(data){
      console.log(data)
      //发送
      ws.send('接受到消息了哈哈')
   })
})

