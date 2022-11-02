import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from 'redux/actions/userAction';
import userIcon from 'assets/svgs/user-color.svg';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import { USER_UPDATE_RESET } from 'redux/constants/userConstants';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, password, email }));
    }
  };

  return (
    <section>
      <div className="form-signup">
        <form onSubmit={submitHandler} className="form-details">
          <span>
            <img src={userIcon} alt="user" width="50" />
          </span>
          <header className="header">
            <h2>User's Profile</h2>
          </header>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="alert-danger">{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <div className="inputs">
                <input
                  type="text"
                  placeholder="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  disabled="disabled"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button>Update</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default UserProfile;
