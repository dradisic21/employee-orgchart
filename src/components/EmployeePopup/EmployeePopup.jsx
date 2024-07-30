import React, { useEffect } from "react";
import "./EmployeePopup.scss";

export function EmployeePopup({ employeeId, employees, onClose }) {
    const employee = employees.find((item) => item.id === employeeId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!employee) {
    return null;
  }

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-content">
            <img
              src={employee.imageUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <h2>
              {employee.firstName}&nbsp; 
              {employee.lastName}
            </h2>
            <p>{employee.position}</p>
            <p>{employee.about}</p>
            <div className="contact-info">
                <p>{employee.email}</p>
                <p>{employee.contactNumber}</p>
                <p>{employee.adress}</p>
            </div>
           
            <div className="close-button">
              <img src="/assets/icons/circle.png" alt="" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
