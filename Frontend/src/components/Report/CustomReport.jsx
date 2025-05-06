import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import Swal from "sweetalert2";
import "./CustomReport.css";

const CustomReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    if (!location.state?.doctors) {
      Swal.fire({
        icon: 'error',
        title: 'No Data',
        text: 'No doctor records available',
        confirmButtonText: 'Go Back'
      }).then(() => {
        navigate('/admin/doctors');
      });
    } else {
      setDoctorsData(location.state.doctors);
    }
  }, [location]);

  const downloadPDF = async () => {
    if (doctorsData.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Data',
        text: 'No doctor records to generate report'
      });
      return;
    }

    setIsGenerating(true);
    try {
      const doc = new jsPDF('landscape');
      
      // Add header with styling
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Doctors Management Report", doc.internal.pageSize.getWidth()/2, 25, { align: 'center' });
      
      // Add timestamp
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 45);

      // Prepare table data
      const headers = [["Name", "Specialty", "Email", "Phone", "Gender", "City", "State", "Address", "DOB"]];
      const data = doctorsData.map((doctor) => [
        `${doctor.firstName} ${doctor.lastName}`,
        doctor.specialty || 'N/A',
        doctor.email || 'N/A',
        doctor.phone || 'N/A',
        doctor.gender || 'N/A',
        doctor.city || 'N/A',
        doctor.state || 'N/A',
        doctor.address || 'N/A',
        doctor.dob ? new Date(doctor.dob).toLocaleDateString() : 'N/A'
      ]);

      // Use autoTable directly
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 50,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 10,
          halign: 'center',
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 9,
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        },
        margin: { top: 10 }
      });

      // Save PDF
      const filename = `Doctors_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Report downloaded successfully',
        timer: 2000
      });

    } catch (error) {
      console.error("PDF Generation Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to generate PDF report: ' + error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="custom-report-container">
      <h1 className="report-title">Doctors Management Report</h1>
      <button 
        onClick={downloadPDF} 
        className="download-btn"
        disabled={isGenerating}
      >
        <i className="fas fa-download"></i>
        {isGenerating ? ' Generating...' : ' Download PDF'}
      </button>
      <p className="note">This is a preview of your report. Click the button above to download it.</p>
    </div>
  );
};

export default CustomReport;

