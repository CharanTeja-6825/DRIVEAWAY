import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  IconButton,
  Paper,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  DirectionsCar,
  BookOnline,
  CheckCircle,
  PendingActions,
  Search,
  FilterList,
} from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import Input from '../components/ui/input';
import { Label } from '../components/ui/label';
import { carAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookCarDialogOpen, setBookCarDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = cars.filter(
        (car) =>
          car.car_company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.car_model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.dealer?.dealer_ship_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchQuery, cars]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [carsRes, bookingsRes] = await Promise.all([
        carAPI.getAllCars(),
        bookingAPI.getAllBookings(),
      ]);

      setCars(Array.isArray(carsRes.data) ? carsRes.data : []);
      
      const allBookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];
      const userBookings = allBookings.filter(
        (booking) => booking.customer?.customer_id === user?.customer_id
      );
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookCar = async () => {
    try {
      const bookingData = {
        customer: {
          customer_id: user.customer_id,
        },
        car: {
          car_id: selectedCar.car_id,
        },
        booking_date: bookingDate,
        booking_status: false,
        booked_at: new Date().toISOString(),
      };

      await bookingAPI.addBooking(bookingData);
      setBookCarDialogOpen(false);
      setSelectedCar(null);
      setBookingDate('');
      fetchData();
    } catch (error) {
      console.error('Error booking car:', error);
    }
  };

  const stats = {
    totalBookings: bookings.length,
    activeBookings: bookings.filter((b) => b.booking_status).length,
    pendingBookings: bookings.filter((b) => !b.booking_status).length,
    availableCars: cars.length,
  };

  const bookingColumns = [
    { field: 'booking_id', headerName: 'Booking ID', width: 150 },
    {
      field: 'car',
      headerName: 'Car',
      width: 250,
      valueGetter: (params) => `${params.car_company || ''} ${params.car_model || ''}`,
    },
    {
      field: 'dealer',
      headerName: 'Dealer',
      width: 200,
      valueGetter: (params) => params.car?.dealer?.dealer_ship_name || 'N/A',
    },
    { field: 'booking_date', headerName: 'Booking Date', width: 150 },
    {
      field: 'booked_at',
      headerName: 'Booked At',
      width: 180,
      valueFormatter: (params) => {
        return params ? new Date(params).toLocaleDateString() : 'N/A';
      },
    },
    {
      field: 'booking_status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Approved' : 'Pending Approval'}
          color={params.value ? 'success' : 'warning'}
          size="small"
          icon={params.value ? <CheckCircle /> : <PendingActions />}
        />
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Customer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse cars and manage your bookings
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
              <DirectionsCar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableCars}</div>
              <p className="text-xs text-muted-foreground">Ready to book</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <BookOnline className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <PendingActions className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Explore & Book</CardTitle>
          <CardDescription>Browse available cars and manage your bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Cars</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-4">
              {/* Search Bar */}
              <Box sx={{ mb: 3 }}>
                <MuiTextField
                  fullWidth
                  placeholder="Search by car company, model, or dealer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Car Grid */}
              <Grid container spacing={3}>
                {loading ? (
                  <Grid item xs={12}>
                    <Typography align="center">Loading cars...</Typography>
                  </Grid>
                ) : filteredCars.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography align="center" color="text.secondary">
                      No cars found
                    </Typography>
                  </Grid>
                ) : (
                  filteredCars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car.car_id}>
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
                            <CardTitle className="text-lg">
                              {car.car_company} {car.car_model}
                            </CardTitle>
                          </Box>
                          <CardDescription>
                            Dealer: {car.dealer?.dealer_ship_name || 'N/A'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Location: {car.dealer?.location || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Contact: {car.dealer?.dealer_phone || 'N/A'}
                            </Typography>
                          </Box>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setSelectedCar(car);
                              setBookCarDialogOpen(true);
                            }}
                          >
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </TabsContent>

            <TabsContent value="bookings" className="mt-4">
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={bookings}
                  columns={bookingColumns}
                  getRowId={(row) => row.booking_id}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  disableRowSelectionOnClick
                  loading={loading}
                />
              </Box>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Book Car Dialog */}
      <Dialog open={bookCarDialogOpen} onOpenChange={setBookCarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Car</DialogTitle>
            <DialogDescription>
              Book {selectedCar?.car_company} {selectedCar?.car_model} from{' '}
              {selectedCar?.dealer?.dealer_ship_name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="booking-date">Booking Date</Label>
              <Input
                id="booking-date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Car Details:</strong>
              </Typography>
              <Typography variant="body2">
                Company: {selectedCar?.car_company}
              </Typography>
              <Typography variant="body2">
                Model: {selectedCar?.car_model}
              </Typography>
              <Typography variant="body2">
                Dealer: {selectedCar?.dealer?.dealer_ship_name}
              </Typography>
              <Typography variant="body2">
                Location: {selectedCar?.dealer?.location}
              </Typography>
            </Box>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookCarDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookCar} disabled={!bookingDate}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CustomerDashboard;
