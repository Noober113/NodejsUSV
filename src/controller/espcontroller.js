import espServices from '../services/espServices'
import qs from 'querystring';




let handleGetCoor = async (req, res) => {
    let id = req.query.id; // all or 1

    // if (!id) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         message: 'Missing required parameter!!!!',
    //         users: []
    //     })
    // }

    let users = await espServices.getAllCoor(id);
    // console.log(users)
    return res.status(200).send(users)
}

let handlePostCoor = async (req, res) => {
    let message = await espServices.createCoor(req.query.lat, req.query.lng, req.query.distance_1, req.query.distance_2, req.query.distance_3, req.query.distance_4, req.query.cap180);
    let users = await espServices.getAllCoor('STT');
    return res.status(200).json(users);
}

let handlePostVideo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file received' });
    }

    // Access the uploaded video file using req.file
    const videoPath = req.file.path;
    espServices.saveVideo(videoPath);

    // Send a response back to the ESP32-CAM
    res.json({ message: 'Video uploaded successfully' });


};

let handleDeleteCoor = async (req, res) => {
    let message = await espServices.deleteCoor();
    return res.status(200).json(message);
};

let handleGetVideo = async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.render('view.ejs', { videoFile: filename });
};

let handleGetRound = async (req, res) => {
    let users = await espServices.getAllRound();
    // console.log(users)
    return res.status(200).json(users)
};

let handleTest = async (req, res) => {
    let users = await espServices.testSend();
    // console.log(users)
    return res.status(200).json(users)
};

// let handleGetStart = async (req, res) => {
//     let users = await espServices.getAllStart();
//     // console.log(users)
//     return res.status(200).json(users)
// };

module.exports = {
    handleGetCoor: handleGetCoor,
    handlePostCoor: handlePostCoor,
    handlePostVideo: handlePostVideo,
    handleDeleteCoor: handleDeleteCoor,
    handleGetVideo: handleGetVideo,
    handleGetRound: handleGetRound,
    handleTest: handleTest,
    // handleGetStart: handleGetStart,
}