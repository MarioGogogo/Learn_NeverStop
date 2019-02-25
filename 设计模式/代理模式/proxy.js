//某个明星
let star = {
    name : "王富贵",
    age  : 18,
    phone: '13084920234'
}

//经纪人
let agent = new Proxy(star,{
   get: function (target,key) {
      if(key === "phone"){
         return  '经纪人phone：1233423423'
      }
      if(key === "price"){
         return '明星出场价：120000'
      }
      return target[key]
   },
   set: function(target,key,val){
      if(key === "customPrice"){
         if(val < 100000){
            //最低10w
            throw new Error('价格不低于10w')
         }else{
            target[key] = val;
            return true
         }
      }
   }
})

console.log(agent.phone);
console.log(agent.price);
console.log(agent.age);
console.log(agent.name);
agent.customPrice = 9000;
console.log(agent.customPrice);








