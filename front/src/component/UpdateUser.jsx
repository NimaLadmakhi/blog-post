import Axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../hooks/useApp";

const UpdateUserModal = ({ show, toggle, userName, email, password }) => {
    const [updateUserName, changeUpdateUsername] = useState(userName);
    const [updateEmail, changeUpdateEmail] = useState(email);
    const [updatePassword, changeUpdatePassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const appDispatch = useAppDispatch();

    return (
        <Modal show={show} onHide={toggle}>
            <Modal.Header>
                <Modal.Title>ویرایش حساب کاربری</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    if (password === currentPassword) {
                        const formData = new FormData();
                        formData.append('userName', updateUserName);
                        formData.append('email', updateEmail);
                        formData.append('password', updatePassword.length >= 8 ? updatePassword : password);
                        appDispatch.updateUser({ userName: updateUserName, password: updatePassword.length >= 8 ? updatePassword : password, email: updateEmail });
                        toggle();
                        Axios.put('http://localhost:4000/users', formData, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(({ data }) => {
                                alert(data.message);
                            })
                            .catch((error) => {
                                console.log(error.response.data);
                            })
                    }
                    else {
                        alert('گذرواژه شما درست نمیباشد');
                    }

                }}>
                    <Form.Group className="text-right">
                        <Form.Label>نام کاربری</Form.Label>
                        <Form.Control value={updateUserName} onChange={(event) => changeUpdateUsername(event.target.value)} placeholder="به طور مثال mohammad" />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Form.Label>آدرس ایمیل</Form.Label>
                        <Form.Control value={updateEmail} onChange={(event) => changeUpdateEmail(event.target.value)} placeholder="به طور مثال mmd@gmail.com" />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Form.Label>گذرواژه فعلی</Form.Label>
                        <Form.Control value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="باید 8 رقم باشد" />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Form.Label>گذرواژه جدید</Form.Label>
                        <Form.Control value={updatePassword} onChange={(event) => changeUpdatePassword(event.target.value)} placeholder="به طور مثال 123456789" />
                    </Form.Group>
                    <Button type="submit">ویرایش حساب</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateUserModal;