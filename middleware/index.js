import fs from 'fs';

function logReqRes(fileName){
    return (req, res, next)=>{
        fs.appendFile(
            fileName,
            `\n${new Date(Date.now())} \n: ${req.ip}\n: ${req.method}\n: ${req.path}\n------------------------------------------------------------------------\n `,
            (err,date)=>{
                next()
            }
        )
    }
}

export default logReqRes