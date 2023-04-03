import espServices from '../services/espServices'
import qs from 'querystring';




let handleGetCoor = async (req, res) => {
    // let id = req.query.id; // all or 1

    // if (!id) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         message: 'Missing required parameter!!!!',
    //         users: []
    //     })
    // }

    let users = await espServices.getAllCoor();

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users

    })
}

let handlePostCoor = async (req, res) => {
    let message = await espServices.createCoor(req.query.lat, req.query.lng);
    return res.status(200).json(message);
}

const handlePostVideo = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const postData = qs.parse(body);
        const videoData = postData.video;
        espServices.saveVideo(videoData, (err, result) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Error: Could not save video');
            } else {
                res.statusCode = 200;
                res.end('Video saved successfully');
            }
        });
    });
};

module.exports = {
    handleGetCoor: handleGetCoor,
    handlePostCoor: handlePostCoor,
    handlePostVideo: handlePostVideo,
}