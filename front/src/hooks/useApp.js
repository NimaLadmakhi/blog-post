import { useContext } from "react";
import { AppDispatcher, AppStore } from "../context/provider";

export const useAppState = () => useContext(AppStore);
export const useAppDispatch = () => {
    const dispatch = useContext(AppDispatcher);
    const checkAuthorization = (auth) => {
        dispatch({ type: 'CHECK_AUTH', status: auth });
    }
    const setUser = (userData) => {
        dispatch({ type: 'SET_USER', payload: userData });
    }
    const setPosts = (posts) => {
        dispatch({ type: 'SET_POSTS', payload: posts });
    }
    const addNewPost = (post) => {
        dispatch({ type: 'ADD_NEW_POST', payload: post })
    }
    const deletePost = (postId) => {
        dispatch({ type: 'DELETE_POST', payload: postId });
    }
    const openDialog = (postId, status = true) => {
        dispatch({ type: 'OPEN_DIALOG', payload: postId, status });
    }
    const updatePost = (postId, payload) => {
        dispatch({ type: 'UPDATE_POST', id: postId, payload });
    }
    const updateUser = (payload) => {
        dispatch({ type: 'UPDATE_USER', payload });
    }
    return { checkAuthorization, setUser, setPosts, addNewPost, deletePost, openDialog, updatePost, updateUser };
}