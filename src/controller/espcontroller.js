import espServices from '../services/espServices'

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

module.exports = {
    handleGetCoor: handleGetCoor,
    handlePostCoor: handlePostCoor,
}