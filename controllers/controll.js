import db from '../modles/user.js'

async function allRequestHandler(req, res) {
    switch (req.method) {
        // ==========on get request===========
        case "GET":
            try {
                const id = req.params.id;

                if (id) {
                    const user = await db.User.findById(id);
                    if (!user) {
                        return res.status(404).json({ error: "User not found" });
                    }
                    return res.status(200).json(user);
                } else {
                    const allUsers = await db.User.find({});
                    return res.status(200).json(allUsers);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        // ========= on post request ===========
        case "POST":
            let body = req.body;
            if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
                return res.status(400).json({ error: "All fields are required" });
            }

            try {
                const result = await db.User.create({
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    job_title: body.job_title,
                    gender: body.gender
                });

                console.log(result);
                return res.status(201).json({ msg: "Successfully created" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        //====================on patch request================
        case "PATCH":
            try {
                const body = req.body
                const id = req.params.id;
                const result = await db.User.findByIdAndUpdate(id, {
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    job_title: body.job_title,
                    gender: body.gender
                })
                console.log(result);
                return res.status(204).json({ msg: "update user successfully" })
            } catch (err) {
                return err
            }
        // ============== on delete request ===============
        case "DELETE":
            try {
                const id = req.params.id;
                if (!id) {
                    res.status(400).json({ msg: "id is required for delete user" })
                }
                const result = await db.User.findByIdAndDelete(id);
                if (!result) {
                    res.status(404).json({ msg: "user not found" });
                }
                console.log(result)
                return res.status(200).json({ msg: "delete user successfully" })
            } catch (err) {
                return err
            }
        // if user trying to invalid request then we handle cutomise error usign default
        default:
            return res.status(405).json({ error: "Method Not Allowed" });
    }

}

export default allRequestHandler

// async function getUserById(req, res) {
//     try {
//         const result = await db.User.find({ _id: { $eq: req.params.id } })
//         console.log(result);
//         return res.status(200).json(result)
//     } catch (err) {
//         return err
//     }
// }



// async function getAllUser(req, res) {
//     try {
//         const allUser = await db.User.find({});
//         res.status(200).json(allUser)
//     } catch (err) {
//         return err
//     }
// }




// async function addUser(req, res) {
//     try {
//         let body = req.body;
//         if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
//             return res.status(400).json({ error: 'all fields are required' })
//         }

//         const result = await User.create({
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             job_title: body.job_title,
//             gender: body.gender
//         });

//         console.log(result);
//         return res.status(201).json({ msg: "successfull" })

//     } catch (err) {
//         if (err.code === 11000 && err.keyPattern?.email) {
//             return res.status(400).json({ error: "Email already exists" });
//         }

//         console.error(err);
//         return res.status(500).json({ error: "Something went wrong" });
//     }
// }

// async function updateUser(req, res) {
//     try {
//         const body = req.body
//         const id = req.params.id;
//         const result = await db.User.findByIdAndUpdate(id, {
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             job_title: body.job_title,
//             gender: body.gender
//         })
//         console.log(result);
//         return res.status(204).json({ msg: "update user successfully" })
//     } catch (err) {
//         return err
//     }
// }

// async function deleteUser(req, res) {
//     const { id } = req.params; // Extract the user ID from the route parameter
//     const userId = Number(id) - 1; // Convert the ID to a number (if it's numeric)

//     // Check if the user exists in the users object
//     if (!users[userId]) {
//         return res.status(404).json({ error: "User not found" }); // Return 404 if user doesn't exist
//     }

//     // Delete the user from the users object
//     delete users[userId];

//     // const fileContent = `const users = ${JSON.stringify(users, null, 2)};\n\nexport default users;`

//     // fs.writeFile('./MOCK_DATA.js',fileContent,(error,result)=>{
//     // })

//     return res.json({ status: "User deleted successfully", id: userId }); // Respond with success
// }

