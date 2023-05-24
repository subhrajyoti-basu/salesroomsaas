import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/fetchRooms";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const data = await getAllUsers();
    setUsers(data.users);
  };

  // activate account
  const activateAccount = async (userId) => {
    try {
      const url = `${
        import.meta.env.VITE_API_ADDRESS
      }/admin/activate-user/${userId}`;
      const { data: res } = await axios({
        method: "PUT",
        url: url,
        headers: {
          authorization: localStorage.token,
          "Content-Type": "application/json",
        },
      });
      // console.log(res)
      getUsers();
      return res;
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container mx-auto px-5">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Users</h3>
        <div className="w-full mt-5">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>email</th>
                <th>username</th>
                <th>role</th>
                <th>active status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => {
                return (
                  <tr key={i} className="text-center h-10">
                    <td>{user.email}</td>
                    <td>@{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.account_status == "inactive" ? (
                        <button
                          onClick={() => activateAccount(user._id)}
                          className="btn"
                        >
                          activate
                        </button>
                      ) : (
                        "active"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
