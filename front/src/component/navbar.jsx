import { Nav, Navbar as NavContainer, NavItem, NavLink as Link } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useAppState } from "../hooks/useApp";

const CheckIfLogin = ({ children }) => {
    const AppState = useAppState();
    if (AppState) {
        if (AppState.isLoggin) {
            if (AppState.user.email) {
                return children;
            }
            return null;
        } else {
            return children;
        }
    }

    return null;
}

const Navbar = () => {
    const AppState = useAppState();

    const navRight = [
        { exact: true, to: "/", children: 'خانه' },
        { exact: true, to: "/add-post", children: 'ساخت پست' },
    ];

    const NavLeft = {
        notSave: [{ exact: true, to: '/login', children: 'ورود' }, { exact: true, to: '/signup', children: 'ثبت نام' }],
        save: [{ exact: true, to: '/dashboard', children: 'حساب کاربری' }, { exact: true, to: '/', children: AppState && AppState.isLoggin && AppState.user.email }]
    };


    const NavLeftProperty = AppState && AppState.isLoggin ? 'save' : 'notSave';

    return (
        <NavContainer variant="light" className="mb-5" bg="dark">
            <CheckIfLogin>
                <Nav className="header-nav">
                    {navRight.map((element) => (
                        <NavItem className="ml-3">
                            <Link>
                                <NavLink {...element} activeClassName="active" />
                            </Link>
                        </NavItem>
                    ))}
                </Nav>
                <Nav className="mr-auto header-nav">
                    {NavLeft[NavLeftProperty].map((element) => (
                        <NavItem className="mr-3">
                            <Link>
                                <NavLink {...element} activeClassName="active" />
                            </Link>
                        </NavItem>
                    ))}
                </Nav>
            </CheckIfLogin>
        </NavContainer >
    );
};


export default Navbar;