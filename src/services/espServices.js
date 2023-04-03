import e from "express";
import res from "express/lib/response";
import db from "../models/index";
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);


let getAllCoor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            let coor = ''

            users = await db.point_test.findAll({

            })
            for (let i = 0; i < users.length; i++) {
                coor = coor + users[i].value1 + '*' + users[i].value2 + '/'  //        10.12*12.13/12.23*13.16/v.v..
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
            await db.point_test.create({
                value1: lat,
                value2: lng,
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

const saveVideo = (videoData, callback) => {
    const video = Buffer.from(videoData, 'base64');
    fs.writeFile('video.mp4', video, callback);
};

module.exports = {
    getAllCoor: getAllCoor,
    createCoor: createCoor,
    saveVideo: saveVideo,
}