import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from 'redux/actions/cartActions';
import 'assets/css/Shipping.css';

function Payment(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  if (!shippingInfo.address) {
    props.history.push('/shipping');
  }

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div className="shipping">
      <form className="form-box" onSubmit={submitHandler}>
        <h2>Payment</h2>
        <label>
          <input
            type="radio"
            id="Paypal"
            name="paymentMethod"
            value="PayPal"
            checked
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="circle"></div>
          <span>PayPal</span>
        </label>
        <label>
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="Credit card"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="circle"></div>
          <span>Debit/Credit Card</span>
        </label>
        <button type="submit">
          <h4>Continue</h4>
        </button>
      </form>
    </div>
  );
}

export default Payment;
