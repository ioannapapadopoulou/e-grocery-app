import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from 'redux/actions/orderActions';
import { ORDER_RESET } from 'redux/constants/orderConstants';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/Shipping.css';

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 10.893 => "10.89" => 10.893
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, b) => a + b.qty * b.price, 0),
  );
  cart.shippingPrice = cart.Price > 50 ? toPrice(0) : toPrice(7);
  cart.taxPrice = toPrice(0.24 * cart.itemsPrice);
  cart.totalPrice = Number(
    (cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2),
  );

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_RESET });
    }
  }, [dispatch, order, success, props.history]);

  return (
    <section className="place-order">
      <div className="flex-container">
        <div className="placeOrder-header">
          <h3>Payment/Shipping Info</h3>
        </div>
        <table>
          <tr>
            <td>Shipping Name</td>
            <td>{cart.shippingInfo.name}</td>
          </tr>
          <tr>
            <td>Shipping Address</td>
            <td>
              {cart.shippingInfo.address},{cart.shippingInfo.city},
              {cart.shippingInfo.postalCode},{cart.shippingInfo.country}
            </td>
          </tr>
          <tr>
            <td>Payment Method</td>
            <td>{cart.paymentMethod}</td>
          </tr>
          <tr></tr>
        </table>
      </div>

      <div className="flex-container">
        <div className="placeOrder-header">
          <h3>Shopping Cart</h3>
        </div>
        <table>
          {cart.cartItems.length === 0 ? (
            <MessageBox>No Product Found</MessageBox>
          ) : (
            cart.cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} width="15%" />
                </td>
                <td>{item.title}</td>
                <td>
                  {item.qty} x {item.price} = ${item.price * item.qty}
                </td>
              </tr>
            ))
          )}
        </table>
      </div>

      <div className="flex-container">
        <div className="placeOrder-header">
          <h3>Summary of Order</h3>
        </div>
        <table>
          <tr>
            <td>Cart subtotal</td>
            <td>${cart.itemsPrice}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>${cart.shippingPrice}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>${cart.taxPrice}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${cart.totalPrice}</td>
          </tr>

          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox>{error}</MessageBox>}
        </table>
        <div className="button-order">
          <button
            type="button"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default PlaceOrder;
