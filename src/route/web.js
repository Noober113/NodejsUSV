import express from "express";
import res from "express/lib/response";
import homecontroller from "../controller/homecontroller";
import usercontroller from "../controller/usercontroller";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homecontroller.getHomePage);
    router.get('/crud', homecontroller.getCRUD);
    // router.get('/test', homecontroller.test);
    // router.post('/test-post', homecontroller.testPost);
    router.post('/post-crud', homecontroller.postCRUD);
    router.get('/get-crud', homecontroller.displayGetCRUD);
    router.get('/edit-crud', homecontroller.getEditCRUD);
    router.post('/put-crud', homecontroller.putCRUD);
    router.get('/delete-crud', homecontroller.deleteCRUD);
    router.post('/api/login', usercontroller.handleLogin)
    return app.use("/", router);
};

module.exports = initWebRoutes;