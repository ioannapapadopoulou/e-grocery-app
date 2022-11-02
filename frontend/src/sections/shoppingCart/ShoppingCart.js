import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from 'redux/actions/cartActions';
import { removeItem } from 'redux/actions/cartActions';
import MessageBox from 'components/messages/MessageBox';
import Delete from 'assets/svgs/delete.svg';
import 'assets/css/ShoppingCart.css';

export default function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalPrice = Number(
    cartItems.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };
  const checkOutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="shopping-cart">
      <div className="cart-row">
        <div className="title">Shopping Bag</div>
        {cartItems.length === 0 ? (
          <MessageBox>
            <div className="message">
              Cart is empty.
              <Link to="/">Go for Shopping</Link>
            </div>
          </MessageBox>
        ) : (
          <div className="cart-container">
            <div className="table">
              <table id="myTable" className="myTable-cart">
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Remove</th>
                </tr>
                <>
                  {cartItems.map((item) => (
                    <tr key={item.product}>
                      <td>
                        <div className="img-prdct">
                          <img src={item.image} alt={item.title} width="25%" />
                        </div>
                      </td>
                      <td>
                        <Link to={`/product/${item.product}`}>
                          <h3>{item.title}</h3>
                        </Link>
                      </td>
                      <td>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value)),
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div className="price-cart">
                          {item.sales > 0 ? (
                            <div className="price">
                              <p>
                                $
                                {parseFloat(
                                  (item.price * item.qty * item.sales) / 100,
                                ).toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <div className="price">
                              <p>
                                ${parseFloat(item.price * item.qty).toFixed(2)}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <p
                          type="button"
                          onClick={() => removeItemHandler(item.product)}
                        >
                          <img src={Delete} width="25" alt="Delete button" />
                        </p>
                      </td>
                    </tr>
                  ))}
                </>
              </table>
            </div>
            <div className="total">
              <h4>TOTAL: ${totalPrice}</h4>
              <button
                type="button"
                onClick={checkOutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
