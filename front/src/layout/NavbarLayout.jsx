import { Container } from "react-bootstrap";
import Navbar from "../component/navbar";

const NavbarLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container>
                {children}
            </Container>
        </>
    );
}

export default NavbarLayout;