
var bcrypt = require('bcryptjs');
import { raw } from "body-parser";
import { where } from "sequelize";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createStatus = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.point_test.create({
                value1: data.value1,
                value2: data.value2,
                value3: data.value3,
            })
            resolve("Vào db xem đi xong r đó")
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordFromBycript = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hassPasswordFromBycript,
                fullName: data.fullName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resolve("create new user success !!!!!!!!!!")
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }

    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })


            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }

        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                throw new Error('ID is required');
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                // raw: true,
            })
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                await user.save();

                resolve();
            } else {
                console.log('User not found');
                resolve();
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            })
            await user.destroy();
            resolve();

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    createStatus: createStatus,
}