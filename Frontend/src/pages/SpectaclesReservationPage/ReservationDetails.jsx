import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationDetails.css';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import Contact from '../HomePage/contact/contact';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import SideBar from '../../components/SideBar/SideBar';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout.jsx';
import logo from '../../../public/website_logo.png'


function ReservationDetails() {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/auth/reservation/getallreservations')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setReservations(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch((err) => console.log('Fetch error:', err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this reservation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/auth/reservation/deletereservation/${id}`)
          .then((res) => {
            Swal.fire('Deleted!', 'Reservation has been deleted.', 'success');
            setReservations(prev => prev.filter(reserve => reserve._id !== id)); // Update list without reload
          })
          .catch((err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Something went wrong during deletion.', 'error');
          });
      }
    });
  };
  
  



  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add your logo image
    const imgWidth = 30;
    const imgHeight = 30;
  
    // Convert image to base64 if needed, or directly use external/base64 URL
    const logoBase64 = '../../../public/website_logo.png'; // If using base64 manually
  
    doc.addImage(logoBase64, 'PNG', 14, 10, imgWidth, imgHeight); // logo at top-left
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('HealthOptics', 165, 20);
    doc.text('(PVT) Ltd', 165, 25);
    doc.text('071-3275308', 165, 30);
    doc.text('Rervation Report', 80, 40);
    
   
    const tableColumn = [
      "Name", "Phone", "Address", "Email", "Gender",
      "Frame Type", "Brand", "Material", "Size", "Qty", "Total"
    ];
  
    const tableRows = reservations.map(reserve => [
      reserve.name,
      reserve.phonenumber,
      reserve.address,
      reserve.email,
      reserve.gender,
      reserve.frametype,
      reserve.brand,
      reserve.framematerial,
      reserve.framesize,
      reserve.quantity,
      reserve.price
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50, // leave space for the logo + title
      theme: 'striped',
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [255, 102, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
  
    doc.save('Reservations_Report.pdf');
  };
  

  // Filter logic
  const filteredReservations = reservations.filter((reserve) =>
    reserve.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reserve.phonenumber.includes(searchTerm) ||
    reserve.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    
    <DashboardLayout title="All Reservation Details">
    <div className="user-profile-wrapper">

      <SideBar />
   
      <div className="user-profile-container">
       

       <div className='Search-function-filter'>
        <div className='search-function'><input
          type="text"
          placeholder="Search by name, phone number, or gender"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /></div>
       <div className='pdf-generate'><button onClick={generatePDF} className="pdf-download-button">
          Download PDF
        </button></div>
       
       </div>
        

        

        <table className="user-table">
          <thead className="user-table-header">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Frame Type</th>
              <th>Brand</th>
              <th>Frame Material</th>
              <th>Frame Size</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="user-table-body">
            {filteredReservations.map((reserve) => (
              <tr className="user-table-row" key={reserve._id}>
                <td>
                  <img
                    src={reserve.imageurlcolor}
                    alt={reserve.name}
                    style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                  />
                </td>
                <td>{reserve.name}</td>
                <td>{reserve.phonenumber}</td>
                <td>{reserve.address}</td>
                <td>{reserve.email}</td>
                <td>{reserve.gender}</td>
                <td>{reserve.frametype}</td>
                <td>{reserve.brand}</td>
                <td>{reserve.framematerial}</td>
                <td>{reserve.framesize}</td>
                <td>{reserve.quantity}</td>
                <td>{reserve.price}</td>
                <td>
                  <Link to={`/updatereservation/${reserve._id}`} className="user-update-button">
                    Update
                  </Link>
                  <button
                    className="user-delete-button"
                    onClick={() => handleDelete(reserve._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Footer />
    </div>
  
    </DashboardLayout>
  );
}

export default ReservationDetails;
