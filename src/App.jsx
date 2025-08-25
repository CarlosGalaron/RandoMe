import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Page from './components/Page';
import CoinFlip from './components/CoinFlip';
import Selector from './components/Selector';
import './index.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="card-row">
      <div className="card green" onClick={() => navigate("/coin")}>
        Coin Flip
      </div>
      <div className="card blue" onClick={() => navigate("/selector")}>
        List Randomizer
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/coin" element={<Page title="Heads or Tails"><CoinFlip /></Page>} />
        <Route path="/selector" element={<Page title="List Randomizer"><Selector /></Page>} />
      </Routes>
    </BrowserRouter>
  );
}
