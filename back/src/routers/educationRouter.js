import { Router } from "express";

const { EducationModel }  = require("../db/schemas/education");
const {UserModel} = require("../db/schemas/user");
const asyncHandler = require('../middlewares/async-handler');

const educationRouter = Router();









module.exports = educationRouter;