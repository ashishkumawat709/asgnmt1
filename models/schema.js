const mongoose = require ('mongoose')
const Validator = require('Validator')
const validator = require('validator')

const personSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        validate(value){
            if(value.toString().length<10){ throw new Error('must be of length 10')}
        }
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        },
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },     
    loginID:{
        type:String,
        required:true,
         validate(value){
            if (!validator.isLength(value, {min: 8}))  { throw new Error('must be alpha num of 8 char')}
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value,{minLowercase: 2, minUppercase: 2, minNumbers: 1, minSymbols: 1})){throw new Error('password must be strong')}                                          
        }
    },
    creationTime:{
        type:Date,
        default:Date.now, 
        required:true
    },
    lastUpdated:{
        type:Date,
        default:Date.now,
        required:true
    },
})

const personModel = new mongoose.model('personModel', personSchema)

module.exports = personModel