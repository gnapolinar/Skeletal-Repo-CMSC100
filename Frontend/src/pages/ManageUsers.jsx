import React, { useState, useEffect } from 'react';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
          setTotalUsers(data.length);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  

   const deleteUser = async (email) => {
  try {
    const response = await fetch(`http://localhost:4000/api/users/${email}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    setUsers(prevUsers => prevUsers.filter(user => user.email !== email));

    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

    
  
    return (
      <div>
        <h2>Total Registered Users: {totalUsers}</h2>
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
              <tr key={user.email}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  {user.userType === 'customer' && (
                    <button onClick={() => deleteUser(user.email)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


