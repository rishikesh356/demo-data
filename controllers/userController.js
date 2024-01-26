const User = require('../models/User');
async function addUser (req, res){
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
async function getUsers(req,res){
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
async function getUserbyId(req,res){
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
async function editUser(req,res){
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          req.body,
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
async function deleteUser(req,res){
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
module.exports=addUser;
module.exports=getUsers;
module.exports=getUserbyId;
module.exports=editUser;
module.exports=deleteUser;
