import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = "mongodb://javesfri:coderhouse@ac-s7myrez-shard-00-00.9bhthja.mongodb.net:27017,ac-s7myrez-shard-00-01.9bhthja.mongodb.net:27017,ac-s7myrez-shard-00-02.9bhthja.mongodb.net:27017/?ssl=true&replicaSet=atlas-x8xyi0-shard-0&authSource=admin&retryWrites=true&w=majority"

const messageSchema = new Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}