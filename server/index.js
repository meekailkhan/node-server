const http = require("http");
const fs = require("fs");
const port = 3000;


const server = http.createServer((req, res) => {
    let timestamp = Date.now();
    let date = new Date(timestamp).toString()


    if (["", "/about", "/contact"].includes(req.url)) {
        
        fs.appendFile('./log.txt', `${date}\n ${req.url}\n`, (err, data) => {
            switch (req.url) {
                case "/": res.end("This Is Home Page");
                    break;
                case "/about": res.end("This Is About Page");
                    break;
                case "/contact": res.end("This Is Contact Page");
                    break;
                default: "404 Not Found"
            }
        })
    } else {
        fs.appendFile('./log.txt', 'direcotry you may access in not found\n', (err, data) => {
            res.end("404 Not Found")
        })
    }
})

server.listen(port, () => console.log(`listening port at ${port}`))