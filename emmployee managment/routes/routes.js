const express = require('express');
const router = express.Router();
const emp = require('../controller/controll')

router.get('/' ,async(req,res)=>{
    let employees = await emp.find({}) ;
    
    return res.status(200).json(employees)
})

router.get('/:id', async(req,res)=>{
    let employee = await emp.findById(req.params.id)
    res.status(200).json(employee)
})

router.post("/",async(req,res)=>{
    let body = req.body;
    if(!body.emp_name || !body.last_name || !body.email || !body.city || !body.salary){
        return res.json({message : "All Fields Are Required"})
    }

    let checkEmail = await emp.find({email : body.email})
    if(checkEmail.length > 0){
        return res.status(400).json({message : "employee already exist"})
    }
    
    const result = await emp.create({
        emp_name : body.emp_name,
        last_name : body.last_name,
        email : body.email,
        city : body.city,
        salary : body.salary
    });
    return res.status(201).json({message : "Employee Add Successfully"});
});

router.delete('/:id', async(req,res)=>{
    let result = await emp.findByIdAndDelete(req.params.id);
    return res.status(204).json({message : "Employee Deleted Successfully"})
})

module.exports = router