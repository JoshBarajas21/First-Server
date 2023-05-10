import path, { dirname } from "path";
import { promises as fs } from 'fs';


export default async(req, res)=>{
    //Destrucuración del "req"
    let { url, method } = req;

    console.log(`📣 Client-Request: ${req.url} ${req.method}`);

    //Enrutando peticiones con una estructura Switch
    switch(url){
        case '/':
            // Peticion raiz
            // Estableciendo cabeceras
            /* res.setHeader('Content-Type', 'text/html'); */
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            const File = path.join(__dirname, 'views/index.html');
            const Dato = await fs.readFile(File);
            res.write(Dato)
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 200;
            // Cerrando la comunicacion
            res.end();
      break;

        case "/author":
            //Cabeceras de la página
            res.setHeader('Content-Type', 'text/html');
            const File2 = path.join(__dirname, 'views/author.html');
            const Dato2 = await fs.readFile(File2);

            //contestando
            console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
            res.write(Dato2);

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
              const readFiles = path.join(__dirname, 'views/500.html');
              const err5 = await fs.readFile(readFiles);
              res.write(err5);
              console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
              console.log(`📣 Error: 500 ${err.message}`);
              // Estableciendo codigo de respuesta
              res.statusCode = 500;
              // Cerrando la comunicacion
              res.end();
            }
            break;

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
                    // Mediante URLSearchParams se extraen
                          // los campos del formulario
                    const params = new URLSearchParams(body);
                    // Se construye un objeto a partir de los datos
                          // en la variable params
                    const parsedParams = Object.fromEntries(params);
                    //almacenar el mensaje en un archivo
                    fs.writeFile('message.txt', parsedParams.message);
                })
                //establecer código de respuesta
                //para redireccionamiento
                res.statusCode= 302;
                //estableciendo el redireccionamiento
                res.setHeader('Location', '/');
                // Se finaliza la conexion
                return res.end();
                } else {
                  res.statusCode = 404;
                  res.setHeader(`Content-Type`, `text/html`);
                  const Error = path.join(__dirname, 'views/404.html');
                  const Dato3 = await fs.readFile(Error);
                  
                  console.log('EndPoint no encontrado');
                  res.end(Dato3);
                }
        break;

        default:
            //peticion raiz
            //estableciendo cabeceras

            res.setHeader(`Content-Type`, `text/html`);
            //escribiendo la respuesta
            const pathFilee = path.join(__dirname, 'views/404.html');
            const Datos = await fs.readFile(pathFilee);
            res.write(Datos);

            console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
            //Estableciendo respuesta
            res.statusCode= 404;
            //Cerrando la conexión
            res.end();
        break;
    }

}