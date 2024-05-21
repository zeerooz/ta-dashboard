import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [tas, setTAs] = useState([]);

    useEffect(() => {
        fetchTAs();
    }, []);

    const fetchTAs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ta/home-page');
            console.log("Fetched TAs:", response.data); // Log the fetched data
            setTAs(response.data);
        } catch (error) {
            console.error("Error fetching TAs:", error);
        }
    };

    const deleteTA = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/ta/delete/${id}`);
            setTAs(tas.filter(ta => ta.ID !== id));
        } catch (error) {
            console.error("Error deleting TA:", error);
        }
    };

    return (
        <div className="home-container">
            <h1>University TA Information</h1>
            <Link to="/add" className="btn-add">Add TA</Link>
            <div className="ta-list">
                {tas.length === 0 ? (
                    <p>No TAs found</p>
                ) : (
                    tas.map(ta => (
                        <div key={ta.ID} className="ta-card">
                            <h2>{ta.Name}</h2>
                            <div className="ta-actions">
                                <Link to={`/view/${ta.ID}`} className="btn">View</Link>
                                <Link to={`/edit/${ta.ID}`} className="btn">Edit</Link>
                                <button onClick={() => deleteTA(ta.ID)} className="btn">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
