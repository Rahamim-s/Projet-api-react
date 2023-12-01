import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [stocks, setStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getstocks');
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
          </tr>
        </thead>
        <tbody>
          {
          stocks.map(stock => {
            return (
              <tr>
              <td>{stock.siren}</td>
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
