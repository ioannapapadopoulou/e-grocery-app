import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from 'sections/products/Product';
import MessageBox from 'components/messages/MessageBox';
import LoadingBox from 'components/messages/LoadingBox';
import { listProducts } from 'redux/actions/productActions';
import 'assets/css/Card.css';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div id="product">
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
