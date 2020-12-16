const mongoose = require('mongoose');
const { Messages, StatusContext } = require('../help/Messages');
const { responseErrorCatch, responseErrorCustom, responseOk } = require('../help/res');
const postModel = require('../model/posts');
const userModel = require('../model/users');

exports.GetAllPosts = async (req, res) => {
    try {
        const post = await postModel.find({}).populate('sender', 'userName email imageUrl').sort({ createdAt: '-1' })
        return responseOk(res, { post })
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}


exports.GetSinglePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId).populate('sender', 'userName email imageUrl')
        if (!post) return responseErrorCustom(res, Messages.posts.notFound, StatusContext.notFound)
        return responseOk(res, { post })
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}

exports.CreateNewPost = async (req, res) => {
    if (!req.file) return responseErrorCustom(res, { message: Messages.InvalidInput, errors: Messages.posts.failedImageSelect })
    try {
        const sender = req.user;
        const arguments = {
            _id: new mongoose.Types.ObjectId(),
            sender,
            ...req.body,
            imageUrl: req.file.filename,
            createdAt: new Date(Date.now()).toISOString()
        };
        let post = await new postModel(arguments).save();
        const userData = await userModel.findById(sender);
        userData.postsCollection.push(post._id);
        userData.save();
        post = {
            ...post._doc, sender: {
                userName: userData.userName,
                email: userData.email,
                imageUrl: userData.email
            }
        };
        return responseOk(res, { post });
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}

exports.UpdatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findById(id);
        if (!post) return responseErrorCustom(res, Messages.posts.notFound, StatusContext.notFound);
        if (post.sender.toString() !== req.user.toString()) return responseErrorCustom(res, Messages.posts.permissionUpdate);
        const arguments = { ...req.body };
        if (req.file) arguments.imageUrl = req.file.filename;
        await post.update(arguments);
        return responseOk(res, Messages.posts.successUpdate);
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}



exports.DeletePost = async (req, res) => {
    try {
        const sender = req.user;
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: Messages.posts.notFound });
        if (post.sender.toString() !== sender.toString()) return responseErrorCustom(res, Messages.posts.permissionDelete);
        await post.delete();
        return responseOk(res, { message: Messages.posts.successDelete });
    } catch (error) {
        return responseErrorCatch(res, error);
    }
}