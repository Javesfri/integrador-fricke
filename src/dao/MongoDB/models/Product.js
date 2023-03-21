import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import mongoose,{Schema} from "mongoose";

let model;


if(mongoose.models['products']){
    model=mongoose.models['products']
}
else{
    const productSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required:true,
        }, 
        code: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        }
    })
    model= mongoose.model('products',productSchema)
}



export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, model)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}