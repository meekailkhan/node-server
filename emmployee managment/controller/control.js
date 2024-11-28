const emp = require('../models/controll')

async function handleGetAllEmploye(req, res) {
    let employees = await emp.find({});

    return res.status(200).json(employees)
}


async function handleGetEmployeById(req, res) {
    try{
        let employee = await emp.findById(req.params.id)
        res.status(200).json(employee)
    }catch(err){
        res.status(400).json( {err : "employe does not exist"})
    }
}

async function handleAddEmploye(req, res) {
    let body = req.body;
    try{
        const result = await emp.create({
            emp_name: body.emp_name,
            last_name: body.last_name,
            email: body.email,
            city: body.city,
            salary: body.salary
        });
        return res.status(201).json({ message: "Employee Add Successfully", id : result._id });
    }catch(err){
        return res.status(400).json({ message: "employee already exist" })
    }

    


}

async function handleRemoveEmploye(req, res) {
    let checkEmploye = await emp.findById(req.params.id);
    if (checkEmploye == null) {
        return res.status(400).json({ message: "employe does not exits" })
    }
    let result = await emp.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Employee Deleted Successfully" })

}


module.exports = {
    handleGetAllEmploye,
    handleGetEmployeById,
    handleAddEmploye,
    handleRemoveEmploye
}