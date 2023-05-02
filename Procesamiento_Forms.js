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
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
                        <title>My App</title>
                    </head>
                    <body>
                        <h1 style="color: #333">Hello from my server</h1>
                        <hr style="background-color: green; height: 3px">
                        <p style="color: blue">Estás en el recurso raíz.</p>
                    </body>
                </html>
                `
            );
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

        case "/message":
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