---
title: nodemailer使用回顾
date: 2018-09-17 22:28:58
tags: [Node]
categories: 
- 后端
- Node
cover: https://picsum.photos/seed/20180917/500/300
thumbnail: https://picsum.photos/seed/20180917/500/300
toc: true
---
在写affair的使用有一个发送邮件的需求，使用到了nodemailer这个库
<!-- more -->
```js
var transporter=nodemailer.createTransport({//设置邮件传输
   // service: 'qq', service和host二选一，写法不同
    host:"smtp.qq.com", //设置服务，可以换成smtp.163.com
    secureConnection:true, //是否使用TLS，如果是true端口为465，否则为其他端口或者568
    port:465,          //SMTP端口
    auth:{ 
        user:"706608189@qq.com", //发送人邮箱 
        pass:"xxxxxx"//我的授权码czvbqzqd
    }
});

var sendEmail = function(mail,msg,cb){
 var mailOption={
        from:"xxxxxx@qq.com",//发件人邮箱
        to:mail//收件人邮箱，例如req.body.email,
        subject:"注册校验码"//邮件标题
        html: 'msg'//邮件内容
    };

  transporter.sendMail(mailOption,function(error,info){
        cb(error,info); 
        // if(error){
        //     res.json({code:400}) ;//发送未成功
        //     return console.info(error);
        // }else{
        //     res.json({code:200}) ;//发送成功
        //     console.info("Message send");
        // }
    })
}
module.exports={
    sendEmail:sendEmail
}
//nbywbfdd
```