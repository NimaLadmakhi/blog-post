import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from "../hooks/useApp";

const Login = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHanlder = (event) => {
        event.preventDefault();
        const args = { password, email };
        axios.post('http://localhost:4000/users/login', args)
            .then(({ data }) => {
                dispatch.checkAuthorization(true);
                alert(data.message);
                localStorage.setItem('token', data.token);
                history.push('/');
            })
            .catch((err) => {
                dispatch.checkAuthorization(false);
                let message = "";
                const errors = err.response.data.errors;
                errors.map((error, index) => {
                    const last = index !== errors.length - 1 ? '\n\n' : '';
                    message += error += last;
                });
                alert(message);
            });
    }
    return (
        <>
            <h1 className="text-center my-5">ورود</h1>
            <Form onSubmit={submitHanlder} className="w-50 mx-auto">
                <Form.Group className="text-right">
                    <Form.Label>آدرس ایمیل</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="به طور مثال folan@gmail.com"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </Form.Group>
                <Form.Group className="text-right">
                    <Form.Label>گذرواژه</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="باید 8 رقم باشد"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">ورود</Button>
            </Form>
        </>
    )
}


export default Login;