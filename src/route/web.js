import express from "express";
import res from "express/lib/response";
import homecontroller from "../controller/homecontroller";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homecontroller.getHomePage);
    router.get('/crud', homecontroller.getCRUD);
    router.post('/post-crud', homecontroller.postCRUD);
    router.get('/get-crud', homecontroller.displayGetCRUD);
    router.get('/edit-crud', homecontroller.getEditCRUD);
    router.post('/put-crud', homecontroller.putCRUD);
    router.get('/delete-crud', homecontroller.deleteCRUD);
    return app.use("/", router);
};

module.exports = initWebRoutes;