import React, { useState } from "react";
import "./Calculation.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalculationForm = () => {
  const [formData, setFormData] = useState({
    companyCode: "",
    sequence: "",
    payCode: "",
    calCode: "",
    payCategory: "",
    calFormula: "",
    calDescription: "",
    status: "active",
    createdBy: "currentLoggedInUserId",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  //calFormula - text( validate with paycode.calcode)
  const validateCalFormula = () => {
    const { payCode, calCode } = formData;
    const isValid = calCode.includes(payCode);

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate calFormula
    const isValidCalFormula = validateCalFormula();

    if (!isValidCalFormula) {
      alert("CalFormula validation failed!");
      return;
    }

    // submission logic here
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({
      companyCode: "",
      sequence: "",
      payCode: "",
      calCode: "",
      payCategory: "",
      calFormula: "",
      calDescription: "",
      status: "active",
      createdBy: "currentLoggedInUserId",
    });

    // Exit edit mode
    setIsEditMode(false);
  };

  const handleEdit = () => {
    // Enter edit mode
    setIsEditMode(true);
  };

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <form onSubmit={handleSubmit} className="calculation-form">
        <h3>Calculation Form</h3>
        <label htmlFor="companyCode">Company Code:</label>
        <select
          id="companyCode"
          name="companyCode"
          value={formData.companyCode}
          onChange={handleChange}
          disabled={isEditMode}
        >
          <option value="company1">Company 1</option>
          <option value="company2">Company 2</option>
        </select>

        <label htmlFor="sequence">Sequence:</label>
        <input
          type="text"
          id="sequence"
          name="sequence"
          value={formData.sequence}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="payCode">Pay Code:</label>
        <input
          type="text"
          id="payCode"
          name="payCode"
          value={formData.payCode}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="calCode">Calculation Code:</label>
        <input
          type="text"
          id="calCode"
          name="calCode"
          value={formData.calCode}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="payCategory">Pay Category:</label>
        <input
          type="text"
          id="payCategory"
          name="payCategory"
          value={formData.payCategory}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="calFormula">Calculation Formula:</label>
        <input
          type="text"
          id="calFormula"
          name="calFormula"
          value={formData.calFormula}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="calDescription">Calculation Description:</label>
        <input
          type="text"
          id="calDescription"
          name="calDescription"
          value={formData.calDescription}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isEditMode}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input
          type="hidden"
          id="createdBy"
          name="createdBy"
          value={formData.createdBy}
        />

        {isEditMode ? (
          <button type="submit" className="edit-btn">
            Update
          </button>
        ) : (
          <button type="submit" className="insert-btn">
            Insert
          </button>
        )}

        <button
          type="button"
          onClick={handleEdit}
          disabled={isEditMode}
          className="edit-btn"
        >
          Edit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer />
    </div>
  );
};

export default CalculationForm;
