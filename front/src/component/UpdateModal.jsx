import Axios from "axios";
import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../hooks/useApp";

const UpdateModelPost = ({ _id, title, body, show, imageUrl }) => {
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateBody, setUpdateBody] = useState(body);
    const imageRef = useRef();
    const appDispatch = useAppDispatch();


    return (
        <Modal show={show} onHide={() => {
            appDispatch.openDialog(_id, false);
        }}>
            <Modal.Header>
                <Modal.Title>ویرایش پست مورد نظر</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    appDispatch.updatePost(_id, { title: updateTitle, body: updateBody });
                    appDispatch.openDialog(_id, false);

                    const formData = new FormData();
                    formData.append('title', updateTitle);
                    formData.append('body', updateBody);
                    formData.append('imageUrl', imageRef.current.files[0] || imageUrl);

                    Axios.put(`http://localhost:4000/posts/${_id}`, formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(({ data }) => alert(data.message))
                        .catch((error) => console.log(error));
                }}>
                    <Form.Group className="text-right">
                        <Form.Label>موضوع</Form.Label>
                        <Form.Control value={updateTitle} onChange={event => setUpdateTitle(event.target.value)} type="text" placeholder="موضوع پست مورد نظر" />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Form.Label>توضیحات</Form.Label>
                        <Form.Control value={updateBody} onChange={event => setUpdateBody(event.target.value)} type="text" as="textarea" rows="10" placeholder="توضیحات پست مورد نظر" />
                    </Form.Group>
                    <Form.Group className="text-right">
                        <Form.Label>عکس پست</Form.Label>
                        <Form.File ref={imageRef} />
                    </Form.Group>
                    <Button type="submit">ویرایش</Button>
                </Form>
            </Modal.Body>
        </Modal >
    )
}


export default UpdateModelPost;