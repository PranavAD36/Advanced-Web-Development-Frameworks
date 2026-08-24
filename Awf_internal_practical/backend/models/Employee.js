const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true},password:{type:String,required:true},department:{type:String,required:true},designation:{type:String,required:true},role:{type:String,enum:['employee','manager','hr'],default:'employee'},leaveBalance:{type:Number,default:20,min:0}});
module.exports=mongoose.model('Employee',employeeSchema);
