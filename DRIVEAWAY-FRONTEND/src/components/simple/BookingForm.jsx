import React, { useState } from 'react';

function BookingForm({ car, onSubmit }) {
  const [formData, setFormData] = useState({
    booking_date: '',
    rental_days: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.booking_date) {
      setError('Please select a booking date');
      return;
    }

    if (formData.rental_days < 1) {
      setError('Rental days must be at least 1');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success">
        <h3>Booking Successful!</h3>
        <p>Your car rental has been confirmed.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Book This Car</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="booking_date" className="form-label">Booking Date</label>
          <input
            type="date"
            id="booking_date"
            name="booking_date"
            className="form-input"
            value={formData.booking_date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rental_days" className="form-label">Rental Days</label>
          <input
            type="number"
            id="rental_days"
            name="rental_days"
            className="form-input"
            value={formData.rental_days}
            onChange={handleChange}
            min="1"
            max="30"
            required
          />
        </div>
        
        <div className="form-group">
          <p><strong>Total:</strong> ${(formData.rental_days * 50).toFixed(2)}</p>
        </div>
        
        <button type="submit" className="btn btn-primary btn-block">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

BookingForm.defaultProps = {
  car: {},
  onSubmit: () => {}
};

export default BookingForm;
