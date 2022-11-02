import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Product from 'sections/products/Product';
import 'App.css';
import { listProducts } from 'redux/actions/productActions';
import { Pagination } from 'rsuite';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';

const pageSize = 7;
function SearchBox() {
  const [prev] = useState(true);
  const [next] = useState(true);
  const [activePage, setActivePage] = useState(1);

  const { title, category } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ title, category }));
  }, [category, dispatch, title]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (activePage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return products?.slice(firstPageIndex, lastPageIndex);
  }, [activePage, products]);

  return (
    <div>
      <div className="search-by-category">
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div id="product">
                {currentTableData.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pagination">
          <Pagination
            total={products?.length}
            prev={prev}
            next={next}
            maxButtons={5}
            limit={pageSize}
            activePage={activePage}
            onChangePage={(page) => setActivePage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
