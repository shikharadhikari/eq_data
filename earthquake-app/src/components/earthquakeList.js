import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Table, Container } from "react-bootstrap";

const EarthquakeList = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    country: "",
    magnitude: "",
    date: "",
  });

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = () => {
    axios
      .get("/earthquakes")
      .then((response) => setEarthquakes(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("/earthquakes", formData)
      .then(() => {
        fetchEarthquakes();
        setFormData({ id: "", country: "", magnitude: "", date: "" });
      })
      .catch((error) => console.error("Error adding earthquake:", error));
  };

  const handleUpdate = (id) => {
    const updatedMagnitude = prompt("Enter new magnitude:");
    if (updatedMagnitude) {
      axios
        .put(`/earthquakes/${id}`, { magnitude: updatedMagnitude })
        .then(() => fetchEarthquakes())
        .catch((error) => console.error("Error updating earthquake:", error));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`/earthquakes/${id}`)
        .then(() => fetchEarthquakes())
        .catch((error) => console.error("Error deleting earthquake:", error));
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Earthquake Records</h2>

      <Form onSubmit={handleAdd} className="mb-4">
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Magnitude</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            name="magnitude"
            value={formData.magnitude}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Earthquake
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Country</th>
            <th>Magnitude</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {earthquakes.map((eq) => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.country}</td>
              <td>{eq.magnitude}</td>
              <td>{eq.date}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdate(eq.id)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(eq.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EarthquakeList;
