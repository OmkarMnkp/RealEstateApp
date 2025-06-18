import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardComponent from './components/Cardcomponent';
import PropertyDetail from './components/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import InquirySection from './components/InquirySection';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
          <Toaster position="top-right" /> 

      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CardComponent />
              <InquirySection/>
            </>
          }
        />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
