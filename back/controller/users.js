const mongoose = require('mongoose');
const usersModel = require('../model/users');
const { responseErrorCustom, responseOk, responseErrorCatch } = require('../help/res');
const { StatusContext, Messages } = require('../help/Messages');
const { GenerateToken } = require('../help/generateToken');

exports.GetUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await usersModel.findById(userId).populate('postsCollection', 'title body imageUrl createdAt');
        if (!user) return responseErrorCustom(res, Messages.user.notFound, StatusContext.notFound)
        return responseOk(res, { user });
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}


exports.Signup = async (req, res) => {
    try {
        const body = {
            ...req.body,
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(Date.now()).toISOString(),
            imageUrl: 'defaultImage.jpg'
        };
        const newUserData = await new usersModel(body).save();
        const token = await GenerateToken(newUserData._id);
        return responseOk(res, { message: Messages.user.signSuccess, token })
    } catch (error) {
        return responseErrorCustom(res, { message: Messages.user.failedSuccess, error: error.message });
    }
}

exports.Login = async (req, res) => {
    try {
        const userContext = await usersModel.findOne({ email: req.body.email });
        if (!userContext) {
            return responseErrorCustom(res, Messages.user.notFound, StatusContext.notFound);
        }
        if (userContext.password !== req.body.password) {
            return responseErrorCustom(res, Messages.user.notMatchInput, StatusContext.unAuthorized);
        }
        const token = await GenerateToken(userContext._id);
        return responseOk(res, { message: Messages.user.loginSuccess, token });
    } catch (error) {
        return responseErrorCustom(res, { message: Messages.user.loginFailed, error: error.message });
    }
}

exports.UpdateProfileUser = async (req, res) => {
    try {
        const userId = req.user;
        const userData = await usersModel.findById(userId);
        if (!userData) {
            return responseErrorCustom(res, Messages.user.notFound, StatusContext.notFound);
        }
        const updateUser = {
            updatedAt: new Date(Date.now()).toISOString(),
            ...req.body,
        };
        delete updateUser.createdAt;
        if (req.file) updateUser.imageUrl = req.file.filename;
        await userData.update({ ...updateUser });
        return responseOk(res, Messages.user.updateSucess);
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}