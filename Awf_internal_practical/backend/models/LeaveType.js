const mongoose=require('mongoose');
const schema=new mongoose.Schema({name:{type:String,required:true,enum:['Casual','Sick','Earned','CompOff']},maxDaysPerYear:{type:Number,required:true}});
module.exports=mongoose.model('LeaveType',schema);
