import React from "react";
import "./DoctorProfileTable.css";

function DoctorProfileTable() {
  return (
    <div className="container4617">
      <div className="table-wrapper4617">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctors List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Specialty</th>
              <th>City</th>
              <th>State</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Doctor Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows will be inserted here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorProfileTable;
