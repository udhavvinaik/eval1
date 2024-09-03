const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{type: 'string', required: true},
    email:{type: 'string', required: true,unique: true},
    password:{type: 'string', required: true}
})
const UserModel = mongoose.model('user',userSchema);
module.exports ={UserModel};