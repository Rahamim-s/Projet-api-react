import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [stocks, setStocks] = useState([]);
    const [searchSiret, setSearchSiret] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');


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

            {searchResult && (
                <div>
                    <h2>Informations</h2>
                    <p><strong>SIREN:</strong> {searchResult.siren}</p>
                    <p><strong>SIRET:</strong> {searchResult.siret}</p>
                    <p><strong>NIC:</strong> {searchResult.nic}</p>
                    <p><strong>Statut Diffusion Etablissement:</strong> {searchResult.statutDiffusionEtablissement}</p>
                    <p><strong>Date Création Etablissement:</strong> {searchResult.dateCreationEtablissement}</p>
                    <p><strong>Activité Principale Registre Métiers Etablissement:</strong> {searchResult.activitePrincipaleRegistreMetiersEtablissement}</p>
                    <p><strong>Date Dernier Traitement Etablissement:</strong> {searchResult.dateDernierTraitementEtablissement}</p>
                    <p><strong>Etablissement Siège:</strong> {searchResult.etablissementSiege}</p>
                    <p><strong>Nombre de Périodes Etablissement:</strong> {searchResult.nombrePeriodesEtablissement}</p>
                    <p><strong>Libellé Voie Etablissement:</strong> {searchResult.libelleVoieEtablissement}</p>
                    <p><strong>Code Postal Etablissement:</strong> {searchResult.codePostalEtablissement}</p>
                    <p><strong>Libellé Commune Etablissement:</strong> {searchResult.libelleCommuneEtablissement}</p>
                    <p><strong>Code Commune Etablissement:</strong> {searchResult.codeCommuneEtablissement}</p>
                    <p><strong>Date Début:</strong> {searchResult.dateDebut}</p>
                    <p><strong>Etat Administratif Etablissement:</strong> {searchResult.etatAdministratifEtablissement}</p>
                    <p><strong>Activité Principale Etablissement:</strong> {searchResult.activitePrincipaleEtablissement}</p>
                    <p><strong>Nomenclature Activité Principale Etablissement:</strong> {searchResult.nomenclatureActivitePrincipaleEtablissement}</p>
                    <p><strong>Caractère Employeur Etablissement:</strong> {searchResult.caractereEmployeurEtablissement}</p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
            <button onClick={handleDownloadLogs}>Download Logs</button>
        </div>
    );
}

export default App;
