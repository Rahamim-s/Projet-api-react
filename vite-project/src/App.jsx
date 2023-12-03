import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [stocks, setStocks] = useState([]);
    const [searchSiret, setSearchSiret] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getStocks');
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/getStockBySiret/${searchSiret}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error searching by SIRET:', error);
            setSearchResult(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label>
                    Search by SIRET:
                    <input type="text" value={searchSiret} onChange={(e) => setSearchSiret(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>

            {searchResult && (
                <div>
                    <h2>Informations</h2>
                    <p><strong>SIREN:</strong> {searchResult.siren}</p>
                    <p><strong>SIRET:</strong> {searchResult.siret}</p>
                    <p><strong>NIC:</strong> {searchResult.nic}</p>
                    {/* Ajoute d'autres champs si nécessaire */}
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>siret</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult ? (
                        <tr>
                            <td>{searchResult.siret}</td>
                        </tr>
                    ) : (
                        stocks.map(stock => (
                            <tr key={stock._id}>
                                <td>{stock.siret}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
