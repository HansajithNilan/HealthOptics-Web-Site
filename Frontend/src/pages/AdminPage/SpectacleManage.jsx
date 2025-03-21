import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

const SpectacleManage = () => {
  return (
    <div className="dashboard-container">
          <SideBar />
          <div className="dashboard-content">
            <h2>Spectacle Managment</h2>
          </div>
        </div>
  );
}

export default SpectacleManage;