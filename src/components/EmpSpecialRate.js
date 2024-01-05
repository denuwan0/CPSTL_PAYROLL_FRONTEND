import React, { useState } from "react";
import "./EmpSpecialRate.css";

const SpecialForm = () => {
  const [formData, setFormData] = useState({
    companyCode: "",
    status: "pending",
    epf: "",
    costCenter: "",
    payCode: "",
    calCode: "",
    rate: "",
    createdBy: "currentLoggedInUserId",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const validateEPF = () => {
    const { epf } = formData;
    const costCenter = `CC:${epf.substring(0, 3)}`;

    setFormData({ ...formData, costCenter });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "epf") {
      validateEPF();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setFormData({
      companyCode: "",
      status: "pending",
      epf: "",
      costCenter: "",
      payCode: "",
      calCode: "",
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
    <>
      <form onSubmit={handleSubmit} className="special-form">
        <h3> Employee Special Rate Form</h3>

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

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isEditMode}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>

        <label htmlFor="epf">EPF Number:</label>
        <input
          type="text"
          id="epf"
          name="epf"
          //value={formData.epf}
          onChange={handleChange}
          disabled={isEditMode}
        />

        <label htmlFor="costCenter">Cost Center:</label>
        <input
          type="text"
          id="costCenter"
          name="costCenter"
          value={formData.costCenter}
          readOnly
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
          maxLength="5"
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
    </>
  );
};

export default SpecialForm;
