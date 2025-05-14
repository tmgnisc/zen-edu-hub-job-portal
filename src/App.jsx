import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Steps from './components/Steps/Steps';
import Explore from './components/Explore/Explore';
import Jobs from './components/Jobs/Jobs';
import Footer from './components/Footer/Footer';
import WhatWeOffer from './components/Footer/WhatWeOffer';
import JobsPage from './pages/JobsPage';
import LoginSignupPage from './pages/LoginSignupPage';
import JobDetailsPage from './pages/JobDetailsPage';
import About from './components/About/About';
import ProfilePage from './pages/ProfilePage';

function Home() {
  return (
    <>
      <Header />
      <Steps />
      <Explore />
      <Jobs />
      <WhatWeOffer />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;