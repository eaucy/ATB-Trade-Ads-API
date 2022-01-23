const app=require("express")()
const fetch=require("node-fetch")
var send_data={"trade_ads":[]}

  fetch("https://www.rolimons.com/tradeadsapi/getrecentads", {
                headers: {}
              }).then(res => res.json()).then(res => {
  var truedata={"trade_ads":[]}
  res.trade_ads.forEach(x=>{
    var add=[]
    add.push(x[0])
    add.push(x[1])
    add.push(x[2])
    add.push(x[3])
    add.push(x[4].items)
    var a=(x[5].items || []);
    (x[5].tags||[]).forEach(tag=>{
      a.push(tag)
    })
    add.push(a)
    truedata.trade_ads.push(add)
  })
  send_data=truedata
              })
setInterval(function(){
  fetch("https://www.rolimons.com/tradeadsapi/getrecentads", {
                headers: {}
              }).then(res => res.json()).then(res => {
                
  var truedata={"trade_ads":[]}
  res.trade_ads.forEach(x=>{
    var add=[]
    add.push(x[0])
    add.push(x[1])
    add.push(x[2])
    add.push(x[3])
    add.push(x[4].items)
    var a=(x[5].items || []);
    (x[5].tags||[]).forEach(tag=>{
      a.push(tag)
    })
    add.push(a)
    truedata.trade_ads.push(add)
  })
  send_data=truedata
              })
},15000)
inc=1
app.get("",(req,res)=>{
  console.log(inc)
  inc=inc+1

         res.send(send_data)
})

app.listen(3000)