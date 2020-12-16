import Axios from "axios";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
    const params = useParams();
    const [Post, setPost] = useState();
    const postId = params.id;
    useEffect(() => {
        Axios.get(`http://localhost:4000/posts/${postId}`)
            .then(({ data }) => setPost(data.post))
            .catch((error) => console.log(error.response.data))
    }, []);
    if (Post) {
        return (
            <div className="mb-5 post text-right">
                <img className="mb-5 post-image" src={`http://localhost:4000/images/${Post.imageUrl}`} />
                <h1>{Post.title}</h1>
                <p className="lead">{Post.body}</p>
                <p className="text-muted text-small" style={{ direction: 'ltr' }}>{moment(Post.createdAt).locale('fa').format('YYYY/MM/DD HH:mm:ss')}</p>
                <div className="d-flex justify-content-first align-items-center">
                    <img className="image-user" src={`http://localhost:4000/images/${Post.sender.imageUrl}`} />
                    <div>
                        <p className="lead mb-0 mr-5">{Post.sender.userName}</p>
                        <p className="lead mb-0 mr-5">{Post.sender.email}</p>
                    </div>
                </div>
            </div>
        )
    }
    return <p>loading ...</p>
}


export default SinglePost;