const mongoose = require('mongoose');
 
 const User = mongoose.model('User');
 
 /**
  * Gets all users from the database
  */
 exports.users = (req, res) => {
   if (req.user && req.user._id) {
     const query = req.params.email || '';
     User.find({ email: { $regex: query } }).limit(8)
       .exec((err, result) => {
         if (err) {
           return res.json(err);
         } else if (!result) {
           
           return res.status(404).send('No data found');
         }
         res.json(result);
       });
   }
 };