import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BiLogIn } from "react-icons/bi";

const Cart = () => {
  const [Checkout,setCheckout]=useState('Proceed to Checkout')
  const [CheckoutColor,setCheckoutColor]=useState('primary')
  const checkoutHandling=()=>{
    setCheckout('Done');
    setCheckoutColor('success')
  }
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button variant={CheckoutColor}  type="button" disabled={cart.length === 0||!isLoggedIn} onClick={checkoutHandling}>
          {Checkout}
        </Button>
        {!isLoggedIn&&
          <div style={{margin:"30px auto",color:'#222',backgroundColor:'white',padding:'10px 20px'}}>
            <Link to='/auth' >
              <BiLogIn fontSize="24px"  style={{margin:"0px 5px",color:'#222'}} />
                    <span style={{color:'#222', }}>Login First</span>
           </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
