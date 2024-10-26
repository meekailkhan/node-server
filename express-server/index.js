const express = require("express");
const app = express();
const mockData = require('./MOCK_DATA.json')
const fs = require('fs');
// const stringify = require("querystring");
const PORT = 3000;

app.use(express.urlencoded({ extended : false}))

app.use((req,res,next)=>{
    let timestamp = Date.now();
    let date = new Date(timestamp).toString()
    let userData = {
        "Date" : date,
        "IPadd" : req.ip,
        "Method" : req.method
    }
    fs.appendFile('./log.txt',`${date}\n${req.ip}\n${req.method}\n`,(err,data)=>{
        next()
    })
})


// for mobile
app.get("/users",(req,res)=>{
    const html = `
    <ul>
      ${mockData.map((item)=> `<li>${item.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})
// for browser
app.get("/api/users",(req,res)=>{
    res.setHeader("x-name","Meekail")
    return res.json(mockData)
})

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = mockData.find(user => user.id === id);
    return res.json(user);
})


app.post("/api/users", (req, res) => {
    const body = req.body;
    
    
    // Add the new user data with a new ID
    mockData.push({ ...body, id: mockData.length + 1 });

    // Write the updated data back to the MOCK_DATA.json file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(mockData, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ status: "error", message: "Failed to update data" });
        }

        return res.send({ status: "success", message: "Data added successfully" });
    });
});





app.listen(PORT,()=>{console.log(`listing port at ${PORT}`)})