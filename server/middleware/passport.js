// const {User} = require('../models/user');
// const mongoose = require('mongoose');

// module.exports = async (req, res, next) => {
//     let user = await User.findOne({username: req.body.username}, async (err, user) => {
//         if (user)  {
//             let result = await user.authenticate(req.body.password);
//             if (!result.user) {
//                 res.send(result.error.message)
//             } else {
//                 res.send("Successfully logged in!")
//             }
//         }  else {
//             res.send("No User found with the given UserID")
//         }
//     });
// }