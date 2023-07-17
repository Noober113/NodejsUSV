import e from "express";
import res from "express/lib/response";
import db from "../models/index";
import { where } from "sequelize";
// import { getDistanceFromLine } from "geolib";
const geolib = require('geolib');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);


let getAllCoor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            let coor = ''
            if (userId === 'CO') {
                users = await db.Send.findAll({
                })
                coor = users[0].latitude + '*' + users[0].longitude
                for (let i = 1; i < users.length; i++) {
                    coor = coor + '/' + users[i].latitude + '*' + users[i].longitude   //        10.12*12.13/12.23*13.16/v.v..
                }
            }

            if (userId === 'STT') {
                users = await db.Send.findOne({
                    order: [['id', 'DESC']],
                    // attributes: ['value3']
                })
                if (users) {
                    coor = users.start
                }
                else {
                    coor = 0
                }
            }

            if (userId === 'ROU') {
                users = await db.Send.findOne({
                    order: [['id', 'DESC']],
                    attributes: ['round']
                })


                if (users === null) {
                    coor = 0
                } else {
                    coor = users.round
                }
            }

            if (userId === 'SPE') {
                users = await db.Send.findOne({
                    order: [['id', 'DESC']],
                    attributes: ['speed']
                })


                if (users === null) {
                    coor = 0
                } else {
                    coor = users.speed
                }
            }

            if (userId === 'SPEF') {
                users = await db.Send.findOne({
                    order: [['id', 'DESC']],
                    attributes: ['value_1']
                })


                if (users === null) {
                    coor = 0
                } else {
                    coor = users.value_1
                }
            }

            resolve(coor)
        } catch (e) {
            console.log(e)
            // reject(e);
        }
    })
}

let createCoor = (lat, lng, distance_1, distance_2, distance_3, distance_4, cap180, distance, speed, j, speed1) => {
    return new Promise(async (resolve, reject) => {
        try {

            let lines = await db.Send.findAll({
                attributes: ['latitude', 'longitude']
                // where: { 'createAt'>= '165256660000' }
            })
            let point = await db.Receive.findOne({
                order: [['id', 'DESC']],
                attributes: ['latitude', 'longitude']
            })
            let minDistance = Infinity
            for (let i = 0; i < lines.length - 1; i++) {
                const start = { latitude: lines[i].latitude, longitude: lines[i].longitude };
                const end = { latitude: lines[i + 1].latitude, longitude: lines[i + 1].longitude };
                const distance = geolib.getDistanceFromLine(point, start, end, 0.00000000000000000000000000000001);
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }

            await db.Receive.create({
                latitude: lat,
                longitude: lng,
                value_1: distance_1,
                value_2: distance_2,
                value_3: distance_3,
                value_4: distance_4,
                course: cap180,
                distance: distance,
                speed: speed,
                value_5: j,
                value_6: speed1,
                value_7: minDistance,
                // value3: data.round === "1" ? true : false,
                // start: data.start === "1" ? true : false,
                // time: data.time,
            });
            resolve({
                errCode: 0,
                errMessage: 'ok',
            })

        } catch (e) {
            // reject(e)
            console.log(e)

        }
    })
}

let saveVideo = async (file) => {

}

let deleteCoor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Send.findAll()
            for (let i = 0; i < users.length; i++) {
                await db.Send.destroy({
                    where: { id: users[i].id } // Delete each user one by one
                });
            }

            resolve({
                errMessage: 'ok',

            }
            )

        } catch (e) {
            reject(e)
        }

    })
}

let getAllRound = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Send.findOne({
                order: [['id', 'DESC']],
                attributes: ['latitude']
            })

            if (users === null) {
                users = 0
            } else {
                users = users.round
            }


            resolve(users)


        } catch (e) {
            console.log(e)
            // reject(e);
        }
    })
}

let testSend = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Send.findAll({
                attributes: ['round']
            })
            let all = users[0].round
            resolve(all)
        } catch (e) {
            console.log(e)
            // reject(e);
        }
    })
}

// let getAllStart = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = await db.Send.findAll({
//                 attributes: ['start']
//             })
//             let all = users[0].round
//             resolve(all)
//         } catch (e) {
//             console.log(e)
//             // reject(e);
//         }
//     })
// }

let CalcDistance = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let lines = await db.Send.findAll({
                attributes: ['latitude', 'longitude']
                // where: { 'createAt'>= '165256660000' }
            })
            let point = await db.Receive.findOne({
                order: [['id', 'DESC']],
                attributes: ['latitude', 'longitude']
            })
            let minDistance = Infinity
            for (let i = 0; i < lines.length - 1; i++) {
                const start = { latitude: lines[i].latitude, longitude: lines[i].longitude };
                const end = { latitude: lines[i + 1].latitude, longitude: lines[i + 1].longitude };
                const distance = geolib.getDistanceFromLine(point, start, end, 0.00000000000000000000000000000001);
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }
            resolve(minDistance)
        } catch (e) {
            // console.log(e)
            reject(e);
        }
    })
}


module.exports = {
    getAllCoor: getAllCoor,
    createCoor: createCoor,
    saveVideo: saveVideo,
    deleteCoor: deleteCoor,
    getAllRound: getAllRound,
    testSend: testSend,
    // getAllStart: getAllStart,
    CalcDistance: CalcDistance,
}