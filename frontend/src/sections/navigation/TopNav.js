import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from 'redux/actions/userAction';
import CartIcon from 'assets/svgs/shopping-cart.svg';
import UserIcon from 'assets/svgs/user-icon.svg';
import 'assets/css/Nav.css';

function TopNav() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const menuToggle = () => {
    const toggleMenu = document.querySelector('.top-nav');
    toggleMenu.classList.toggle('active');
  };

  return (
    <div>
      <div className="container">
        <div className="nav-cart">
          <Link to="/cart">
            {cartItems.length > 0 && <span>{cartItems.length}</span>}
            <img src={CartIcon} alt="" width="30" />
          </Link>
        </div>

        <div className="topNav">
          <div className="login">
            <h4>
              {userInfo ? (
                <div className="wrap-infos">
                  <button className="profile" onClick={menuToggle}>
                    <img
                      src={UserIcon}
                      alt="user-icon"
                      width="30"
                      onMouseOver={menuToggle}
                    />
                  </button>
                  <div className="top-nav">
                    <h3>
                      <Link to="#">{userInfo.name}</Link>
                    </h3>
                    <ul>
                      {/* <li>
                        <Link to="/profile">Profile</Link>
                      </li> */}
                      <li>
                        <Link to="/signin" onClick={signoutHandler}>
                          Sign out
                        </Link>
                      </li>
                      <li>
                        <Link to="/orderHistory"> My Orders</Link>
                      </li>
                    </ul>
                    {userInfo && userInfo.isAdmin && (
                      <ul className="admin-dashboard">
                        <h3>Admin's Options</h3>
                        <li>
                          <Link to="/productList">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderList">Confirmed Orders</Link>
                        </li>
                        <li>
                          <Link to="/userList">Registered Users</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="register-login">
                  <Link to="/signin" className="signin">
                    Login/
                  </Link>
                  <Link to="/signup" className="signup">
                    Register
                  </Link>
                </div>
              )}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
