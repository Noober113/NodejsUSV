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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}