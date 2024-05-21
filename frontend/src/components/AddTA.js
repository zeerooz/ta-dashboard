import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEditTA.css';

function AddTA() {
    const [ta, setTA] = useState({
        Name: '',
        Email: '',
        RoomNum: '',
        Department: '',
        Courses: '',
        OfficeHours: '',
        ProfilePic: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTA({ ...ta, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setTA({ ...ta, ProfilePic: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in ta) {
            formData.append(key, ta[key]);
        }

        try {
            await axios.post('http://localhost:5000/api/ta/add', formData);
            navigate('/'); // Redirect to home page after adding TA
        } catch (error) {
            console.error('Error adding TA:', error);
        }
    };

    return (
        <div className="add-edit-container">
            <h1>Add TA</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={ta.Name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={ta.Email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="RoomNum"
                    placeholder="Room Number"
                    value={ta.RoomNum}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Department"
                    placeholder="Department"
                    value={ta.Department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Courses"
                    placeholder="Courses"
                    value={ta.Courses}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="OfficeHours"
                    placeholder="Office Hours"
                    value={ta.OfficeHours}
                    onChange={handleChange}
                    required
                />
                <input type="file" name="ProfilePic" onChange={handleFileChange} />
                <button type="submit">Add TA</button>
            </form>
        </div>
    );
}

export default AddTA;
