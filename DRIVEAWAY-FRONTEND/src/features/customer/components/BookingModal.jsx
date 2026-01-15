import * as React from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


import { createBooking } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import dayjs from "dayjs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};


export default function BookingModal({ open, handleClose, car }) {

    const { user } = useAuth();

    const [form, setForm] = React.useState({
        startDate: dayjs(),
        endDate: dayjs(),
    });


    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");

    const resetState = () => {
        setForm({
            startDate: dayjs(),
            endDate: dayjs()
        });
        setSuccess("");
        setError("");
        setLoading(false);
    };

    const onClose = () => {
        resetState();
        handleClose();
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            ...form,
            customerId: user.userId,
            dealerId: car.dealerId,
            carId: car.carId
        };

        try {
            const { data } = await createBooking(payload);
            setSuccess(data);
            setForm({
                startDate: dayjs(),
                endDate: dayjs()
            });
            console.log(data);
            onClose();
        } catch (err) {
            console.log(err);
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" mb={2}>
                    Book Car
                </Typography>

                <Stack spacing={2}>
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <DatePicker 
                        minDate={dayjs().get('h') > 10 ? dayjs().add(1, 'day') : dayjs()} 
                        format="DD/MM/YYYY" 
                        label="Start Date" 
                        name="startDate" 
                        onChange={(newDate) => {
                                setForm((prev) => ({ ...prev, startDate: newDate }))
                    }} />

                    <DatePicker 
                        minDate={dayjs().add(1, 'day')} 
                        format="DD/MM/YYYY" 
                        label="End Date" 
                        name="startDate" 
                        onChange={(newDate) => {
                                setForm((prev) => ({ ...prev, endDate: newDate }))
                    }} />


                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}