import React  from 'react';
import './DoctorAppointmentDetails.css';



function AddDoctorAppointmentDetails() {


return (
  <div>
  <form  className="da-form-group" >

  <h2>Doctor Appointment</h2><br/>
    <div className="mb-3">
      <label className="da-control-label">Customer Name</label><br/>
      <input type="text" className="da-form-control" placeholder="Enter customer name "  required

      
      />
    </div>
    
    <div className="mb-3">
      <label className="da-control-label">Contact</label><br/>
      <input type="tel" className="da-form-control" placeholder="Enter contact" 
      
        
      />
    <div className="mb-3">
      <label className="da-control-label">Address</label><br/>
      <input type="text" className="da-form-control" placeholder="Enter address"  required
       
      />
    </div>
    </div>
    <div className="mb-3">
      <label className="da-control-label">Email</label><br/>
      <input type="email" className="da-form-control" placeholder="Enter email"  required
      
      />
    </div>

    <div className="mb-3">
      <label className="da-control-label">Doctor Name </label><br/>
      <input type="text" className="da-form-control" placeholder="Enter doctor name"  required
       
      />
    </div>

    <div className="mb-3">
      <label className="da-control-label">Date</label><br/>
      <input type="date" className="da-form-control" placeholder="Enter Date "  required
        
      />
    </div>

    <div className="mb-3">
      <label className="da-control-label">Doctor Fee</label><br/>
      <input type="text" className="da-form-control" placeholder="Enter doctor fee"  required
       
      />
    </div>

    <button type="submit" className="submit">Submit</button>
       
  </form>
</div>

)
}

export default AddDoctorAppointmentDetails