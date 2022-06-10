const http = require('http');
const fs = require('fs');
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');

//app config
// app.use(bodyparser.json());
// app.use(urlencoded({extended:true}));


let home = fs.readFileSync('../client/index.html');
fs.watch('../client/index.html',(err,data)=>{
    if(err){
        console.log(err.message);
    }
    console.log(data);
    home = fs.readFileSync(`../client/${data}`);
})
let post = fs.readFileSync('../client/post.html');
fs.watch('../client/post.html',(err,data)=>{
    if(err){
        console.log(err.message);
    }
    post = fs.readFileSync(`../client/${data}`);
})
// console.log(post.toString());

http.createServer((req,res)=>{

    res.statusCode = 200;
    res.setHeader('content-type','text/html');
    console.log(req.url);
    const url = req.url;
    if(url=='/home'){
        res.end(home);
    }else if(url=='/post'){
        res.end(post);
    }else{
        res.statusCode=404;
        res.end("<h1>not found</h1>");
    }

}).listen(3000,()=>
console.log("server running on port 3000"));
