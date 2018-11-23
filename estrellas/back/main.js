
var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
    console.log(documento)
return new Promise(resolve => {
documento.write(`

import * as express from 'express';
import * as subdomain from 'express-subdomain';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as morgan from 'morgan';

import { UsuarioRouter } from './http/rutas/Usuario';
import { AutentificacionRouter } from './http/rutas/Autentificacion';
import { ProspectoRouter } from './http/rutas/Prospecto';


//conexion a la base de datos
import { Conexion } from './http/conexion';
import { Ruteador } from './http/ruteo';
// import { ImagenRouter } from './http/rutas/Imagen';
// import { VideoRouter } from './http/rutas/Video';

`)

// rutas
data.forEach(modelo =>
documento.write(`
import { ` +  _.capitalize(modelo.singular) + `Router } from './http/` + modelo.singular + `/ruta';`))

// modelos
data.forEach(modelo =>
documento.write(`
import { ` +  _.capitalize(modelo.singular) + ` } from './http/` + modelo.singular + `/modelo';`))



// importarlas


documento.write(`

export class Server {

    app: express.Application;
    private _url_allow_origin: string[];

    constructor(private port: number, modo, urlAllowOrigin?: string[]) {
        console.log(modo)
        this._url_allow_origin = urlAllowOrigin;
        this.app = express();
        this.config();
        this.apiRutas();

    }

    static init(port: number, modo, urlAllowOrigin?: string[]): Server {
        return new Server(port, modo, urlAllowOrigin);
    }

    iniciarServidor(callback?: Function) {
        this.app.listen(this.port, callback);
    }

    private config() {

        let conexion = new Conexion();
        conexion.addModels([
        `)

data.forEach(modelo =>
documento.write(`
            ` +  _.capitalize(modelo.singular) + `,`))

documento.write(`
        ])
        // conexion.sync();

        this.app.use((req, res, next) => {
            let origin = req.headers.origin;

            if(origin && this._url_allow_origin.indexOf(origin.toString()) > -1){
                 res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        })

        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());

        this.app.use(session({ secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        morgan('combined', { skip: function (req, res) { return res.statusCode < 400 } });
    }

    private apiRutas() {
        let rutas
        =Ruteador.init([`)


    data.forEach(modelo =>
documento.write(`
            new ` +  _.capitalize(modelo.singular) + `Router().rutas(),`))

documento.write(`
            new UsuarioRouter().rutas(),
            new AutentificacionRouter().rutas(),
            new ProspectoRouter().rutas(),
            // new ImagenRouter().rutas(),
            // new VideoRouter().rutas()
        ])

        this.app.use(subdomain('api', rutas.route))
    }
}`, (algo) => resolve(true))
    })
}
