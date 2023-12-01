import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getStock');
        setStock(response.data); // Assuming the response is an array
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
            <th>siren</th>
            <th>nic</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(stock => {
            return (
              <tr key={stock._id}>
              <td>{stock.siren}</td>
              <td>{stock.nic}</td>
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
