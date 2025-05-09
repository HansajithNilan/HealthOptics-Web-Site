import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import Swal from "sweetalert2";
import logo from "../../../public/website_logo.png";
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
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header with blue color
      doc.setFillColor(25, 118, 210); // Changed to blue
      doc.rect(0, 0, pageWidth, 45, 'F');
      
      // Left side - Logo and company name
      doc.addImage(logo, 'PNG', 10, 5, 35, 35);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("HealthOptics (Pvt) Ltd", 50, 20);
      
      // Right side - Contact info
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text([
        "68 Erie St, Jersey City, NJ 07302",
        "Tel: +(94)41 224-8651",
        "Email: info@healthoptics.com",
        "www.healthoptics.com"
      ], pageWidth - 15, 15, { align: 'right' });

      // Report title and metadata box with blue border
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(25, 118, 210); // Changed to blue
      doc.setFillColor(240, 247, 255); // Light blue background
      doc.roundedRect(10, 55, pageWidth - 20, 25, 3, 3, 'FD');
      
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DOCTORS MANAGEMENT REPORT", pageWidth/2, 65, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text([
        `Report Generated: ${new Date().toLocaleString()}`,
        `Total Doctors: ${doctorsData.length}`,
        
      ], 15, 72);

      // Table starting position moved down
      autoTable(doc, {
        head: [["No", "Name", "Specialty", "Email", "Phone", "Gender", "Location"]],
        body: doctorsData.map((doctor, index) => [
          index + 1,
          `Dr. ${doctor.firstName} ${doctor.lastName}`,
          doctor.specialty || 'N/A',
          doctor.email || 'N/A',
          doctor.phone || 'N/A',
          doctor.gender || 'N/A',
          `${doctor.city}, ${doctor.state}`
        ]),
        startY: 90,
        theme: 'grid',
        headStyles: {
          fillColor: [25, 118, 210], // Changed to blue
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold',
          cellPadding: 4,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8,
          cellPadding: 3
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 20 },
          1: { cellWidth: 45 },
          2: { cellWidth: 35 },
          3: { cellWidth: 60 },
          4: { cellWidth: 35 },
          5: { cellWidth: 25 },
          6: { cellWidth: 50 }
        },
        alternateRowStyles: {
          fillColor: [240, 247, 255] // Light blue background
        },
        margin: { top: 5, right: 5, bottom: 5, left: 5 },
        didDrawPage: (data) => {
          // Simple footer
          doc.setFontSize(8);
          doc.setTextColor(25, 118, 210); // Changed to blue
          doc.text(
            'HealthOptics (Pvt) Ltd - Confidential',
            pageWidth/2,
            pageHeight - 5,
            { align: 'center' }
          );
        }
      });

      // Save PDF
      doc.save(`HealthOptics_Doctors_Report_${new Date().toISOString().split('T')[0]}.pdf`);

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
    <div className="report-container4917">
      <div className="report-header4917">
        <img src={logo} alt="HealthOptics Logo" className="report-logo4917" />
        <h1 className="report-title4917">Doctors Management Report</h1>
      </div>
      <button 
        onClick={downloadPDF} 
        className="report-download-btn4917"
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating Report...' : 'Download Report'}
      </button>
      <p className="report-note4917">Click the button above to download the complete report</p>
    </div>
  );
};

export default CustomReport;

