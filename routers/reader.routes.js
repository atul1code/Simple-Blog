import express from "express";


import {getHomePage, getReadBlog} from '../controller/reader.controller.js'

const readerRouter = express.Router();



readerRouter.get('/', getHomePage)
readerRouter.get('/read/:_id', getReadBlog)

export default readerRouter