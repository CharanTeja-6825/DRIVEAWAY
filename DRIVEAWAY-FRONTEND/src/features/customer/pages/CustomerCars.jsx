import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import { getCars } from "../services";
import CarsGrid from "../components/CarsGrid";



export default function CustomerCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getCars();
        if(typeof(data) == "string") setMessage(data);
        else
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load cars"
        );
    }
    };

    loadCars();
  }, []);


  /* 🔄 Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <CircularProgress />
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Available Cars
      </h1>

      {message ? (
        <div className="flex justify-center">
          <Alert severity="info">{message}</Alert>
        </div>
      ) : (
        <CarsGrid cars={cars}/>
      )}
    </div>
  );
}
