import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./SpectacleManage.css";
import jsPDF from "jspdf";
import axios from "axios";
import SpectacleDetails from "./SpectacleDetails.jsx";
import SpectacleForm from "./SpectacleForm";
import Swal from "sweetalert2";
import SpectacleUpdateForm from "./SpectacleUpdateForm.jsx";

const SpectacleManage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpectacle, setSelectedSpectacle] = useState(null);

  const handleShowMore = (spectacle) => {
    setSelectedSpectacle(spectacle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSpectacle(null);
  };

  const [showFormModal, setShowFormModal] = useState(false);

  const handleOpenFormModal = () => {
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
  };

  // Search and filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const [spectacles, setSpectacles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/spectacle/")
      .then((response) => {
        setSpectacles(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the spectacles data:",
          error
        );
      });
  }, []);

  // Handle Search and filter
  const filteredSpectacles = spectacles.filter((item) => {
    const [minPrice, maxPrice] = String(price).split("-").map(Number);
    return (
      (item.model.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())) &&
      (type === "" || item.type === type) &&
      (gender === "" || item.gender === gender) &&
      (price === "" ||
        (item.price >= minPrice && (maxPrice ? item.price <= maxPrice : true)))
    );
  });

  // PDF Generate
  const generatePDF = () => {
    console.log("Generating PDF");
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Spectacle Report", 10, 10);

    let yPos = 20; // Start position for table

    // Table headers
    const tableColumn = ["Model", "Type", "Gender", "Frame Shape", "Price"];
    doc.setFontSize(12);
    tableColumn.forEach((col, index) => {
      doc.text(col, 10 + index * 40, yPos);
    });

    yPos += 10; // Move to next line

    // Table rows
    filteredSpectacles.forEach((item) => {
      const itemData = [
        item.model,
        item.type,
        item.gender,
        item.frameShape,
        `Rs. ${item.price}`,
      ];

      itemData.forEach((data, index) => {
        doc.text(String(data), 10 + index * 40, yPos);
      });

      yPos += 10; // Move to next row
    });

    doc.save("Stock_Report.pdf");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        console.log(`Deleting spectacle with id: ${id}`);
        axios
          .delete(`http://localhost:3000/api/spectacle/delete/${id}`)
          .then((response) => {
            console.log("Spectacle deleted successfully", response);
            // Update state to reflect deletion
            setSpectacles((prevSpectacles) =>
              prevSpectacles.filter((spectacle) => spectacle._id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting spectacle", error);
          });
      }
    });
  };

  const [showUpdateFormModal, setShowUpdateFormModal] = useState(false); // For updating
  const [editingSpectacle, setEditingSpectacle] = useState(null);

  const handleOpenUpdateFormModal = (spectacle) => {
    setEditingSpectacle(spectacle);
    setShowUpdateFormModal(true);
  };

  const handleCloseUpdateFormModal = () => {
    setShowUpdateFormModal(false);
    setEditingSpectacle(null);
  };

  const handleUpdate = (updatedSpectacle) => {
    setSpectacles((prev) =>
      prev.map((item) =>
        item._id === updatedSpectacle._id ? updatedSpectacle : item
      )
    );
  };

  return (
  
    <DashboardLayout title="Spectacle Management">
      <div className="shakya-spectacle-container">
        <div className="shakya-spec-section">
          <button onClick={generatePDF} className="shakya-report-btn">
            Generate Report
          </button>
          <button className="shakya-add-btn" onClick={handleOpenFormModal}>
            Add Spectacle
          </button>
        </div>
        <div className="shakya-filter-section">
          <input
            type="text"
            placeholder="Search Model or Brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Eyeglasses">Eyeglasses</option>
            <option value="Sunglasses">Sunglasses</option>
          </select>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Unisex">Unisex</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">All Prices</option>
            <option value="5000-10000">LKR 5,000 - LKR 10,000</option>
            <option value="10000-15000">LKR 10,000 - LKR 15,000</option>
            <option value="15000-20000">LKR 15,000 - LKR 20,000</option>
            <option value="20000">Above LKR 20,000</option>
          </select>
        </div>

        <div className="shakya-table-container">
          <table className="shakya-spectacle-table">
            <thead className="shakya-thead">
              <tr className="shakya-tr">
                <th>ID</th>
                <th>Model</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Frame Shape</th>
                <th>Frame Material</th>
                {/* <th>Frame Size</th> */}
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>More Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="shakya-tbody">
              {filteredSpectacles.map((spectacle) => (
                <tr key={spectacle._id} class="shakya-tr">
                  <td>
                    {(
                      "000" +
                      (parseInt(spectacle._id.slice(-3), 16) % 1000)
                    ).slice(-3)}
                  </td>
                  <td>{spectacle.model}</td>
                  <td>{spectacle.type}</td>
                  <td>{spectacle.brand}</td>
                  <td>{spectacle.frameshape}</td>
                  <td>{spectacle.framematerial}</td>
                  {/* <td>{`${spectacle.framesize1}, ${spectacle.framesize2}, ${spectacle.framesize3}`}</td> */}
                  <td>LKR {spectacle.price.toLocaleString()}</td>
                  <td>{spectacle.stock}</td>
                  <td>
                    <button
                      onClick={() => handleShowMore(spectacle)}
                      className="shakya-more-btn"
                    >
                      More
                    </button>
                  </td>
                  <td>
                    <div className="shakya-actions-wrapper">
                      <button
                        onClick={() => handleOpenUpdateFormModal(spectacle)}
                        className="shakya-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(spectacle._id)}
                        className="shakya-delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Show More */}
        <SpectacleDetails
          spectacle={selectedSpectacle}
          onClose={handleCloseModal}
        />
        {showFormModal && <SpectacleForm onClose={handleCloseFormModal} />}
        {showUpdateFormModal && (
          <SpectacleUpdateForm
            onClose={handleCloseUpdateFormModal}
            spectacle={editingSpectacle}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SpectacleManage;
