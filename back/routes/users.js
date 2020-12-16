const express = require('express');

const routes = express.Router();

const auth = require('../help/auth');

const validationMessage = require('../help/validationMessage');

const { uploader } = require('../help/Uploader');

const controller = require('../controller/users');

const { SignupValidation, LoginValidation, UpdateProfileValidation } = require('../help/ExpValidate');

routes.get('/:id', controller.GetUserById);

routes.post('/signup', SignupValidation(), validationMessage, controller.Signup);

routes.post('/login', LoginValidation(), validationMessage, controller.Login);

routes.put('/', auth, UpdateProfileValidation(), validationMessage, uploader, controller.UpdateProfileUser);

module.exports = routes;