const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const{Restaurants,Users}=require('./schema.cjs')

const app=express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://yuvasri_310:yuva125@cluster0.1pu1eh9.mongodb.net/swiggy?retryWrites=true&w=majority')
        console.log('connection established')
        const port=process.env.PORT||8000
        app.listen(port,function(){
            console.log('listening')
})
    }catch(error){
        console.log('cant connect to database')
    }
}connectToDb()

app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurants.create({
            "areaName":request.body.areaName,
            "avgRating":request.body.avgRating,
            "costForTwo":request.body.costForTwo,
            "cuisines":request.body.cuisines,
            "name":request.body.name
        })
        response.status(201).json({
            "status" : "success",
            "message":"restaurant added"
        })
    }catch(error){
        response.status(500).json({
            "messsage":"restaurant details unsuccessfull",
            "status":"failure"
        })
    }
})

app.get('/get-restaurantdetails',async function(request,response){
    try{
        const restaurantDetails=await Restaurants.find()
        response.json(restaurantDetails)
    }catch(error)
    {
        response.status(500).json({
            "message":"details cant be fetched",
            "error":error
        })
    }
})
app.post('/create-new-user',async function (request,response){
    try {
        await Users.create({
            "contact":request.body.contact,
            "email" : request.body.email,
            "password" : request.body.password,
            "userName" : request.body.userName,
        })
        response.status(201).json({
        "status" : "success",
        "message":"user added successfully"
        })
   } catch(error) {
        response.status(500).json({
            "status":"failure",
            "message" : "user not created"
        })
   }
})

app.post('/validate-user',async function(request,response){
    try {
        const user=await Users.findOne({
            "email" : request.body.email,
            "password" : request.body.password
        })
        if(user){
        response.status(200).json({
           "message" : "valid user"
        })
   } else {
        response.status(401).json({
            "message":"invalid user"
        })
   }
}catch(error){
    response.status(500).json({
    "message":"internal server error"
     })
  }
})