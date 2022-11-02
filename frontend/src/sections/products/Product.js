import React from 'react';
import { Link } from 'react-router-dom';
import 'App.css';

function Product(props) {
  const { product } = props;

  return (
    <div className="card" key={product._id}>
      {product.sales > 0 && (
        <div className="discount">
          <h3>-{product.sales}% off!</h3>
        </div>
      )}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="box">
        <div className="row">
          <h3>{product.title}</h3>
          {product.sales > 0 ? (
            <div className="sales-price">
              <h4>${product.price}</h4>
              <h3>
                ${parseFloat((product.price * product.sales) / 100).toFixed(2)}
              </h3>
            </div>
          ) : (
            <>
              <h3>${product.price} </h3>
            </>
          )}
          <div className="btn">
            <Link to={`/product/${product._id}`}>Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
