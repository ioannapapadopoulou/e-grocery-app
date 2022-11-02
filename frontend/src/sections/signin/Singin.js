import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { signin } from 'redux/actions/userAction';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/Form.css';

function Singin(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(signin(values.email, values.password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={submitHandler}
    >
      {({ errors, touched, values, dirty, handleChange, isValid }) => (
        <section className="section-form">
          <div className="form">
            <Form className="form-details">
              <header className="header">
                <h2>Sign in</h2>
              </header>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div className="inputs">
                <Field
                  name="email"
                  type="email"
                  placeholer="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className="error-validation">{errors.email}</div>
                )}
                <Field
                  name="password"
                  type="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="error-validation">{errors.password}</div>
                )}
              </div>
              <button disabled={!(dirty && isValid)}>Sign in</button>
            </Form>
            <footer-2>
              <p>New customer? </p>
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>
            </footer-2>
          </div>
        </section>
      )}
    </Formik>
  );
}

export default Singin;
