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
    let message = await espServices.createCoor(req.query.lat, req.query.lng);
    let users = await espServices.getAllCoor('STT');
    return res.status(200).json(users);
}

let handlePostVideo = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        await espServices.saveVideo(file);
        res.send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
};

let handleDeleteCoor = async (req, res) => {
    let message = await espServices.deleteCoor();
    return res.status(200).json(message);
};

module.exports = {
    handleGetCoor: handleGetCoor,
    handlePostCoor: handlePostCoor,
    handlePostVideo: handlePostVideo,
    handleDeleteCoor: handleDeleteCoor,
}