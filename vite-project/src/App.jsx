import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUsers');
        setUser(response.data); // Assuming the response is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
          users.map(user => {
            return (
              <tr key={user.name}>
              <td>{user.email}</td>
            </tr>
            );
          }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
