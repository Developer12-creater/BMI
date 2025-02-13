import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.css";

export default function StatusReport() {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({ date: "", hrs: "", description: "" });

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const formattedDate = formatDate(e.target.value);
      setFormData({ ...formData, date: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const addRow = () => {
    setTableData([...tableData, formData]);
    setFormData({ date: "", hrs: "", description: "" });
  };

  const calculateTotalHours = () => {
    return tableData.reduce((total, row) => total + Number(row.hrs), 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Status Report", 20, 10);
    doc.autoTable({
      head: [["Date", "Hrs", "Description"]],
      body: tableData.map(row => [row.date, row.hrs, row.description]),
    });
    doc.text(`Total Hours: ${calculateTotalHours()}`, 20, doc.autoTable.previous.finalY + 10);
    doc.save("status_report.pdf");
  };

  return (
    <div className="container">
      <h2 className="title">Daily Status Report</h2>
      <div className="form-group">
        <input name="date" type="date" placeholder="Date" value={formData.date} onChange={handleChange} className="input-field" />
        <input name="hrs" type="number" placeholder="Hrs" value={formData.hrs} onChange={handleChange} className="input-field" />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input-field" />
      </div>
      <button onClick={addRow} className="button-primary">Add Entry</button>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hrs</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.hrs}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-hours">Total Hours: {calculateTotalHours()}</div>
      </div>
      <button onClick={generatePDF} className="button-secondary">Generate PDF</button>
    </div>
  );
}
