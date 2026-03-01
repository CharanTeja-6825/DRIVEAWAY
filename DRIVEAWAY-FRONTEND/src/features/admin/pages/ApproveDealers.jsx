import React, { useEffect, useState } from 'react'
import { approveDealer, getAllApplications } from '../services';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button, 
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Typography,
    Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'sonner';

function ApproveDealers() {
    const [applicationList, setApplicationList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        id: null,
        approval: null,
        dealerName: ''
    });

    const getApplications = async () => {
            setLoading(true);
            try {
                const { data } = await getAllApplications();
                if(typeof(data) === "string") {
                    toast.info(data);
                    setApplicationList([]);
                }
                else if (Array.isArray(data)) {
                    setApplicationList(data);
                } else {
                    toast.error("Invalid data format received");
                    setApplicationList([]);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || error.message || "Failed to fetch applications");
                setApplicationList([]);
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
        getApplications();
    }, [])

    const handleOpenConfirm = (id, approval, dealerName) => {
        if (!id) {
            toast.error("Invalid dealer ID");
            return;
        }
        setConfirmDialog({
            open: true,
            id,
            approval,
            dealerName
        });
    };

    const handleCloseConfirm = () => {
        setConfirmDialog({
            open: false,
            id: null,
            approval: null,
            dealerName: ''
        });
    };

    const handleApprove = async () => {
        const { id, approval } = confirmDialog;
        
        if (!id) {
            toast.error("Invalid dealer ID");
            return;
        }

        setActionLoading(id);
        
        try {
            const { data } = await approveDealer(id, approval);
            console.log(data);
            toast.success(data || `Dealer ${approval ? 'approved' : 'rejected'} successfully`);
            await getApplications();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message || "Failed to process request");
        } finally {
            setActionLoading(null);
            handleCloseConfirm();
        }
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                Dealer Applications
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>S.No</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>Owner Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>DealerShip Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>GSTIN</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>Location</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>Created At</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 600, py: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applicationList && applicationList.length > 0 ? (
                                applicationList.map((application, ind) => (
                                    <TableRow 
                                        key={application.id || ind}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { bgcolor: 'grey.50' },
                                            '&:hover': { bgcolor: 'grey.100' },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell align="center">{ind + 1}</TableCell>
                                        <TableCell align="center">{application.ownerName || 'N/A'}</TableCell>
                                        <TableCell align="center">{application.dealerShipName || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={application.gstIn || 'N/A'} 
                                                size="small" 
                                                sx={{ bgcolor: 'grey.200' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{application.location || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            {application.createdAt 
                                                ? new Date(application.createdAt).toLocaleDateString('en-GB')
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleOpenConfirm(application.id, true, application.dealerShipName)}
                                                    disabled={actionLoading === application.id || !application.id}
                                                    startIcon={actionLoading === application.id ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                                                    sx={{
                                                        bgcolor: 'success.main',
                                                        color: 'white',
                                                        minWidth: 100,
                                                        '&:hover': {
                                                            bgcolor: 'success.dark',
                                                        },
                                                        '&:disabled': {
                                                            bgcolor: 'grey.300',
                                                        }
                                                    }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleOpenConfirm(application.id, false, application.dealerShipName)}
                                                    disabled={actionLoading === application.id || !application.id}
                                                    startIcon={actionLoading === application.id ? <CircularProgress size={16} color="inherit" /> : <CancelIcon />}
                                                    sx={{
                                                        bgcolor: 'error.main',
                                                        color: 'white',
                                                        minWidth: 100,
                                                        '&:hover': {
                                                            bgcolor: 'error.dark',
                                                        },
                                                        '&:disabled': {
                                                            bgcolor: 'grey.300',
                                                        }
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No pending applications found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.open}
                onClose={handleCloseConfirm}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        width: 'calc(100% - 32px)',
                        maxWidth: 400
                    }
                }}
            >
                <DialogTitle sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Confirm Action
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to <strong>{confirmDialog.approval ? 'approve' : 'reject'}</strong> the 
                        application for <strong>{confirmDialog.dealerName || 'this dealer'}</strong>?
                        {!confirmDialog.approval && ' This action cannot be undone.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={handleCloseConfirm} 
                        sx={{ color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleApprove} 
                        variant="contained"
                        sx={{
                            bgcolor: confirmDialog.approval ? 'success.main' : 'error.main',
                            '&:hover': {
                                bgcolor: confirmDialog.approval ? 'success.dark' : 'error.dark',
                            }
                        }}
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ApproveDealers
