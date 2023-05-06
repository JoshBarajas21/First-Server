import http from 'http';
import path from "path";
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer( async(req, res)=>{
    //Destrucuración del "req"
    let { url, method } = req;

    console.log(`📣 Client-Request: ${req.url} ${req.method}`);

    //Enrutando peticiones con una estructura Switch
    switch(url){
        case '/': 
            //Será la petición raiz

            //Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html'); //Se le dice al servidor que res.write lo pueda interpretar como html
            res.write(`
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset=UTF-8>
                <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                <title>My App</title>
                <style>
                    body {
                    background-color: #ECF0F1;
                    font-family: Arial, sans-serif;
                    }
                    h1, h2 {
                    color: #3498DB;
                    text-align: center;
                    margin-top: 50px;
                    }
                    form {
                    margin-top: 30px;
                    text-align: center;
                    }
                    input[type="text"] {
                    width: 300px;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px #3498DB;
                    outline: none;
                    }
                    button[type="submit"] {
                    background-color: #3498DB;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    cursor: pointer;
                    box-shadow: 0px 0px 5px #3498DB;
                    outline: none;
                    }
                    button[type="submit"]:hover {
                    background-color: #2980B9;
                    }
                </style>
                </head>
                <body> 
                    <h1>Hello from my server</h1>
                    <h2>Ingresa un mensaje</h2>
                    <div>
                        <form action="/message" method="POST">
                        <input type="text" name="message">
                        <button type="submit">Send</button>
                        </form>
                    </div>
                </body>
            </html>
        `);
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            //estableciendo respuesta del servidor
            res.statusCode= 200;
            //Cerrando la conexión
            res.end();
        break;

        case "/author":
            //Cabeceras de la página
            res.setHeader('Content-Type', 'text/html');
            res.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <link rel="icon" type="img/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
                        <title> My APP - Author </title>
                    </head>
                    <body>
                        <h1 style="color: purple; font-family="consolas""> &#128527 Who's the author? </h1>
                        <hr style="background-color: green; height: 3px">
                        <p style="font-family: consolas">
                            I'm a young programmer, actuatly I'm studying in Instituto Tecnológico de Gustavo A. Madero
                            , here I selected Technologies of Information and Comunications' engineer.
                        </p>
                        <p style="font-family: consolas">
                            This page was created only using JavaScript and IDE of VisualStudio Code &#128521
                        </p>
                    </body>
                </html>
            `);

            //contestando
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);

            //estableciendo el estatus de respuesta
            res.statusCode= 200;

            //cerrando conexión
            res.end();

        break;
        
        case "/favicon.ico":
            // Especificar la ubicación del archivo de icono
            const faviconPath = path.join(__dirname, 'favicon.ico');
            try{
              const data = await fs.readFile(faviconPath);
              res.writeHead(200, {'Content-Type': 'image/x-icon'});
              res.end(data);
              console.log(faviconPath);
            }catch (err) {
              console.error(err);
              // Peticion raiz
              // Estableciendo cabeceras
              res.setHeader('Content-Type', 'text/html');
              // Escribiendo la respuesta
              res.write(`
              <html>
                <head>
                  <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                  <title>My App</title>
                </head>
                <body> 
                  <h1>&#128534; 500 El server esta fuera de servicio</h1>
                  <p>Lo sentimos pero hubo un error en nuestro server...</p>
                  <p> ${err.message}</p>
                </body>
              </html>
              `);
              console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
              // Estableciendo codigo de respuesta
              res.statusCode = 500;
              // Cerrando la comunicacion
              res.end();
            }
            break;

        /* case "/message":
            //Se debe verificar que es post
            if (method == "POST"){
                //Procesamiento del formulario
                res.statusCode= 200;
                res.write("📣 Endpoint funcionando!!!! ✅");
            }
            else {
                res.statusCode= 400;
                res.write("404: Endpoint no encontrado")
            }
            res.end();
        break; */
        case "/message":
            // Verificando si es post
            if (method === "POST") {
                    // Se crea una variable para almacenar los
                    // Datos entrantes del cliente
                let body = "";

                    // Se registra un manejador de eventos
                    // Para la recepción de datos
                req.on("data", (data => {
                body += data;
                if (body.length > 1e6) return req.socket.destroy();
                }));

                    // Se registra una manejador de eventos
                    // para el termino de recepción de datos
                req.on("end", () => {
                // Procesa el formulario
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                        // Mediante URLSearchParams se extraen
                        // los campos del formulario
                const params = new URLSearchParams(body);
                        // Se construye un objeto a partir de los datos
                        // en la variable params
                const parsedParams = Object.fromEntries(params);
                res.write(`
                <html>
                    <head>
                    <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                    <title>My App</title>
                    <style>
                        body {
                            background-color: #f9f9f9;
                            font-family: Arial, sans-serif;
                        }
                        h1 {
                            color: #e74c3c;
                            font-size: 48px;
                            margin-top: 50px;
                            text-align: center;
                        }
                        p {
                            font-size: 24px;
                            color: #7f8c8d;
                            text-align: center;
                            margin-top: 20px;
                        }
                        .error-message {
                            font-size: 18px;
                            color: #95a5a6;
                            text-align: center;
                            margin-top: 20px;
                        }
                    </style>
                    </head>
                    <body>
                    <h1 style="color: #333">SERVER MESSAGE RECIEVED &#128172</h1>
                    <p>${parsedParams.message}</p>
                    </body>
                </html>
                `);
                        // Se termina la conexion
                return res.end();
                })
            } else {
                res.statusCode = 404;
                res.write("404: Endpoint no encontrado")
                res.end();
            }
        break;

        default:
            //peticion raiz
            //estableciendo cabeceras

            res.setHeader(`Content-Type`, `text/html`);
            //escribiendo la respuesta

            res.write(`
                <!DOCTYPE html>
                <html lang="es">
                    <head>
                        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
                        <title>My App</title>
                    </head>
                    <body> 
                        <h1> &#128534 404 Recurso no encontrado</h1>
                        <hr style="background-color: red; height: 2px">
                        <p>Lo sentimos pero no tenemos lo que buscas...</p>
                    </body>
                </html>
            `);

            console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
            //Estableciendo respuesta
            res.statusCode= 404;
            //Cerrando la conexión
            res.end();
        break;
    }

} );

server.listen(3000, "0.0.0.0", () => {
    console.log("👨🏻‍💻 Servidor escuchando en http://localhost:3000");
});