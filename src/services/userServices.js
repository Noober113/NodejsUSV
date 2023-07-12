import e from "express";
import res from "express/lib/response";
import db from "../models/index";
var bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is exist, try another email',
                })
            } else {
                let hassPasswordFromBycript = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hassPasswordFromBycript,
                    fullName: data.fullName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                })
            }




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

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`,
                })
            }

            await db.User.destroy({
                where: { id: userId }
            });

            resolve({
                errCode: 0,
                errMessage: 'User is delete',
            })

        } catch (e) {
            reject(e)
        }

    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'update success',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found',
                });
            };
        } catch (e) {
            reject(e)
        }

    })
}

let createCoor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Send.create({
                latitude: data.lat,
                longitude: data.lng,
                // start: data.stt,
                start: data.stt === "1" ? true : false,
                round: data.round,
                speed: data.speed,
                // time: data.time,
            });
            await db.point_test.create({
                value1: data.lat,
                value2: data.lng,
                // start: data.stt,
                value3: data.stt,
                value4: data.round,
                value5: data.speed,
                // time: data.time,
            });
            resolve({
                errCode: 0,
                errMessage: 'ok',
            })

        } catch (e) {
            console.log(e)
        }
    })
}

let getAllCoor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            users = await db.Receive.findOne({
                order: [['id', 'DESC']],
                limit: 1,
                // attributes: ['latitude', 'longitude', 'speed', 'course', 'distance', 'status', 'status_rubbish']
            })
            resolve(users)
        } catch (e) {
            console.log(e);
            // reject(e);
        }
    })
}

let updateStatusData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Send.update({ start: data.stt }, { where: {} });
            resolve({
                errCode: 0,
                errMessage: 'update success',
            });

            resolve({
                errCode: 1,
                errMessage: 'User not found',
            });

        } catch (e) {
            // reject(e)
            console.log(e)
        }

    })
}

let checkQuery = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let check
            let checkval
            check = await db.Send.findOne({
                order: [['id', 'DESC']],
                // attributes: ['value3']
            })
            if (check) {
                checkval = await db.Send.findAll({
                    attributes: ['latitude', 'longitude', 'round', 'start', 'speed']
                })
                resolve({
                    checkval,
                    errCode: 0,
                    errMessage: 'update success',
                });
            }
            else {
                checkval = 0
                resolve({
                    checkval,
                    errCode: 0,
                    errMessage: 'update success',
                });
            }

        } catch (e) {
            // reject(e)
            console.log(e)
        }

    })
}

let updateRound = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Send.update({ round: data.sp }, { where: {} });
            resolve({
                errCode: 0,
                errMessage: 'update success',
            });

            resolve({
                errCode: 1,
                errMessage: 'User not found',
            });

        } catch (e) {
            // reject(e)
            console.log(e)
        }

    })
}

let updateSpeed = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Send.update({ speed: data.sp }, { where: {} });
            resolve({
                errCode: 0,
                errMessage: 'update success',
            });

            resolve({
                errCode: 1,
                errMessage: 'User not found',
            });

        } catch (e) {
            // reject(e)
            console.log(e)
        }

    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    createCoor: createCoor,
    getAllCoor: getAllCoor,
    updateStatusData: updateStatusData,
    checkQuery: checkQuery,
    updateRound: updateRound,
    updateSpeed: updateSpeed,
}