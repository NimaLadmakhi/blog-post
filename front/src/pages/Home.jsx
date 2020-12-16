import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppState } from "../hooks/useApp";
import { usePosts } from "../hooks/usePosts";

const Home = () => {
    usePosts();
    const appState = useAppState();
    if (appState.posts) {
        return (
            <div>
                <h1>Home component</h1>
                <ListGroup>
                    {appState.posts.map((element) => {
                        return (
                            <ListGroupItem key={element._id}>
                                <Link to={`/post/${element._id}`} className="text-right d-flex justify-content-between align-items-center text-dark text-decoration-none">
                                    <span>{element.title}</span>
                                    <span>{element.sender.userName}</span>
                                </Link>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        )
    } else {
        return <p>loading ...</p>
    }
}


export default Home;