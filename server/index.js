const http = require("http");
const fs = require("fs");
const url = require("url")
const port = 3000;


const server = http.createServer((req, res) => {
    let timestamp = Date.now();
    let date = new Date(timestamp).toString()
    const myUrl = url.parse(req.url,true);
    console.log(myUrl)


    fs.appendFile('./log.txt', `request dedicated by ${myUrl.query.myName} on ${date}\n ${req.url}\n`, (err, data) => {
        if(req.url === "/favicon.ico") {return res.end()}
        switch (myUrl.pathname) {
            case "/": 
                res.end("This Is Home Page");
                break;
            case "/about": 
                const username = myUrl.query.myName
                const userId = myUrl.query.myId
                res.end(`user name is ${username} and id is ${userId}`);
                break;
            case "/contact": 
                res.end("This Is Contact Page");
                break;
            default: 
                res.statusCode = 404;  // Set the response status code to 404
                res.end("404 Not Found");  // End the response with a message
        }
        // if(myUrl.pathname === "/"){
        //     res.end("This Is Home Page");
        // }else if(myUrl.pathname === "/about"){
        //     if(myUrl.query.myName){
        //         return res.end(`hello ${myUrl.query.myName}`)
        //     }
        //     return res.end("This Is About Page")
        // }
        // if(myUrl.query.myName){
        //     res.end(myUrl.query.myName)
        // }
    })

})

server.listen(port, () => console.log(`listening port at ${port}`))