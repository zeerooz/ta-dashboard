import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './ViewTA.css';

function ViewTA() {
    const { id } = useParams();
    const [ta, setTA] = useState(null);

    useEffect(() => {
        fetchTA();
    }, []);

    const fetchTA = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/ta/view/${id}`);
            setTA(response.data);
        } catch (error) {
            console.error('Error fetching TA:', error);
        }
    };

    if (!ta) {
        return <div>Loading...</div>;
    }

    return (
        <div className="view-ta-container">
            <div className="view-ta-card">
                <img src={ta.ProfilePic} alt={`${ta.Name}'s Profile`} />
                <h1>{ta.Name}</h1>
                <div className="view-ta-details">
                    <p><strong>Email:</strong> {ta.Email}</p>
                    <p><strong>Room Number:</strong> {ta.RoomNum}</p>
                    <p><strong>Department:</strong> {ta.Department}</p>
                    <p><strong>Courses:</strong> {ta.Courses}</p>
                    <p><strong>Office Hours:</strong> {ta.OfficeHours}</p>
                </div>
                <div className="view-ta-buttons">
                    <Link to={`/edit/${ta.ID}`} className="btn">Edit</Link>
                    <Link to="/" className="btn">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewTA;
