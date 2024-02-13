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
        unique:true                                           //if repeats the data is not added in mongodb ,duplicate
    },
    password:{
        type:String,
        require:true                                          //without this field it can't execute,shows error
    },
    userName:{
        type:String,
        require:true
    }

},{versionKey:false})                                         //version will not show in data field

const Users=mongoose.model('userDetails',userSchema)

module.exports={Restaurants,Users}