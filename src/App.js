import "dotenv/config"
import express from "express";
import { __dirname, __filename } from "./path.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import realTimeProducts from "./routes/realTimeProducts.routes.js";
import routerSocket  from "./routes/socket.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import {Server} from "socket.io"
import fs from "fs";
import { getManagerMessages } from "./dao/daoManager.js";


const app = express();
const PORT = 8080;

const server =app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});

//ServerIO
const io=new Server(server)

const content = await fs.promises.readFile('src/models/productos.txt', "utf-8");
const productos = JSON.parse(content);

io.on("connection", (socket) =>{ //io.on cuando se establece conexion 
  console.log("Cliente Conectado")
  socket.emit("productos",productos)
  socket.on("producto", prod =>{
    console.log(prod)
    productos.push(prod)
    io.emit("productos",productos)
  })
  socket.on("message", async (info) =>{
    const data= await getManagerMessages()
    const managerMessage = new data.ManagerMessageMongoDB
    managerMessage.addElements([info]).then(() =>{
      managerMessage.getElements().then((messages) =>{
        console.log(messages);
        socket.emit("allMessages", messages)
      })
    })
  })


})



//HBS
app.get("/",  (req, res) => {
  res.render("home", {
    productos
  });
});



//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use("/static", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use("/realtimeproducts",realTimeProducts);
app.use("/chat",routerSocket)



