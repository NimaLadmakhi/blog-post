const express = require('express');
const routes = express.Router();
const auth = require('../help/auth')
const validationMessage = require('../help/validationMessage')
const controller = require('../controller/posts')
const expValidation = require('../help/ExpValidate');
const { uploader } = require('../help/Uploader');

routes.get('/', controller.GetAllPosts);
routes.get('/:id', controller.GetSinglePost);
routes.post('/',
    auth,
    uploader,
    expValidation.CreatePostValidation(),
    validationMessage,
    controller.CreateNewPost
);
routes.put('/:id',
    auth,
    uploader,
    expValidation.UpdatePostValidation(),
    validationMessage,
    controller.UpdatePost
);
routes.delete('/:id', auth, controller.DeletePost);

module.exports = routes;