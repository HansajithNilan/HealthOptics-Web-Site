import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'; 
import './DoctorProfilepage.css'; // Ensure correct import path
import doctorTeamImage from '../../assets/doctor-management-image.png'; // Adjust path as necessary

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <div className="main-containerDivana">
                <div className="content-flex">
                    <img src={doctorTeamImage} alt="Doctor Team" className="management-imageDivana" />
                    <div className="text-content">
                        <h1>Welcome to Doctor Management System</h1>
                        <p className="main-descriptionDivana">
                            Manage all doctor profiles efficiently and effortlessly. 
                            You can add, edit, or view doctor profiles from here.
                        </p>
                        <button className="main-buttonDivana" onClick={() => navigate('/DoctorProfile')}>
                            Add Doctor Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
