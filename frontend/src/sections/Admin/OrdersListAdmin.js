import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteOrder, listOrders } from 'redux/actions/orderActions';

import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';

import Delete from 'assets/svgs/delete.svg';
import { ORDER_DELETE_RESET } from 'redux/constants/orderConstants';

function OrdersListAdmin(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });

    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const OrderdeleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div className="dashboard">
      <div className="row">
        <h1>Confirmed Orders</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : orders.length === 0 ? (
        <MessageBox variant="info-alert">Orders Not Found</MessageBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table id="myTable" className="myTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="table-tr">
                <td data-label="ID">{order._id.substring(0, 10)}</td>
                <td data-label="USER">{order.shippingInfo.name}</td>
                <td data-label="DATE">{order.createdAt.substring(0, 10)}</td>
                <td data-label="TOTAL">{order.totalPrice.toFixed(2)}</td>
                <td data-label="PAID">
                  {order.isPaid ? order.paidAt?.substring(0, 10) : 'No'}
                </td>
                <td data-label="DELIVERED">
                  {order.isDelivered
                    ? order.deliveredAt?.substring(0, 10)
                    : 'No'}
                </td>
                <td data-label="ACTIONS">
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button>
                    <img
                      src={Delete}
                      width="17"
                      alt="delete button"
                      onClick={() => OrderdeleteHandler(order)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersListAdmin;
