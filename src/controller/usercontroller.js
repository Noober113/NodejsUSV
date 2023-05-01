import userServices from '../services/userServices'



let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // if(email ==='' || email===null || email==="undefined") = if(!email)
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!!!!'
        })
    }

    let userData = await userServices.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData.user : {}

    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; // all or 1

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter!!!!',
            users: []
        })
    }

    let users = await userServices.getAllUser(id);

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users

    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }

    let message = await userServices.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleCreateCoor = async (req, res) => {
    let message = await userServices.createCoor(req.body);
    return res.status(200).json(message);
}

let handleGetAllCoor = async (req, res) => {


    let users = await userServices.getAllCoor();

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users

    })
}

let handleEditStatus = async (req, res) => {
    let message = await userServices.updateStatusData(req.body);
    return res.status(200).json(message)
}

let handleQuery = async (req, res) => {
    let message = await userServices.checkQuery();
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleCreateCoor: handleCreateCoor,
    handleGetAllCoor: handleGetAllCoor,
    handleEditStatus: handleEditStatus,
    handleQuery: handleQuery,
}