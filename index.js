//1. Importanto el modulo de Node
//http
import http from 'http'; //este es para type: 'module'

import path from 'path'; // para poder usar __dirname y __filename

//este es para type commonjs
//let http = require('http');

/* Usando el scope global */
global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.join(path.basename(new URL(import.meta.url).pathname));

//path.join es para hacerlo multiplataforma y corran en linux y windows

//2. Crear el servidor
//la siguiente constante es el carro listo
const server = http.createServer( ( req, res )=> {
    //Toda la lógica del server
    // 1. Respondiendo al cliente (res)
   /*  res.write("Hello from the server ... \n");
    res.write(`__dirname: ${__dirname} \n`);
    res.write(`__filename: ${__filename} \n`); */

    rrs.setHeader
    res.write("<h1>Revisar la consola del server... </h1>");
    console.log("--------------------------------")

    console.log(`📣 GET - REQUEST: ${req.method} ${req.url}`);
    /* console.log(req) */
    //2. Cerrar la conexión
    res.end();
} ); //const porque no va a cambiar el valor

//3. Arrancando el servidor
/* server.listen( <puerto>, <IP>, <callback>) */
server.listen( 3000, "0.0.0.0", ()=>{
    console.log(" 💘 Servidor Escuchando en http://localhost:3000")
});