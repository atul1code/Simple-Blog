import express from 'express'

import {getPublisherDashboard, getCreatePage, postCreatePost, getEditPost, postEditPost, postDeletePost} from '../controller/publisher.controller.js'


const publisherRouter = express.Router()


publisherRouter.get('/publisher/publisher-dashboard', getPublisherDashboard)
publisherRouter.get('/publisher/create-post', getCreatePage)
publisherRouter.post('/publisher/create-post', postCreatePost)
publisherRouter.get('/publisher/edit-post/:_id', getEditPost)
publisherRouter.post('/publisher/edit-post', postEditPost)
publisherRouter.post('/publisher/delete-post/:_id', postDeletePost)

 
export default publisherRouter