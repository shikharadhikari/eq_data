import React from "react";
import EarthquakeList from "./components/earthquakeList";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <h1 className="text-center mt-4">Earthquake Data Management</h1>
      <EarthquakeList />
    </Container>
  );
}

export default App;