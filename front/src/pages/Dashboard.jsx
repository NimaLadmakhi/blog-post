import Axios from "axios";
import { useRef, useState } from "react";
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UpdateModelPost from "../component/UpdateModal";
import UpdateUserModal from "../component/UpdateUser";
import { useAppDispatch, useAppState } from "../hooks/useApp";

const Dashbaord = () => {
    const appState = useAppState();
    const appDispatch = useAppDispatch();
    const history = useHistory();
    const [isOpenUpdateUser, changeUpdateUserModal] = useState(false);
    const imageRef = useRef();
    const myImageRef = useRef();
    if (appState.user && appState.user.userName) {
        return (
            <div>
                <UpdateUserModal show={isOpenUpdateUser} toggle={() => changeUpdateUserModal(false)} {...appState.user} />
                <Row>
                    <Col xl="5" md="5" sm="12">
                        <Card>
                            <Card.Body>
                                <Card.Title>{appState.user.userName}</Card.Title>
                                <Card.Text>{appState.user.email}</Card.Text>
                                <Card.Text>{appState.user.password}</Card.Text>
                                <Button onClick={() => changeUpdateUserModal(true)}>Update</Button>
                            </Card.Body>
                        </Card>
                        <label style={{ width: '100%' }} htmlFor="profile">
                            <img ref={myImageRef} style={{ width: '100%', marginTop: 50 }} src={`http://localhost:4000/images/${appState.user.imageUrl}`} />
                            <input onChange={event => {
                                if (event.target.files[0]) {
                                    myImageRef.current.src = URL.createObjectURL(imageRef.current.files[0]);
                                    const formData = new FormData();
                                    formData.append('imageUrl', imageRef.current.files[0]);
                                    Axios.put('http://localhost:4000/users', formData, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('token')}`
                                        }
                                    }).then(() => {
                                        alert('عکس پروفایل شما با موفقیت ویرایش دشد')
                                    })
                                        .catch((error) => console.log(error.response.data))
                                }
                            }} ref={imageRef} type="file" id="profile" hidden />
                        </label>
                        <Button onClick={() => {
                            localStorage.removeItem('token');
                            appDispatch.checkAuthorization(false);
                            appDispatch.updateUser(undefined);
                            history.replace('/');
                            alert('با موفقیت از حساب کاربری خود خارج شدید');
                        }}>خروج از حساب کاربری</Button>
                    </Col>
                    <Col xl="7" md="7" sm="12">
                        <ListGroup>
                            {appState.user.postsCollection.map((element) => {
                                return (<div key={element._id}>
                                    <UpdateModelPost {...element} />
                                    <ListGroupItem className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span onClick={() => {
                                                const id = element._id;
                                                Axios.delete(`http://localhost:4000/posts/${id}`, {
                                                    headers: {
                                                        Authorization: `Bearer ${localStorage.getItem('token')}`
                                                    }
                                                })
                                                    .then(({ data }) => {
                                                        appDispatch.deletePost(id);
                                                        alert(data.message)
                                                    })
                                                    .catch((error) => {
                                                        console.log(error.response.data);
                                                    })
                                            }}>حذف</span>
                                            <span className="mx-3" onClick={() => {
                                                appDispatch.openDialog(element._id);
                                            }}>ویرایش</span>
                                            <span onClick={() => {
                                                history.push(`/post/${element._id}`);
                                            }}>نمایش</span>
                                        </div>
                                        <span>{element.title}</span>
                                    </ListGroupItem>
                                </div>)
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    } else {
        return <p>loading ...</p>
    }
};


export default Dashbaord;