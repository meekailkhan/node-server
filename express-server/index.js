const express = require("express");
const app = express();
// const stringify = require("querystring");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => {
        console.log("mongodb connected successfully")
    }).catch((err) => {
        console.log("mongo error", err);
    })  


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    }
},
    {timestamp : true}
)

const User = mongoose.model("user", userSchema)

app.use((req, res, next) => {
    let timestamp = Date.now();
    let date = new Date(timestamp).toString()
    let userData = {
        "Date": date,
        "IPadd": req.ip,
        "Method": req.method
    }
    fs.appendFile('./log.txt', `${date}\n${req.ip}\n${req.method}\n`, (err, data) => {
        next()
    })
})


// for mobile
app.get("/users", async(req, res) => {
    const user = await User.find({})
    const html = `
    <ul>
      ${user.map((item) => `<li>${item.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})
// for browser
app.get("/api/users", async(req, res) => {
    const user = await User.find({});
    return res.status(200).json(user)
})



app.route("/api/users/:id").get( async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send({ err: "User Not Found" })
    return res.json(user);
}).patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{last_name:"changed"})
    return res.status(201).json( {message : "update successfully"})
}).delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({message : "deleted successfully"})
})


app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).send({ message: "All field are required" })
    }
        

    // Write the updated data back to the MOCK_DATA.json file
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,      
        gender: body.gende
    })

    res.status(201).json({ msg: 'user created' })
});





app.listen(PORT, () => { console.log(`listing port at ${PORT}`) })