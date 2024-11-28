const fs = require('fs');

let count = 0

function reqResLog(fileName) {
    return (req, res, next) => {
        count++
        let timestamp = Date.now();
        let date = new Date(timestamp).toString()
        fs.appendFile(fileName,`req.No.${count}.${date} ${req.ip} ${req.method}\n`,(err,data)=>{
            next()
        });
       
    }
}

module.exports = {
    reqResLog
}