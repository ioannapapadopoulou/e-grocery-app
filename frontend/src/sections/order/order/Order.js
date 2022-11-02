import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from 'redux/constants/orderConstants';
import {
  deliverdOrder,
  detailsOrder,
  payOrder,
} from 'redux/actions/orderActions';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/Shipping.css';

function Order(props) {
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = props.match.params.id;

  const OrderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = OrderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDeliver = useSelector((state) => state.orderDeliver);

  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successDeliver, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverOrderHandler = () => {
    dispatch(deliverdOrder(order._id));
  };

  return (
    <section className="place-order">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="">
          <div className="order-items">
            <div className="number-order">
              <h4>Order Number: {order._id.substring(4, 10)}</h4>
              <p>{order.createdAt.substring(0, 10)}</p>
            </div>
            <div className="flex-container">
              <div className="placeOrder-header">
                <h3>Payment/Shipping Info</h3>
              </div>
              <table>
                <tr>
                  <td>Shipping Name</td>
                  <td>{order.shippingInfo.name}</td>
                </tr>
                <tr>
                  <td>Shipping Address</td>
                  <td>
                    {order.shippingInfo.address},{order.shippingInfo.city},
                    {order.shippingInfo.postalCode},{order.shippingInfo.country}
                  </td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>{order.paymentMethod}</td>
                </tr>
                <tr>
                  <td>Delivered Status</td>
                  <td>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.updatedAt.substring(0, 10)}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </td>
                </tr>
              </table>
            </div>

            <div className="flex-container">
              <div className="placeOrder-header">
                <h3>Summary of Order</h3>
              </div>
              <table>
                <tr>
                  <td>Cart subtotal</td>
                  <td>${order.itemsPrice}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>${order.shippingPrice}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>${order.totalPrice}</td>
                </tr>
                <tr>
                  <td>PAY</td>
                  <td>
                    {!order.isPaid && (
                      <>
                        <div className="paypal">
                          {!sdkReady ? (
                            <LoadingBox></LoadingBox>
                          ) : (
                            <>
                              {errorPay && (
                                <MessageBox variant="danger">
                                  {errorPay}
                                </MessageBox>
                              )}
                              {loadingPay && <LoadingBox></LoadingBox>}
                              <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                              ></PayPalButton>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <td>
                        {loadingDeliver && <LoadingBox></LoadingBox>}
                        {errorDeliver && (
                          <MessageBox variant="danger">
                            {errorDeliver}
                          </MessageBox>
                        )}
                        <button
                          type="button"
                          className="deliver-order-button"
                          onClick={deliverOrderHandler}
                        >
                          Deliver Order
                        </button>
                      </td>
                    )}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Order;
