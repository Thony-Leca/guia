//Importar todas las librerias necesarias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const articulosRouter = require("./routes/articulos");
//Determinamos el puerto del EndPoint
const PORT = process.env.PORT || 10801;

//Obtenemos la libreria controlador del Archivo
const FileSync = require("lowdb/adapters/FileSync");

//Creamos el archivo db.json
const adapter = new FileSync("db.json");
const db = low(adapter);

//Inicializamos el BD
db.defaults({ articulos: [] }).write();

const app = express(); //Creamos el aplicativo
const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"Librerias APIs - CERTUS",
            version: "1.0.0",
            description:"Demo de Librerias de Ventas API",
        },
        servers: [
            {
                url: "hhtp://localhost:" + PORT,
            },
        ],   
    },
    apis: ["./roters/*.js"],
};

const specs =swaggerJsDoc(options); //Agregar el formato swagger

/* const app = express(); */ //Creamos el aplicativo

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); //Se habilita el EndPoint    

app.db = db; //Definimos el DB


//Definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/articulos", articulosRouter)
//Mostramos el log de ejecucion del servidor
app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));


 