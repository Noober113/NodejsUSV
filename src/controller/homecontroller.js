const Sequelize = require('sequelize');
import { json, raw } from "body-parser";
// import { JSON } from "sequelize";
import db from "../models/index";
const { get, default: res } = require("express/lib/response")
import CRUDservices from "../services/CRUDservices";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.send('login success!!!!!!');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUser();
    // console.log('---------------');
    // console.log(data);
    // console.log('---------------');
    return res.render('display-crud.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservices.getUserInfoById(userId);

        return res.render('edit-crud.ejs', {
            user: userData
        });
    }
    else {
        return res.send('User is not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservices.updateUserData(data)
    // console.log('DONE!!!!!!!')
    return await res.redirect("/get-crud")
    // console.log(data.id)
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservices.deleteUserById(userId);
        // res.send('delete user succeed');
        return await res.redirect("/get-crud");

    }
    else {
        return res.send('User is not found');
    }
}

// Object{key: value}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}