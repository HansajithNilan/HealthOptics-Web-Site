import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./Dashboard.css";
import { FaBuilding, FaUserMd, FaUsers, FaCalendarCheck, FaGlasses, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../components/Context/AuthContext.jsx";
import axios from "axios";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const StatCard = ({ color, title, count, icon }) => (
  <div className={`cardvihani ${color}`}>
    <div className="iconvihani">{icon}</div>
    <div className="contentvihani">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { name } = useContext(AuthContext);
  const userName = name?.split(" ")[0] || "User";

  const [ReservationCount, setReservationCount] = useState(0);
  const [DoctorCount, setDoctorCount] = useState(0);
  const [Usercount, setUsercount] = useState(0);
  const [FeedBackCount, setFeedBackCount] = useState(0);
  const [SpectacleCount, setSpectacleCount] = useState(0);
  const [AppointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/reservation/getallreservations")
      .then((res) => setReservationCount(res.data.length || 0))
      .catch((err) => console.error("Reservation error:", err));

    axios.get("http://localhost:3000/api/doctorappointment/getallappointments")
      .then((res) => setAppointmentCount(res.data.appointments.length || 0))
      .catch((err) => console.error("Appointment error:", err));

    axios.get("http://localhost:3000/api/auth/doctor/")
      .then((res) => setDoctorCount(res.data.length || 0));

    axios.get("http://localhost:3000/api/auth/user/getusers")
      .then((res) => setUsercount(res.data.length || 0));

    axios.get("http://localhost:3000/api/feedback/all")
      .then((res) => setFeedBackCount(res.data.length || 0));

    axios.get("http://localhost:3000/api/spectacle/")
      .then((res) => setSpectacleCount(res.data.length || 0));
  }, []);

  const labels = ['Users', 'Doctors', 'FeedBacks', 'Appointments', 'Spectacles', 'Reservations'];
  const values = [Usercount, DoctorCount, FeedBackCount, AppointmentCount, SpectacleCount, ReservationCount];

  return (
    <DashboardLayout title="Health Optics Dashboard">
      <div className="dashboardvihani">
        <StatCard color="blue" title="Users" count={Usercount} icon={<FaBuilding />} />
        <StatCard color="green" title="Doctors" count={DoctorCount} icon={<FaUserMd />} />
        <StatCard color="yellow" title="FeedBacks" count={FeedBackCount} icon={<FaUsers />} />
        <StatCard color="red" title="Appointments" count={AppointmentCount} icon={<FaCalendarCheck />} />
        <StatCard color="purple" title="Spectacles" count={SpectacleCount} icon={<FaGlasses />} />
        <StatCard color="black" title="Reservation" count={ReservationCount} icon={<FaShoppingCart />} />
      </div>

      {/* Bar Chart */}
      <div className="chart-container" style={{ marginTop: '40px', background: '#fff', padding: '20px', borderRadius: '10px',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <h2>HealthOptics Overview - BarChart</h2>
        <Bar
          data={{
            labels,
            datasets: [{
              label: 'Count',
              data: values,
              backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#34495e'],
              borderRadius: 5
            }]
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 10 }
              }
            }
          }}
        />
      </div>

    <div className="two-chart-ocontainer" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '40px' }}>
      <div className="chart-container" style={{ marginTop: '40px', background: '#fff', padding: '20px', borderRadius: '10px', width:'40%', height:'400px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
        <h2>HealthOptics Trend - LineChart</h2>
        <Line
          data={{
            labels,
            datasets: [{
              label: 'Count Over Time',
              data: values,
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              fill: true,
              tension: 0.4
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true }
            }
          }}
        />
      </div>

    
      <div className="chart-container" style={{ marginTop: '40px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', background: '#fff', paddingTop: '44px', borderRadius: '10px', width:'40%',height:'400px' ,boxShadow: '0 4px 8px 0 rgba(66, 64, 64, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
        <h2>HealthOptics Distribution - PieChart</h2>
        <Pie
          data={{
            labels,
            datasets: [{
              label: 'Count Share',
              data: values,
              backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#34495e'],
              borderWidth: 1
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'right' }
            }
          }}
        />
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
