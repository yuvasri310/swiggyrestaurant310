const mongoose=require("mongoose")
const RestaurantsSchema=new mongoose.Schema({
    areaName:{
        type:String,
    },
    avgRating:{
        type:Number,
    },
    costForTwo:{
        type:String,
    },
    cuisines:{
        type:Array,
    },
    name:{
        type:String,
    }
})
const Restaurants=mongoose.model('RestaurantsList',RestaurantsSchema)

const userSchema =new mongoose.Schema({
    contact:{
        type:String
    },
    email:{
        type:String,
        require:true,
        unique:true                                          
    },
    password:{
        type:String,
        require:true                                          
    },
    userName:{
        type:String,
        require:true
    }

},{versionKey:false})                                         

const Users=mongoose.model('userDetails',userSchema)

module.exports={Restaurants,Users}