import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/simple/BookingForm';

function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/car/all`);
      const cars = Array.isArray(response.data) ? response.data : [];
      const foundCar = cars.find(c => c.car_id === id);
      setCar(foundCar || null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    try {
      const response = await axios.post('http://localhost:8080/booking/add', {
        car: car,
        booking_date: bookingData.booking_date,
        booking_status: false
      });
      alert('Booking submitted successfully!');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  if (loading) {
    return <div className="container py-lg"><div className="loading">Loading...</div></div>;
  }

  if (!car) {
    return (
      <div className="container py-lg">
        <div className="alert alert-error">Car not found</div>
        <Link to="/cars" className="btn btn-primary">Back to Cars</Link>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">DriveAway</Link>
            <Link to="/cars">Browse Cars</Link>
          </nav>
        </div>
      </header>

      <main className="container py-lg">
        <Link to="/cars" className="btn btn-secondary mb-lg">← Back to Cars</Link>
        
        <div className="grid">
          <div>
            <img 
              src={car.image || '/placeholder-car.jpg'} 
              alt={`${car.car_company} ${car.car_model}`}
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
            <h1>{car.car_company} {car.car_model}</h1>
            <p className="price">$50<span className="price-label">/day</span></p>
            <p><strong>Dealer:</strong> {car.dealer?.dealer_ship_name || 'N/A'}</p>
            <p><strong>Location:</strong> {car.dealer?.location || 'N/A'}</p>
            <p><strong>Contact:</strong> {car.dealer?.dealer_phone || 'N/A'}</p>
          </div>
          
          <BookingForm car={car} onSubmit={handleBooking} />
        </div>
      </main>
    </div>
  );
}

export default CarDetailPage;
