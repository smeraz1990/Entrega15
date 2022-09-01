import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function getRoot(req, res) {}
import yargs  from "yargs";
import {fork} from 'child_process'
import cluster from "cluster";
import os from "os";
const  cpus = os.cpus();
const yargsExecute = yargs(process.argv.slice(2))
const args = yargsExecute.alias({
    p:"puerto"
}).default({
    puerto: "8080"
}).argv;

function getLogin(req, res) {
  var user = {username: "Se omite login"};
    console.log("user logueado");
    res.render("login-ok", {
      usuario: user.username
    });
  // if (req.isAuthenticated()) {
  //   var user = req.user;
  //   console.log("user logueado");
  //   res.render("login-ok", {
  //     usuario: user.username
  //   });
  // } else {
  //   console.log("user NO logueado");
  //   res.sendFile(path.join(__dirname,"../views/login.html"));
  // }
}

function getRandoms(req, res) {
  let { cant } = req.query
  if (!cant) {
    cant = 100000000
  }
  console.log(cant)
  const forked = fork('src/childRandom.js')
  forked.send(cant);
  forked.on("message", (msg) => {
    //res.send(`los catos randoms son: ${msg}`);
    res.render("randoms", {
      datosRandom: msg
    });
  });
  

    
}

//--------------------Agregado ruta info-------------->

//Titulo del proceso: ${process.title}

function getInfo(req, res) {
    //console.log("Aqui esta la info");
    //console.log(JSON.stringify(args).split(','))
    //console.log(JSON.stringify(process.memoryUsage()))
    res.render("Info", {
      argumentos: JSON.stringify(args).split(','),
      plataforma: process.platform,
      versionnode: process.version,
      memory: JSON.stringify(process.memoryUsage()).split(','),
      procesoid: process.pid,
      Carpeta: process.cwd(),
      CarpetaPath: process.execPath,
      NumeroPrecesarodes: cpus.length
    });
  // if (req.isAuthenticated()) {
  //   var user = req.user;
  //   console.log("user logueado");
  //   res.render("login-ok", {
  //     usuario: user.username
  //   });
  // } else {
  //   console.log("user NO logueado");
  //   res.sendFile(path.join(__dirname,"../views/login.html"));
  // }
}

function getSignup(req, res) {
  res.sendFile(path.join(__dirname,"../views/signup.html"));
}

function postLogin(req, res) {
  var user = req.user;

  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function postSignup(req, res) {
  var user = req.user;

  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function getFaillogin(req, res) {
  console.log("error en login");
  res.render("login-error", {});
}

function getFailsignup(req, res) {
  console.log("error en signup");
  res.render("signup-error", {});
}

function getLogout(req, res) {
  req.logout();
  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function failRoute(req, res) {
  res.status(404).render("routing-error", {});
}

export default {
  getRoot,
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  failRoute,
  getSignup,
  postSignup,
  getFailsignup,
  getInfo,
  getRandoms
};
