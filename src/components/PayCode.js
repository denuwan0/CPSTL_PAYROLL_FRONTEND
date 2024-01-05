import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./PayCode.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayCodeForm = () => {
  const [formData, setFormData] = useState({
    companyCode: "",
    payCode: "",
    calCode: "",
    payCategory: "",
    description: "",
    isTaxableGross: false,
    rate: "",
    createdBy: "currentLoggedInUserId",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // submission logic here
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({
      companyCode: "",
      payCode: "",
      calCode: "",
      payCategory: "",
      description: "",
      isTaxableGross: false,
      rate: "",
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
      <form onSubmit={handleSubmit} className="pay-code-form">
        <h3>Pay Code Form</h3>
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

        <label htmlFor="payCode">Pay Code:</label>
        <input
          type="number"
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

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="isTaxableGross">Is Taxable Gross:</label>
        <input
          type="checkbox"
          id="isTaxableGross"
          name="isTaxableGross"
          checked={formData.isTaxableGross}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="rate">Rate:</label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          disabled={isEditMode}
        />

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
      <Footer />
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

export default PayCodeForm;
