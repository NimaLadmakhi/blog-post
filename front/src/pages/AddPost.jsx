import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../hooks/useApp";

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const imageRef = useRef();
    const appDispatch = useAppDispatch();
    const history = useHistory();


    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            if (imageRef.current.files[0]) {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('body', description);
                formData.append('imageUrl', imageRef.current.files[0]);
                axios.post('http://localhost:4000/posts', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(({ data }) => {
                        appDispatch.addNewPost(data.post);
                        alert('پست مورد نظر با موفقیت ساخته شد');
                        history.push('/');
                    })
                    .catch((error) => {
                        let message = "";
                        const errors = error.response.data.errors;
                        errors.map((error, index) => {
                            const last = index !== errors.length - 1 ? '\n\n' : '';
                            message += error += last;
                        });
                        alert(message);
                    })
            } else {
                alert('لطفا عکس مورد نظر خود را انتخاب نمایید');
            }
        }}>
            <Form.Group className="text-right">
                <Form.Label>موضوع</Form.Label>
                <Form.Control value={title} onChange={event => setTitle(event.target.value)} type="text" placeholder="موضوع پست خود را وارد نمایید" />
            </Form.Group>
            <Form.Group className="text-right">
                <Form.Label>توضیحات</Form.Label>
                <Form.Control value={description} onChange={event => setDescription(event.target.value)} as="textarea" rows="10" type="text" placeholder="توضیحات پست خود را وارد نمایید" />
            </Form.Group>
            <Form.Group className="text-right">
                <Form.Label>عکس پست</Form.Label>
                <Form.File ref={imageRef} />
            </Form.Group>
            <Button type="submit">ساخت پست</Button>
        </Form >
    )
};


export default AddPost;