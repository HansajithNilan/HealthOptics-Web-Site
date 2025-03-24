import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./SpectacleManage.css";
import jsPDF from "jspdf";
import axios from "axios";
import SpectacleDetails from "./SpectacleDetails.jsx";

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

  // Search and filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const [spectacles, setSpectacles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/spectacle/")
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

  const handleEdit = (id) => {
    console.log(`Editing spectacle with id: ${id}`);
    // Add your edit functionality here
  };

  const handleDelete = (id) => {
    console.log(`Deleting spectacle with id: ${id}`);
    // Add your delete functionality here
  };

  return (
    <DashboardLayout title="Spectacle Management">
      <div className="spectacle-container">
        <div className="spec-section">
          <button onClick={generatePDF} className="report-btn">
            Generate Report
          </button>
          <button className="add-btn">Add Spectacle</button>
        </div>
        <div className="filter-section">
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
            <option value="5000-10000">Rs. 5,000 - Rs. 10,000</option>
            <option value="10000-15000">Rs. 10,000 - Rs. 15,000</option>
            <option value="15000-20000">Rs. 15,000 - Rs. 20,000</option>
            <option value="20000">Above Rs. 20,000</option>
          </select>
        </div>

        <div className="table-container">
          <table className="spectacle-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Frame Shape</th>
                <th>Frame Material</th>
                <th>Frame Size</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>More Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpectacles.map((spectacle) => (
                <tr key={spectacle._id}>
                  {/* <td>{spectacle._id}</td> */}
                  <td>{("000" + (parseInt(spectacle._id.slice(-3), 16) % 1000)).slice(-3)}</td>
                  <td>{spectacle.model}</td>
                  <td>{spectacle.type}</td>
                  <td>{spectacle.brand}</td>
                  <td>{spectacle.frameshape}</td>
                  <td>{spectacle.framematerial}</td>
                  <td>{`${spectacle.framesize1}, ${spectacle.framesize2}, ${spectacle.framesize3}`}</td>
                  <td>${spectacle.price.toLocaleString()}</td>
                  <td>{spectacle.stock}</td>
                  <td>
                    <button
                      onClick={() => handleShowMore(spectacle)}
                      className="more-btn"
                    >
                      More
                    </button>
                  </td>
                  <td>
                    <div className="actions-wrapper">
                      <button
                        onClick={() => handleEdit(spectacle._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(spectacle._id)}
                        className="delete-btn"
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
        <SpectacleDetails spectacle={selectedSpectacle} onClose={handleCloseModal} />
      </div>
    </DashboardLayout>
  );
};

export default SpectacleManage;
