import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProductSales } from 'redux/actions/productActions';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/Card.css';

export default function ProductOnSale() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const productSalesList = useSelector((state) => state.productSalesList);
  const {
    loading: loadingSale,
    error: errorSale,
    salesCategories,
  } = productSalesList;

  useEffect(() => {
    dispatch(listProductSales());
  }, [category, dispatch]);

  return (
    <div>
      <div className="header-sales">
        <h2>Sales over -10%</h2>
        <h4>Mega Sales!</h4>
      </div>
      {loadingSale ? (
        <LoadingBox></LoadingBox>
      ) : errorSale ? (
        <MessageBox>{errorSale}</MessageBox>
      ) : (
        <>
          <div id="product">
            {salesCategories.map((cat) => (
              <div className="card" key={cat._id}>
                <div className="discount">
                  <h3>-{cat.sales}% off!</h3>
                </div>
                <Link to={`/product/${cat._id}`}>
                  <img src={cat.image} alt={cat.title} />
                </Link>
                <div className="box">
                  <div className="row">
                    <h2>{cat.title}</h2>
                    <span>
                      $<del>{cat.price}</del>
                    </span>
                    <span className="priceSale">
                      {parseFloat(cat.price * (cat.sales / 100)).toFixed(2)}
                    </span>
                  </div>
                  <Link to={`/product/${cat._id}`}>
                    <button>Add to card</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
