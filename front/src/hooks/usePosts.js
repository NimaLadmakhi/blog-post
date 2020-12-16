import Axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppState } from "./useApp";

export const usePosts = () => {
    const appState = useAppState();
    const appDispatch = useAppDispatch();
    useEffect(() => {
        if (!appState.posts) {
            Axios('http://localhost:4000/posts')
                .then(({ data }) => {
                    appDispatch.setPosts(data.post);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }, []);
}