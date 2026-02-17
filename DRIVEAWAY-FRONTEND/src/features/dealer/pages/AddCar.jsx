import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Stack,
	Select,
	MenuItem,
	ListItemIcon,
	ListItemText,
	FormControl,
	InputLabel
} from "@mui/material";
import { toast } from "sonner";
import { addCar } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { brandsArray } from "../../../shared/constants/brands";
import BrandSelection from "../components/BrandSelection";

export default function AddCar() {
	const { user } = useAuth();
	const dealerId = user.userId;

	const [form, setForm] = useState({
		dealerId,
		brand: "",
		model: "",
		year: "",
		pricePerDay: ""
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		setLoading(true);

		try {
			await addCar({
				...form,
				year: Number(form.year),
				pricePerDay: Number(form.pricePerDay)
			});

			toast.success("Car added successfully");
			setForm((prev) => ({
				...prev,
				brand: "",
				model: "",
				year: "",
				pricePerDay: ""
			}));
		} catch (err) {
			toast.error(
				err?.response?.data?.message ||
				err?.message ||
				"Failed to add car"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box maxWidth={420} mx="auto" mt={6} p={4} boxShadow={3} borderRadius={2}>
			<Typography variant="h6" mb={2}>
				Add Car
			</Typography>

			<Stack spacing={2}>
				<BrandSelection form={form} handleChange={handleChange}/>

				<TextField
					label="Model"
					name="model"
					value={form.model}
					onChange={handleChange}
					fullWidth
				/>

				<TextField
					label="Year"
					name="year"
					value={form.year}
					onChange={(e) =>
						setForm((p) => ({
							...p,
							year: e.target.value.replace(/\D/g, "")
						}))
					}
					inputProps={{ maxLength: 4 }}
					fullWidth
				/>

				<TextField
					label="Price Per Day"
					name="pricePerDay"
					value={form.pricePerDay}
					onChange={(e) =>
						setForm((p) => ({
							...p,
							pricePerDay: e.target.value.replace(/\D/g, "")
						}))
					}
					fullWidth
				/>

				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? "Saving..." : "Add Car"}
				</Button>
			</Stack>
		</Box>
	);
}
