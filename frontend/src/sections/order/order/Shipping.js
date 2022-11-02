import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { saveShippingInfo } from 'redux/actions/cartActions';
import 'assets/css/Shipping.css';

function Shipping(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const dispatch = useDispatch();

  const submitHandler = (initialValues) => {
    const shippingValues = {
      name: initialValues.name,
      address: initialValues.address,
      city: initialValues.name,
      postalCode: initialValues.postalCode,
      country: initialValues.country,
    };
    dispatch(saveShippingInfo(shippingValues));
    props.history.push('/payment');
  };

  return (
    <Formik
      initialValues={{
        name: shippingInfo?.name ?? '',
        address: shippingInfo?.address ?? '',
        city: shippingInfo?.city ?? '',
        postalCode: shippingInfo?.postalCode ?? '',
        country: shippingInfo?.country ?? '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        postalCode: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
      })}
      onSubmit={submitHandler}
    >
      {({ errors, touched, isValid, dirty, isSubmitting, handleChange }) => (
        <div className="shipping">
          <Form className="shipping-form">
            <h3>payment adress</h3>
            <div class="inputbox">
              <Field
                name="name"
                type="text"
                placeholder="First and Last Name"
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <div className="error-validation">{errors.name}</div>
              )}
            </div>
            <div className="inputbox">
              <Field
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleChange}
              />
              {errors.address && touched.address && (
                <div className="error-validation">{errors.address}</div>
              )}
            </div>
            <div className="inputbox">
              <Field
                name="city"
                type="text"
                placeholder="City"
                onChange={handleChange}
              />
              {errors.city && touched.city && (
                <div className="error-validation">{errors.city}</div>
              )}
            </div>
            <div className="inputbox">
              <Field
                name="postalCode"
                type="text"
                placeholder="Postal Code"
                onChange={handleChange}
              />
              {errors.postalCode && touched.postalCode && (
                <div className="error-validation">{errors.postalCode}</div>
              )}
            </div>
            <div className="inputbox">
              <Field
                name="country"
                type="text"
                placeholder="Country"
                onChange={handleChange}
              />
              {errors.country && touched.country && (
                <div className="error-validation">{errors.country}</div>
              )}
            </div>
            <div className="shipping-button">
              <button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
              >
                Continue
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Shipping;
