
// requires 
const express  = require('express') ;
// get express router 
const router   = express.Router(); 
const Car = require('../models/CarModel') ;


// get request for our fleet service 
router.get('/api/cars',(req, res)=>{
     console.log('hitting the get request') ;
     Car.find({}).then((cars)=>{
         console.log(cars.length);
         res.send(cars);
     }).catch((e)=>{
         res.send(e) ; 
     }) ; 
}); 




// post endpoint 
router.post('/api/cars',(req , res)=>{
    Car.create(req.body).then((insertedCar)=>{
        res.send(insertedCar);
    }).catch((error)=>{
        res.sendDate(error) ; 
    });
}) ; 


// exporting the router 
module.exports = router;  