import express from "express";
import res from "express/lib/response";
import homecontroller from "../controller/homecontroller";
import usercontroller from "../controller/usercontroller";
import espcontroller from "../controller/espcontroller"
import multer from "multer";

let router = express.Router();
let upload = multer({ dest: 'uploads/' });


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

    //-----------------------------------------------------------------//

    router.post('/api/login', usercontroller.handleLogin);
    router.get('/api/get-all-users', usercontroller.handleGetAllUser);
    router.post('/api/create-user', usercontroller.handleCreateNewUser);
    router.put('/api/edit-user', usercontroller.handleEditUser);
    router.delete('/api/delete-user', usercontroller.handleDeleteUser);
    router.post('/api/create-coor', usercontroller.handleCreateCoor);
    router.get('/api/get-coor', usercontroller.handleGetAllCoor);
    router.put('/api/edit-status', usercontroller.handleEditStatus);
    router.put('/api/edit-round', usercontroller.handleEditSpeed);
    router.get('/api/query-setting', usercontroller.handleQuery);


    //-----------------------------------------------------------------//


    router.get('/api/esp/get-all-coor', espcontroller.handleGetCoor);
    router.post('/api/esp/post-coor', espcontroller.handlePostCoor);
    router.post('/api/esp/post-video', espcontroller.handlePostVideo);
    router.post('/api/esp/delete-coor', espcontroller.handleDeleteCoor);
    router.get('/api/esp/round', espcontroller.handleGetRound);
    router.get('/api/esp/test', espcontroller.handleTest);
    // router.get('/api/esp/start', espcontroller.handleGetStart);
    router.get('/api/esp/get-distance', espcontroller.handleGetDistance);


    //-----------------------------------------------------------------//


    router.post('/api/esp/post-video', upload.single('video'), espcontroller.handlePostVideo);
    router.get('/api/esp/get-video', espcontroller.handleGetVideo);


    return app.use("/", router);
};

module.exports = initWebRoutes;