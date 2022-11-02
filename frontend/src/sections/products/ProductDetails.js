import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from 'redux/actions/productActions';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'App.css';

function ProductDetails(props) {
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(true);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productId = props.match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <section>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="single-products">
          <div className="left-side">
            <div className="image-details">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className="right-side">
            <div className="title-details">
              <h3>{product.title}</h3>
            </div>
            <div className="price-details">
              {product?.sales > 0 ? (
                <div className="sales-details-price">
                  <p>
                    <del>${product?.price}</del>
                  </p>
                  <h4>
                    $
                    {parseFloat(
                      (product?.price * product?.sales) / 100,
                    ).toFixed(2)}
                  </h4>
                </div>
              ) : (
                <div className="price-card">
                  <p>${product.price}</p>
                </div>
              )}
            </div>
            <div className="description">
              <p>
                {expanded
                  ? product?.description?.slice(0, 500)
                  : product?.description}
              </p>
              {product.description?.length > 500 && (
                <button onClick={() => setExpanded(!expanded)}>
                  {expanded ? '...Read More' : 'Read Less'}
                </button>
              )}
              {product.ingredient?.length > 0 && (
                <div className="nutrition-information">
                  <h3>Ingredients</h3>
                  <p>{product.ingredient}</p>
                </div>
              )}
            </div>
            <div className="action">
              {product.countInStock > 0 && (
                <>
                  <div className="qty">
                    <div className="selectQty">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              <button onClick={addToCartHandler}>Add to card</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
