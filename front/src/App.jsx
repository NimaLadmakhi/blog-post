import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useAppState } from "./hooks/useApp";
import { useAuth } from "./hooks/useAuth";
import NavbarLayout from "./layout/NavbarLayout";
import NotFound from "./pages/404";
import AddPost from "./pages/AddPost";
import Dashbaord from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SinglePost from "./pages/SinglePost";


const App = () => {
    const AppState = useAppState();
    useAuth(AppState && AppState.isLoggin);

    if (AppState) {
        return (
            <Router>
                <NavbarLayout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/dashboard" component={Dashbaord} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/post/:id" component={SinglePost} />
                        <Route path="/add-post" render={() => {
                            if (AppState.isLoggin) {
                                return <AddPost />
                            }

                            return <Redirect to="/login" />
                        }} />
                        <Route exact component={NotFound} />
                    </Switch>
                </NavbarLayout>
            </Router>
        );
    } else {
        return <p>Loading Component ...</p>;
    }
};


export default App;