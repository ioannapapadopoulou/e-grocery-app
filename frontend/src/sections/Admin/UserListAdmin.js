import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUser } from 'redux/actions/userAction';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';
import { USER_DELETE_RESET } from 'redux/constants/userConstants';
import Delete from 'assets/svgs/delete.svg';

export default function UserListAdmin() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUser());
  }, [dispatch, successDelete]);

  const userDeleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div className="dashboard">
      <div className="row">
        <h1>Registered Users</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table id="myTable" className="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="table-tr">
                  <td data-label="ID">{user._id.substring(5, 10)}</td>
                  <td data-label="NAME">{user.name}</td>
                  <td data-label="EMAIL">{user.email}</td>
                  <td data-label="iS ADMIN">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td data-label="ACTION">
                    <button>
                      <img
                        src={Delete}
                        width="20"
                        alt="delete button"
                        onClick={() => userDeleteHandler(user)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
