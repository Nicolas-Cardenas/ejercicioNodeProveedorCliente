const fs = require("fs");
var http = require("http");
const axios = require("axios").default;

http
  .createServer(function (req, res) {
    var ruta = req.url;
    if (ruta === "/api/proveedores") {
      axios
        .get(
          "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
        )
        .then(
          (resp) => {
            modTablaProvedores(resp.data);
          },
          (error) => {
            throw error;
          }
        );
    } else if (ruta === "/api/clientes") {
      axios
        .get(
          "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
        )
        .then(
          (resp) => {
            modTablaClientes(resp.data);
          },
          (error) => {
            throw error;
          }
        );
    }

    function modTablaProvedores(json) {
      fs.readFile("./proveedores.html", "utf8", (err, data) => {
        var inicio = data.substring(0, data.indexOf("<tr>") + "<tr>".length);
        var ids = "<th>ID</th> <th>Nombre</th> <th>Contacto</th>";
        var contenedor = data.substring(
          data.indexOf("</tr>") - "</tr>".length,
          data.indexOf("<tbody>") + "<tbody>".length
        );

        var contenido = "";
        for (let i in json) {
          var id = "idproveedor";
          var compania = "nombrecompania";
          var nombre = "nombrecontacto";
          var html =
            "<tr> " +
            "<td>" +
            json[i][id] +
            "</td>" +
            "<td>" +
            json[i][compania] +
            "</td>" +
            "<td>" +
            json[i][nombre] +
            "</td>" +
            "</tr> \n";
          contenido += html;
        }
        var final = data.substring(data.indexOf("</tbody>"));

        var escritura = inicio
          .concat(ids)
          .concat(contenedor)
          .concat(contenido)
          .concat(final);

        fs.writeFile("./proveedores.html", escritura, (err) => {
          if (err) throw err;
          else {
            console.log("Se escribio el archivo html");
            fs.readFile(__dirname + "/proveedores.html", (err, data) => {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            });
          }
        });
      });
    }

    function modTablaClientes(json) {
      fs.readFile("./clientes.html", "utf8", (err, data) => {
        var inicio = data.substring(0, data.indexOf("<tr>") + "<tr>".length);
        var ids = "<th>ID</th> <th>Nombre</th> <th>Contacto</th>";
        var contenedor = data.substring(
          data.indexOf("</tr>") - "</tr>".length,
          data.indexOf("<tbody>") + "<tbody>".length
        );

        var contenido = "";
        for (let i in json) {
          var id = "idCliente";
          var compania = "NombreCompania";
          var nombre = "NombreContacto";
          var html =
            "<tr> " +
            "<td>" +
            json[i][id] +
            "</td>" +
            "<td>" +
            json[i][compania] +
            "</td>" +
            "<td>" +
            json[i][nombre] +
            "</td>" +
            "</tr> \n";
          contenido += html;
        }
        var final = data.substring(data.indexOf("</tbody>"));

        var escritura = inicio
          .concat(ids)
          .concat(contenedor)
          .concat(contenido)
          .concat(final);

        fs.writeFile("./clientes.html", escritura, (err) => {
          if (err) throw err;
          else {

            fs.readFile(__dirname + "/clientes.html", (err, data) => {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
            });
          }
        });
      });
    }
  })
  .listen(8081);
