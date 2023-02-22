import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from 'redux/actions/userAction';
import 'assets/css/Form.css';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';

function Signup(props) {
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error } = userSignup;

  const dispatch = useDispatch();

  const submitHandler = (initialValues) => {
    if (initialValues) {
      dispatch(
        register(
          initialValues.name,
          initialValues.email,
          initialValues.password,
        ),
      );
      props.history.push('/signin');
    }
  };
  return (
    <Formik
      initialValues={{ name: '', password: '', email: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Password is too short - should be 8 chars minimum')
          .matches(/(?=.*[0-9])/, 'Password must contain a number'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf(
            [Yup.ref('password'), null],
            'Confirm Password does not match',
          ),
      })}
      onSubmit={submitHandler}
    >
      {({ errors, touched, isValid, dirty, isSubmitting, handleChange }) => (
        <section className="section-form">
          <div className="form-signup">
            <Form className="form-details">
              <header className="header">
                <h2>Sign up</h2>
              </header>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}

              <div className="inputs">
                <Field
                  name="name"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <div className="error-validation">{errors.name}</div>
                )}

                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                />

                {errors.email && touched.email && (
                  <div className="error-validation">{errors.email}</div>
                )}

                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="error-validation">{errors.password}</div>
                )}
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error-validation">
                    {errors.confirmPassword}
                  </div>
                )}

                <button disabled={!(dirty && isValid)}>Sign up</button>

                <footer-2>
                  <p>
                    You have an account? <Link to="/signin">Signin</Link>
                  </p>
                </footer-2>
              </div>
            </Form>
          </div>
        </section>
      )}
    </Formik>
  );
}

export default Signup;
