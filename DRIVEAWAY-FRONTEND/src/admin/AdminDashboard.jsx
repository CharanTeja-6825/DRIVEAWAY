import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  Dashboard as DashboardIcon,
  DirectionsCar,
  People,
  BookOnline,
  Store,
  CheckCircle,
  Cancel,
  TrendingUp,
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
import { adminAPI, dealerAPI, carAPI, bookingAPI, customerAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

const AdminDashboard = () => {
  const [dealers, setDealers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [dealersRes, carsRes, bookingsRes, customersRes] = await Promise.all([
        dealerAPI.getAllDealers(),
        carAPI.getAllCars(),
        bookingAPI.getAllBookings(),
        customerAPI.getAllCustomers(),
      ]);

      setDealers(Array.isArray(dealersRes.data) ? dealersRes.data : []);
      setCars(Array.isArray(carsRes.data) ? carsRes.data : []);
      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
      setCustomers(Array.isArray(customersRes.data) ? customersRes.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDealer = async () => {
    try {
      await adminAPI.approveDealer(selectedDealer.dealer_id);
      setApproveDialogOpen(false);
      fetchAllData();
    } catch (error) {
      console.error('Error approving dealer:', error);
    }
  };

  // Statistics
  const stats = {
    totalDealers: dealers.length,
    pendingDealers: dealers.filter((d) => !d.approval_status).length,
    totalCars: cars.length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter((b) => b.booking_status).length,
    totalCustomers: customers.length,
  };

  // Chart data
  const dealerStatusData = [
    { name: 'Approved', value: dealers.filter((d) => d.approval_status).length },
    { name: 'Pending', value: dealers.filter((d) => !d.approval_status).length },
  ];

  const bookingStatusData = [
    { name: 'Active', value: bookings.filter((b) => b.booking_status).length },
    { name: 'Pending', value: bookings.filter((b) => !b.booking_status).length },
  ];

  // Dealer columns
  const dealerColumns = [
    { field: 'dealer_id', headerName: 'ID', width: 130 },
    { field: 'dealer_ship_name', headerName: 'Dealership Name', width: 200 },
    { field: 'dealer_oname', headerName: 'Owner Name', width: 150 },
    { field: 'dealer_phone', headerName: 'Phone', width: 130 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'dealer_gst_in', headerName: 'GST Number', width: 150 },
    {
      field: 'approval_status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Approved' : 'Pending'}
          color={params.value ? 'success' : 'warning'}
          size="small"
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
          disabled={params.row.approval_status}
          onClick={() => {
            setSelectedDealer(params.row);
            setApproveDialogOpen(true);
          }}
        >
          {params.row.approval_status ? 'Approved' : 'Approve'}
        </Button>
      ),
    },
  ];

  // Car columns
  const carColumns = [
    { field: 'car_id', headerName: 'Car ID', width: 130 },
    { field: 'car_company', headerName: 'Company', width: 150 },
    { field: 'car_model', headerName: 'Model', width: 150 },
    {
      field: 'dealer',
      headerName: 'Dealer',
      width: 200,
      valueGetter: (params) => params.dealer_ship_name || 'N/A',
    },
  ];

  // Booking columns
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
          label={params.value ? 'Active' : 'Pending'}
          color={params.value ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
  ];

  // Customer columns
  const customerColumns = [
    { field: 'customer_id', headerName: 'ID', width: 130 },
    { field: 'customer_name', headerName: 'Name', width: 150 },
    { field: 'customer_phone', headerName: 'Phone', width: 130 },
    { field: 'customer_age', headerName: 'Age', width: 80 },
    { field: 'customer_license_no', headerName: 'License No', width: 150 },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your car rental business operations
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Dealers</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDealers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingDealers} pending approval
              </p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
              <DirectionsCar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCars}</div>
              <p className="text-xs text-muted-foreground">Available in fleet</p>
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
              <p className="text-xs text-muted-foreground">
                {stats.activeBookings} active bookings
              </p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <People className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader>
              <CardTitle>Dealer Status</CardTitle>
              <CardDescription>Distribution of dealer approval status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dealerStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dealerStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
              <CardDescription>Overview of booking statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Resources</CardTitle>
          <CardDescription>View and manage dealers, cars, bookings, and customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dealers" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dealers">Dealers</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="dealers" className="mt-4">
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={dealers}
                  columns={dealerColumns}
                  getRowId={(row) => row.dealer_id}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={loading}
                  slots={{ toolbar: CustomToolbar }}
                />
              </Box>
            </TabsContent>

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

            <TabsContent value="customers" className="mt-4">
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                  rows={customers}
                  columns={customerColumns}
                  getRowId={(row) => row.customer_id}
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

      {/* Approve Dealer Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Dealer</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedDealer?.dealer_ship_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveDealer}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
