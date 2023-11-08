import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FruitTable from './components/fruits';
import FruitDetail from './components/viewfruit';
import CreateFruit from './components/createfruit';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<FruitTable />} />
          <Route path="/fruit/:id" element={<FruitDetail />} />
          <Route path="/create" element={<CreateFruit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
