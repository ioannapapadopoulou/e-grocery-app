import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'rsuite';

import {
  createProduct,
  listProducts,
  deleteProduct,
} from 'redux/actions/productActions';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from 'redux/constants/productConstants';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/DashboardAdmin.css';
import Delete from 'assets/svgs/delete.svg';

let pageSize = 7;

function ProductsAdmin(props) {
  const [prev] = useState(true);
  const [next] = useState(true);
  const [activePage, setActivePage] = useState(1);

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/products/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [
    dispatch,
    createdProduct,
    successCreate,
    props.history,
    sellerMode,
    userInfo._id,
    successDelete,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const AddProduct = () => {
    dispatch(createProduct());
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (activePage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return products?.slice(firstPageIndex, lastPageIndex);
  }, [activePage, products]);

  return (
    <div className="dashboard">
      <div className="row">
        <h1>
          Products
          <button
            type="button"
            className="add-new-product"
            title="Add New Product"
            onClick={AddProduct}
          >
            +
          </button>
        </h1>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table id="myTable" className="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((product) => (
                <tr key={product._id} className="table-tr">
                  <td data-label="ID">{product.pk}</td>
                  <td data-label="TITLE">{product.title}</td>
                  <td data-label="CATEGORY">{product.category}</td>
                  <td data-label="PRICE">${product.price}</td>
                  <td data-label="ACTION">
                    <button
                      onClick={() =>
                        props.history.push(`/products/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button>
                      <img
                        src={Delete}
                        width="17"
                        alt="delete button"
                        onClick={() => deleteHandler(product)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
}

export default ProductsAdmin;
