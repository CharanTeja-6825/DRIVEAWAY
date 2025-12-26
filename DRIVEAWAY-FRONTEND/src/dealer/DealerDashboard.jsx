import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  DirectionsCar,
  BookOnline,
  Add,
  Delete,
  CheckCircle,
  PendingActions,
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
import { dealerAPI, carAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const DealerDashboard = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCarDialogOpen, setAddCarDialogOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    car_company: '',
    car_model: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [carsRes, bookingsRes] = await Promise.all([
        carAPI.getAllCars(),
        bookingAPI.getAllBookings(),
      ]);

      const allCars = Array.isArray(carsRes.data) ? carsRes.data : [];
      const allBookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];

      // Filter cars by current dealer
      const dealerCars = allCars.filter(
        (car) => car.dealer?.dealer_id === user?.dealer_id
      );
      setCars(dealerCars);

      // Filter bookings for dealer's cars
      const dealerBookings = allBookings.filter((booking) =>
        dealerCars.some((car) => car.car_id === booking.car?.car_id)
      );
      setBookings(dealerBookings);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async () => {
    try {
      const carData = {
        ...newCar,
        dealer: {
          dealer_id: user.dealer_id,
        },
        created_at: new Date().toISOString(),
      };

      await carAPI.addCar(carData);
      setAddCarDialogOpen(false);
      setNewCar({ car_company: '', car_model: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carAPI.deleteCar(carId);
        fetchData();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await dealerAPI.approveBooking(bookingId);
      fetchData();
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const stats = {
    totalCars: cars.length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter((b) => b.booking_status).length,
    pendingBookings: bookings.filter((b) => !b.booking_status).length,
  };

  const carColumns = [
    { field: 'car_id', headerName: 'Car ID', width: 150 },
    { field: 'car_company', headerName: 'Company', width: 150 },
    { field: 'car_model', headerName: 'Model', width: 150 },
    {
      field: 'created_at',
      headerName: 'Added On',
      width: 180,
      valueFormatter: (params) => {
        return params ? new Date(params).toLocaleDateString() : 'N/A';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDeleteCar(params.row.car_id)}
        >
          <Delete className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const bookingColumns = [
    { field: 'booking_id', headerName: 'Booking ID', width: 150 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 150,
      valueGetter: (params) => params.customer_name || 'N/A',
    },
    {
      field: 'car',
      headerName: 'Car',
      width: 200,
      valueGetter: (params) => `${params.car_company || ''} ${params.car_model || ''}`,
    },
    { field: 'booking_date', headerName: 'Booking Date', width: 150 },
    {
      field: 'booking_status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Approved' : 'Pending'}
          color={params.value ? 'success' : 'warning'}
          size="small"
          icon={params.value ? <CheckCircle /> : <PendingActions />}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          size="sm"
          variant="outline"
          disabled={params.row.booking_status}
          onClick={() => handleApproveBooking(params.row.booking_id)}
        >
          {params.row.booking_status ? 'Approved' : 'Approve'}
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dealer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your cars and bookings
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
              <DirectionsCar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCars}</div>
              <p className="text-xs text-muted-foreground">In your fleet</p>
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

      {/* Data Tables */}
      <Card>
        <CardHeader>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <CardTitle>Manage Your Business</CardTitle>
              <CardDescription>View and manage your cars and bookings</CardDescription>
            </Box>
            <Button onClick={() => setAddCarDialogOpen(true)}>
              <Add className="mr-2 h-4 w-4" /> Add Car
            </Button>
          </Box>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cars">My Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="cars" className="mt-4">
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={cars}
                  columns={carColumns}
                  getRowId={(row) => row.car_id}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  slots={{ toolbar: CustomToolbar }}
                />
              </Box>
            </TabsContent>

            <TabsContent value="bookings" className="mt-4">
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={bookings}
                  columns={bookingColumns}
                  getRowId={(row) => row.booking_id}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  slots={{ toolbar: CustomToolbar }}
                />
              </Box>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Car Dialog */}
      <Dialog open={addCarDialogOpen} onOpenChange={setAddCarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Car</DialogTitle>
            <DialogDescription>
              Add a new car to your dealership fleet
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Car Company</Label>
              <Input
                id="company"
                placeholder="e.g., Toyota, Honda, Ford"
                value={newCar.car_company}
                onChange={(e) => setNewCar({ ...newCar, car_company: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Car Model</Label>
              <Input
                id="model"
                placeholder="e.g., Camry, Accord, Mustang"
                value={newCar.car_model}
                onChange={(e) => setNewCar({ ...newCar, car_model: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCarDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCar}>Add Car</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DealerDashboard;
