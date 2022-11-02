import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserOrder } from 'redux/actions/orderActions';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import 'assets/css/Shipping.css';

function OrderHistory(props) {
  const orderUserList = useSelector((state) => state.orderUserList);
  const { loading, orders, error } = orderUserList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUserOrder());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="row">
        <h1>My Orders</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : orders?.length === 0 ? (
        <MessageBox>Orders Not Found</MessageBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table id="myTable" className="myTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="table-tr">
                <td data-label="ID">{order._id.substring(2, 10)}</td>
                <td data-label="DATE">{order.createdAt.substring(0, 10)}</td>
                <td data-label="TOTAL">${order.totalPrice}</td>
                <td data-label="PAID">
                  {order.isPaid ? order.paidAt?.substring(0, 10) : 'No'}
                </td>
                <td data-label="DELIVERED">
                  {order.isDelivered
                    ? order.deliveredAt?.substring(0, 10)
                    : 'No'}
                </td>
                <td dtata-label="ACTION">
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
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

export default OrderHistory;
