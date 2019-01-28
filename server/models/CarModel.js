
const mongoose  = require('mongoose') ; // ORM

/** car schema  */
const carSchema = new mongoose.Schema({
   address:  {
       type: String
   }, 
   coordinates:{
       type: [Number]
   } , 
   engineType:{
       type: String
   } ,
   exterior:{
       type : String
   }, 
   fuel: {
       type:Number
   }, 
   interior:{
       type: String 
   }, 
   name: {
       type: String
   } , 
   vin: {
       type : String
   }

}); 

const Car  = mongoose.model('car' , carSchema) ; 
module.exports = Car ; 