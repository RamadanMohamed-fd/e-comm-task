import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiUserPin,BiLogOut,BiCog,BiLogIn } from "react-icons/bi";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";
import AuthContext from '../store/auth-context';
import { useContext } from "react";
const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };
  console.log(isLoggedIn)
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Ramadan</Link>
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 350 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
        <Nav >
          <Dropdown >
            <Dropdown.Toggle variant="success"  >
              <FaShoppingCart color="white" fontSize="24px"  style={{marginRight:'10px'}} />
              <Badge style={{marginRight:'10px',fontSize:'15px'}}>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370,marginLeft:'-255px' }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>$ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        
        <Nav >
          <Dropdown >
            <Dropdown.Toggle variant="success"  >
              <BiUserPin color="white" fontSize="24px"  style={{marginRight:'10px'}} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 120,marginLeft:'-10px',marginTop:"4px" }}>
            {!isLoggedIn && (
            <li>
              <Link to='/auth'>
              <BiLogIn fontSize="24px"  style={{margin:"0px 5px",color:'#222' }} />
                    <span style={{color:'#222', }}>Login </span>
              </Link>
            </li>
          )}
            {isLoggedIn && (
            <li>
              <Link to='/profile'>
              <BiCog fontSize="24px"  style={{margin:"5px 5px",color:'#222' }} />
                    <span style={{color:'#222', }}>Setting</span>
              </Link>
            </li>
          )}
           {isLoggedIn && (
            <li>
              <div onClick={logoutHandler}>
              <BiLogOut fontSize="24px"  style={{margin:"10px 5px",color:'#222',cursor:'pointer' }} />
                    <span style={{color:'#222',cursor:'pointer' }}>Logout</span>
              </div>
            </li>
          )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>   
      </Container>
    </Navbar>
  );
};

export default Header;
