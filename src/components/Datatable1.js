import React from "react";

export default function Datatable1() {
  const data = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "San Francisco" },
    // Add more data as needed
  ];
  return (
    <div>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              {/* Assuming 'data' is an array of objects with similar structure */}
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
