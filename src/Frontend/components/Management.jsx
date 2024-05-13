import React, { useState } from 'react';

const Management = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', userType: 'Customer' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', userType: 'Customer' },
    { id: 3, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', userType: 'Admin' }
  ]);
  const [totalUsers] = useState(users.length);

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h2>User Management</h2>
      <p>Total Users: {totalUsers}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
                {user.userType === 'Admin' ? null : (
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Management;
