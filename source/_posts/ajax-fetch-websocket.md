---
title: 'ajax,fetch,websocket(7.18日补充JSONP)'
date: 2019-04-03 14:17:20
tags: [服务端]
---
### Ajax
#### AJAX状态值与状态码区别
>AJAX状态值是指，运行AJAX所经历过的几种状态，无论访问是否成功都将响应的步骤，可以理解成为AJAX运行步骤。如：正在发送，正在响应等，由AJAX对象与服务器交互时所得；使用“ajax.readyState”获得。（由数字1~4单位数字组成）

>AJAX状态码是指，无论AJAX访问是否成功，由HTTP协议根据所提交的信息，服务器所返回的HTTP头信息代码，该信息使用“ajax.status”所获得；（由数字1XX,2XX三位数字组成，详细查看RFC）
这就是我们在使用AJAX时为什么采用下面的方式判断所获得的信息是否正确的原因。

#### Ajax写法
```js
//举个例子,原生写法
//如果是post请求，json数据写在send()
 let ajax=new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:8080/a', true);
        ajax.send();
        ajax.onreadystatechange=function (){
          if(ajax.readyState==4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status==304){
              alert('成功');
              let json=JSON.parse(ajax.responseText);
              console.log(json);
            }else{
              alert('失败');
            }
          }
        };
```
```js
//JQ的写法
//url,type,data必备，dataType默认是json，
//如果是发送jsonp数据，额外加一个jsonp:"cb"，值是回调函数的名字
//
	$.ajax({
			url:"http://xxxx",
			type:'post'
			data:{wd:'xxx'},
			dataType:'text/json/jsonp',
			jsonp:'cb'
		}).then(({s}) => {
				//成功执行函数
		} , res =>{
		    //失败执行函数
		})
```
#### AJAX运行步骤与状态值说明
>在AJAX实际运行当中，对于访问XMLHttpRequest（XHR）时并不是一次完成的，而是分别经历了多种状态后取得的结果，对于这种状态在AJAX中共有5种，分别是。
- 0 - (未初始化)还没有调用send()方法
- 1 - (载入)已调用send()方法，正在发送请求
- 2 - (载入完成)send()方法执行完成，
- 3 - (交互)正在解析响应内容
- 4 - (完成)响应内容解析完成，可以在客户端调用了
对于上面的状态，其中“0”状态是在定义后自动具有的状态值，而对于成功访问的状态（得到信息）我们大多数采用“4”进行判断。

 
#### AJAX状态码(经常说的服务器status)说明
+ 1**：请求收到，继续处理
+ 2**：操作成功收到，分析、接受
+ 3**：完成此请求必须进一步处理
+ 4**：请求包含一个错误语法或不能完成
- 5**：服务器执行一个完全有效请求失败
- 100——客户必须继续发出请求



### fetch使用
1、 先获取 let res = await fetch('xxxx.jpg')<br> 
2、 再解析 await res.text()/json()/blob() 
```js
//一个栗子
//如果是fetch一个二进制文件，res.blob()之后要用 URL.createObjectURL生成一个url才能用
window.onload= function () {
            let oBtn = document.getElementById('btn1');
			let img1 = document.getElementById('img1')
            oBtn.onclick = async function(){
                let res = await fetch('./1.jpg')
                let data = await res.blob(res)
                let url = URL.createObjectURL(data)
                img1.src = url;
            }
        }
```


### Ajax2.0
<i>主要是formdata的使用</i>
```js
1、//原生js获取表单元素传入 
let oForm=document.querySelector('#form1');
let formdata=new FormData(oForm);

2、 //jq获取表单元素传入
 $('#form1').on('submit', function (){
    let formdata=new FormData(this);

    $.ajax({
      url: this.action,
      type: this.method,
      data: formdata,
      processData: false,//取消jq默认的数据格式转换
      contentType: false
    }).then(res=>{
      alert('成功');
    }, res=>{
      alert('失败');
    });

3、//生成一个空的FormData对象,用append('key','value')
let formdata = new FormData();
formdata.append('xxx',xxxx)

```



### Websocket
#### 使用socket.io库实现简单的连接
```js
//服务端
const http=require('http');
const io=require('socket.io');

//1.建立普通http
let server=http.createServer((req, res)=>{});
server.listen(8080);

//2.建立ws
let wsServer=io.listen(server);
wsServer.on('connection', sock=>{
  //sock.emit('name', 数据)
  //sock.on('name', function (数据){});

  setInterval(function (){
    sock.emit('timer', new Date().getTime());
  }, 1000);
});

```

```js
//客户端
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="http://localhost:8080/socket.io/socket.io.js" charset="utf-8"></script>
    <script>
    let sock=io.connect('ws://localhost:8080/');
    sock.on('timer', time=>{
      console.slog(time);
    });

    </script>
  </head>
  <body>

  </body>
</html>

```


### JSONP
#### JSON的产生

ajax请求会有跨域的问题，而web页面调用js文件不存在跨域问题，并且带有src属性的标签具有跨域能力。
于是就想到了在获取服务端数据的时候，服务端把要返回的数据放在一个js格式的文件里面，客户端调用
恰巧JSON这种字符串数据格式不仅常用来描述数据，而且被js原生支持
于是最后的方案就是客户端调用服务端的JSON文件，服务器要动态生成JSON文件才能把客户端需要的数据装入
这种方式就是JSONP，一种非正式的传输协议
```js
客户端html代码
<html>
<head>
    <title></title>
    <script type="text/javascript">
    // 得到航班信息查询结果后的回调函数
    var flightHandler = function(data){
        alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
    };
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
    var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script); 
    </script>
</head>
<body>
 
</body>
</html>

服务端对应文件有一个同名的方法,需要返回的数据作为该方法参数填进来
flightHandler({
    "code": "CA1998",
    "price": 1780,
    "tickets": 5
});
```
如果用jq实现，上文jq章节也有简单提到特殊的参数jsonp，再举个栗子

```js
 $.ajax({
             type: "get",
             async: false,
             url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 alert('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
             },
             error: function(){
                 alert('fail');

```
