import express from "express";
import bodyParser, { json } from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import cors from "cors"
// import helmet from "helmet";
// var cors = require('cors')
require('dotenv').config();
import connectDB from "./config/connectDB";

let app = express();
app.use(express.static('public'));

// app.use(cors())
// app.listen(3000, function () {
//     // console.log('CORS-enabled web server listening on port 80')
// })

app.use(cors({ origin: 'http://192.168.43.151:3000', credentials: true }));
// app.use(helmet());

// app.use(cors({ origin: "http://localhost:3000" }));

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRoutes(app);

connectDB();


let port = process.env.PORT || 6969; // port undefined => 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port :" + port);

});