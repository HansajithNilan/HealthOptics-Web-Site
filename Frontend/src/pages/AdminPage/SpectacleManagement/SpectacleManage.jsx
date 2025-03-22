import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout.jsx";
import "./SpectacleManage.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // This should be correctly importing the autotable plugin

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

  // Search filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const spectacles = [
    {
      id: 1,
      model: "Classic 444",
      type: "Eyeglasses",
      brand: "RayBan",
      gender: "Unisex",
      frameShape: "Round",
      frameMaterial: "Metal",
      frameType: "Full Rim",
      hingeType: "Spring Hinge",
      description: "Stylish and comfortable eyeglasses",
      frameSize: ["Small", "Medium", "Large"],
      price: 12000,
      rating: 4.5,
      stock: 10,
    },
    {
      id: 2,
      model: "Slim 335",
      type: "Sunglasses",
      brand: "Oakley",
      gender: "Men",
      frameShape: "Square",
      frameMaterial: "Plastic",
      frameType: "Half Rim",
      hingeType: "Normal",
      description: "Sleek and stylish sunglasses perfect for summer outings.",
      frameSize: ["Medium", "Large"],
      price: 15000,
      rating: 4.2,
      stock: 5,
    },
    {
      id: 3,
      model: "Elite 123",
      type: "Eyeglasses",
      brand: "Gucci",
      gender: "Women",
      frameShape: "Oval",
      frameMaterial: "Metal",
      frameType: "Full Rim",
      hingeType: "Spring Hinge",
      description: "Elegant eyeglasses with a sophisticated design.",
      frameSize: ["Small"],
      price: 20000,
      rating: 5.0,
      stock: 8,
    },
  ];

  // Handle filter
  const filteredSpectacles = spectacles.filter((item) => {
    const [minPrice, maxPrice] = String(price).split("-").map(Number);
    return (
      (item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.frameShape.toLowerCase().includes(search.toLowerCase())) &&
      (type === "" || item.type === type) &&
      (gender === "" || item.gender === gender) &&
      (price === "" ||
        (item.price >= minPrice && (maxPrice ? item.price <= maxPrice : true)))
    );
  });

  
// PDF
  const generatePDF = () => {
    console.log("Generating PDF..."); // Debugging line
    const doc = new jsPDF();
    const tableColumn = ["Model", "Type", "Gender", "Frame Shape", "Price"];
    const tableRows = [];
  
    filteredSpectacles.forEach((item) => {
      const itemData = [
        item.model,
        item.type,
        item.gender,
        item.frameShape,
        `Rs. ${item.price}`,
      ];
      tableRows.push(itemData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
  
    doc.save("filtered_spectacles.pdf");
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
        <button onClick={generatePDF}>Generate PDF</button>
          <button>Add Spectacle</button>
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
              <th></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpectacles.map((spectacle) => (
              <tr key={spectacle.id}>
                <td>{spectacle.id}</td>
                <td>{spectacle.model}</td>
                <td>{spectacle.type}</td>
                <td>{spectacle.brand}</td>
                <td>{spectacle.frameShape}</td>
                <td>{spectacle.frameMaterial}</td>
                <td>{spectacle.frameSize.join(", ")}</td>
                <td>${spectacle.price.toLocaleString()}</td>{" "}
                {/* Format price */}
                <td>{spectacle.stock}</td>
                <td>
                  <button onClick={() => handleShowMore(spectacle)}>
                    More
                  </button>
                </td>
                <td>
                  <div className="actions-wrapper">
                    <button
                      onClick={() => handleEdit(spectacle.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(spectacle.id)}
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

        {/* Modal for Show More */}
        {showModal && selectedSpectacle && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{selectedSpectacle.model} - Details</h2>
              <p>
                <strong>Type:</strong> {selectedSpectacle.type}
              </p>
              <p>
                <strong>Brand:</strong> {selectedSpectacle.brand}
              </p>
              <p>
                <strong>Gender:</strong> {selectedSpectacle.gender}
              </p>
              <p>
                <strong>Frame Shape:</strong> {selectedSpectacle.frameShape}
              </p>
              <p>
                <strong>Frame Material:</strong>{" "}
                {selectedSpectacle.frameMaterial}
              </p>
              <p>
                <strong>Frame Type:</strong> {selectedSpectacle.frameType}
              </p>
              <p>
                <strong>Hinge Type:</strong> {selectedSpectacle.hingeType}
              </p>
              <p>
                <strong>Description:</strong> {selectedSpectacle.description}
              </p>
              <p>
                <strong>Frame Sizes Available:</strong>{" "}
                {selectedSpectacle.frameSize.join(", ")}
              </p>
              <p>
                <strong>Price:</strong> $
                {selectedSpectacle.price.toLocaleString()}
              </p>
              <p>
                <strong>Rating:</strong> {selectedSpectacle.rating}
              </p>
              <p>
                <strong>Stock Quantity:</strong> {selectedSpectacle.stock}
              </p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SpectacleManage;
