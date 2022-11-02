import React, { useEffect, useState } from 'react';
import Menu from 'assets/svgs/menu.svg';
import Cancel from 'assets/svgs/cancel.svg';
import { Link, NavLink } from 'react-router-dom';
import 'assets/css/Nav.css';
import LoadingBox from 'components/messages/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from 'components/messages/MessageBox';
import { listProductCategories } from 'redux/actions/productActions';
import TopNav from './TopNav';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Search from 'sections/search/Search';

function Nav() {
  const [sidebar, setSidebar] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories({}));
  }, [dispatch]);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <div className="left">
          <div className="btn menu-btn">
            <img src={Menu} alt="" width="30" onClick={showSidebar} />
          </div>
          <div className="logo">
            <Link to="/">e-grocery.gr</Link>
          </div>
        </div>

        <div>
          <Route
            render={({ history }) => <Search history={history}></Search>}
          ></Route>
        </div>
        <TopNav />
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img src={Cancel} alt="" width="20" />
            </Link>
            <div className="logo">
              <Link to="/">e-grocery.gr</Link>
            </div>
          </li>

          {loadingCategories ? (
            <LoadingBox />
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            categories?.map((item, index) => {
              return (
                <>
                  <li key={index} className="nav-text">
                    <NavLink
                      to={`/search/category/${item}`}
                      className="desktop-item"
                    >
                      <span>{item}</span>
                    </NavLink>
                  </li>
                </>
              );
            })
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
