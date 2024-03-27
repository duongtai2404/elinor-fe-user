import './App.css';
// import HomeStay from './pages/homeStay';
import Index from './pages/index';
import Booking from './pages/booking';
import Payment from './pages/payment';

// import HomeStayDetail from './pages/homeStayDetail';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import PaymentSuccess from './pages/paymentSuccess';
// import Contact from './pages/contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />


          {/* <Route path='/homestay' element={<HomeStay />} />
          <Route path='/detail' Component={HomeStayDetail} />
          <Route path='/contact' Component={Contact} /> */}
          {/* <Route path='/dashboard' Component={AdminDashBoard} /> */}

        </Routes>
      </Router>
      {/* <HomeStay /> */}
    </div>
  );
}

export default App;
