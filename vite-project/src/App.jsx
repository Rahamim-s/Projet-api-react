import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [searchSiret, setSearchSiret] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/getStockBySiret/${searchSiret}`);
            setSearchResult(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error searching by SIRET:', error);
            setSearchResult(null);
            setErrorMessage('Le SIRET recherché n\'existe pas, veuillez vous assurer de la recherche.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteStock/${searchSiret}`);
            setSearchResult(null);

            if (response.data.message) {
                setDeleteMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting stock:', error);
            setDeleteMessage('Error deleting stock. Please try again.');
        }
    };

    const handleDownloadLogs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/downloadLogs', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'logs.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading logs:', error);
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
            {deleteMessage && <p>{deleteMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {searchResult && Object.keys(searchResult).length > 0 && (
                <div>
                    <h2>Informations</h2>
                    {Object.entries(searchResult).map(([key, value]) => (
                        <p key={key}><strong>{key}:</strong> {value}</p>
                    ))}
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
            <button onClick={handleDownloadLogs}>Download Logs</button>
        </div>
    );
}

export default App;
