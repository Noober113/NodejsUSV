import e from "express";
import res from "express/lib/response";
import db from "../models/index";
var bcrypt = require('bcryptjs');


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user exist

                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleid'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login success!!';
                        delete user.password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Password wrong!!!!!!!';
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }
                resolve(userData)
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email is not exist';
                resolve(userData)
            }
        } catch (e) {
            reject(e);
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)



        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
}