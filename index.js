//1. Importanto el modulo de Node
//http
import http from 'http';

//2. Crear el servidor
//la siguiente constante es el carro listo
const server = http.createServer( ( req, res )=> {
    //Toda la lógica del server
    // 1. Respondiendo al cliente (res)
    res.write("Hello from the server ...");
    //2. Cerrar la conexión
    res.end();
} ); //const porque no va a cambiar el valor

//3. Arrancando el servidor
/* server.listen( <puerto>, <IP>, <callback>) */
server.listen( 3000, "0.0.0.0", ()=>{
    console.log(" 💘 Servidor Escuchando en http://localhost:3000")
});