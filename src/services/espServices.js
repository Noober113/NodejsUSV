import e from "express";
import res from "express/lib/response";
import db from "../models/index";
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
            resolve(coor)
        } catch (e) {
            console.log(e)
            // reject(e);
        }
    })
}

let createCoor = (lat, lng) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Receive.create({
                latitude: lat,
                longitude: lng,
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
    const videoPath = path.join(__dirname, '..', 'uploads', file.originalname);
    await writeFile(videoPath, file.buffer);
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

module.exports = {
    getAllCoor: getAllCoor,
    createCoor: createCoor,
    saveVideo: saveVideo,
    deleteCoor: deleteCoor,
}