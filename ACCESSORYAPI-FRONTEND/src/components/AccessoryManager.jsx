import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config.js";

export default function AccessoryManager() {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "add"
  );

  const [accessories, setAccessories] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    warranty: ""
  });
  const [searchId, setSearchId] = useState("");
  const [foundAccessory, setFoundAccessory] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false); // new state
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/accessoryapi`;

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  useEffect(() => {
    fetchAllAccessories();
  }, []);

  const fetchAllAccessories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setAccessories(res.data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    if (!form.id || !form.name || !form.brand || !form.category || !form.price || !form.warranty) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${baseUrl}/update`, form);
        alert("Accessory updated successfully!");
      } else {
        await axios.post(`${baseUrl}/add`, form);
        alert("Accessory added successfully!");
      }
      fetchAllAccessories();
      setForm({ id: "", name: "", brand: "", category: "", price: "", warranty: "" });
      setEditMode(false);
    } catch (error) {
      alert("Error saving accessory!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      fetchAllAccessories();
      alert("Accessory deleted successfully!");
    } catch (error) {
      alert("Error deleting accessory!");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
    setActiveSection("add");
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${searchId}`);
      setFoundAccessory(res.data);
      setSearchAttempted(true); // mark that search was performed
    } catch (error) {
      setFoundAccessory(null);
      setSearchAttempted(true); // mark that search was performed
    }
  };

  return (
    <div className="dashboard">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Accessory Management</h1>

      <div className="nav-buttons">
        <button
          className={activeSection === "add" ? "active" : ""}
          onClick={() => setActiveSection("add")}
        >
          Add
        </button>
        <button
          className={activeSection === "view" ? "active" : ""}
          onClick={() => setActiveSection("view")}
        >
          View
        </button>
        <button
          className={activeSection === "viewall" ? "active" : ""}
          onClick={() => setActiveSection("viewall")}
        >
          View All
        </button>
      </div>

      {activeSection === "add" && (
        <div className="heading-container">
          <h2>{editMode ? "Edit Accessory" : "Add Accessory"}</h2>
          <div className="form-grid">
            <input type="text" name="id" placeholder="ID" value={form.id} onChange={handleChange} disabled={editMode} />
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
            <input type="text" name="warranty" placeholder="Warranty (e.g., 12 months)" value={form.warranty} onChange={handleChange} />
          </div>
          <button className="btn-purple" onClick={handleAddOrUpdate}>
            {editMode ? "Update" : "Add"}
          </button>
        </div>
      )}

      {activeSection === "view" && (
        <div className="heading-container">
          <h2>View Accessory</h2>
          <div className="search-area">
            <input
              type="text"
              placeholder="Enter ID to search"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value);
                if (e.target.value === "") setSearchAttempted(false); // reset searchAttempted when input cleared
              }}
            />
            <button className="btn-purple" onClick={handleSearch}>
              Search
            </button>
          </div>
          {foundAccessory ? (
            <div className="record-card">
              <h3>{foundAccessory.name}</h3>
              <p><b>ID:</b> {foundAccessory.id}</p>
              <p><b>Brand:</b> {foundAccessory.brand}</p>
              <p><b>Category:</b> {foundAccessory.category}</p>
              <p><b>Price:</b> ₹{foundAccessory.price}</p>
              <p><b>Warranty:</b> {foundAccessory.warranty}</p>
            </div>
          ) : (
            searchAttempted && <p className="not-found">No accessory found!</p>
          )}
        </div>
      )}

      {activeSection === "viewall" && (
        <div className="heading-container">
          <h2>All Accessories</h2>
          {accessories.length === 0 ? (
            <p>No accessories found.</p>
          ) : (
            <div className="table-container">
              <table className="record-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Warranty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accessories.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.brand}</td>
                      <td>{a.category}</td>
                      <td>₹{a.price}</td>
                      <td>{a.warranty}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(a.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
