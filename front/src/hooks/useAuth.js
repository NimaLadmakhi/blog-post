import axios from "axios";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useAppDispatch } from "./useApp";

export const useAuth = (status) => {
    console.log(status);
    const { setUser, checkAuthorization } = useAppDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenDecode = jwt.decode(token);
            if (tokenDecode.exp * 1000 >= Date.now()) {
                const id = tokenDecode._id;
                checkAuthorization(true);
                axios.get(`http://localhost:4000/users/${id}`)
                    .then(({ data }) => {
                        setUser(data.user)
                    })
                    .catch((err) => console.log(err));
                return;
            }
            return;
        }
        checkAuthorization(false);
    }, [status]);
}
