import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useState } from "react";

function Process() {
  const [firstTabInput, setFirstTabInput] = useState([]);
  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };
  // check validate tab
  const checkValidateTab = () => {
    console.log(firstTabInput.length);
    if (firstTabInput.length == 0) {
      return false;
    }
    return true;
  };
  // error messages
  const errorMessages = () => {
    // you can add alert or console.log or any thing you want
    alert("Please fill in the required fields");
  };

  return (
    <>
      <FormWizard onComplete={handleComplete}>
        <FormWizard.TabContent title="Process Payroll" icon="ti-user">
          <h3>First Tab</h3>
          <p>Some content for the first tab</p>
          <label>
            Required Field
            <span
              style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
            >
              *
            </span>
          </label>
          <br />
          <input
            className="form-control"
            type="text"
            value={firstTabInput}
            onChange={(e) => setFirstTabInput(e.target.value)}
          />
        </FormWizard.TabContent>
        {/* Tabs should be validated */}
        <FormWizard.TabContent
          title="Create Unrecovered File"
          icon="ti-settings"
          isValid={checkValidateTab()}
          validationError={errorMessages}
        >
          <h3>Second Tab</h3>
          <p>Some content for the second tab</p>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Display Bank File" icon="ti-check">
          <h3>Last Tab</h3>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
      </FormWizard>
      {/* add style */}
      <style>{`
          @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
          .form-control {
              height: 36px;
              padding: 0.375rem 0.75rem;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #495057;
              border: 1px solid #ced4da;
              border-radius: 0.25rem;
          }
  
        `}</style>
    </>
  );
}

export default Process;
