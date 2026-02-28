import React, { useCallback, useEffect, useRef, useState } from "react";
import { applicationStatus, getUserByEmail, updateCustomerProfile } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import DealershipModal from "../components/DealershipModal";
import { Button, TextField, CircularProgress, Avatar, Badge, IconButton } from "@mui/material";
import { toast } from "sonner";
import InlineAlert from "../../../shared/components/InlineAlert";
import EditIcon from "@mui/icons-material/Edit";

function CustomerProfile() {
	const { user } = useAuth();

	const [profileUser, setProfileUser] = useState(null);
	const [approvalStatus, setApprovalStatus] = useState(null);
	const [statusLoading, setStatusLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);

	/* 1️⃣ Load user */
	const loadUser = useCallback(async () => {
		try {
			const { data } = await getUserByEmail(user.email);
			setProfileUser(data);
		} catch {
			toast.error("Failed to load user");
		}
	}, [user.email]);

	useEffect(() => {
		loadUser();
	}, [loadUser]);


	const loadStatus = async () => {
		setStatusLoading(true);
		try {
			const { data } = await applicationStatus(profileUser.userId);
			setApprovalStatus(data); // PENDING | APPROVED | REJECTED
		} catch {
			setApprovalStatus(null); // no application
		} finally {
			setStatusLoading(false);
		}
	};
	/* 2️⃣ Load application status */
	useEffect(() => {
		if (!profileUser?.userId) return;
		loadStatus();
	}, [profileUser?.userId]);

	/* 3️⃣ Optimistic update after submit */
	const handleSubmitted = () => {
		setApprovalStatus("PENDING");
		setOpen(false);
	};

	const handleEditProfile = () => {
		if (uploading) return;
		fileInputRef.current?.click();
	};

	const handleAvatarChange = async (event) => {
		if (!profileUser?.userId) return;
		const input = event.target;
		const file = input.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("userId", profileUser.userId);
		formData.append("profileImage", file);

		setUploading(true);
		try {
			await updateCustomerProfile(formData);
			toast.success("Profile updated");
			await loadUser();
		} catch {
			toast.error("Failed to update profile");
		} finally {
			setUploading(false);
			input.value = "";
		}
	};

	if (!profileUser) {
		return (
			<div className="flex justify-center mt-20">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="p-4 flex justify-center mt-10">
			<div className="flex flex-col gap-4 shadow-2xl p-6 w-96">

				<div className="flex justify-center">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleAvatarChange}
						style={{ display: "none" }}
					/>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						badgeContent={
							<IconButton
								size="small"
								color="primary"
								disabled={uploading}
								onClick={handleEditProfile}
								sx={{
									bgcolor: "background.paper",
									border: "1px solid",
									borderColor: "divider",
									width: 25,
									height: 25
								}}
							>
								{uploading ? (
									<CircularProgress size={18} thickness={6} />
								) : (
									<EditIcon fontSize="small" />
								)}
							</IconButton>
						}
					>
						<Avatar alt={profileUser.userName} src={profileUser.profileUrl} sx={{ height : 64, width : 64 }} />
					</Badge>
				</div>

				<TextField label="Full Name" value={profileUser.userName} disabled />
				<TextField label="Phone" value={profileUser.userPhone} disabled />
				<TextField label="Age" value={profileUser.userAge} disabled />
				<TextField label="Role" value={profileUser.role} disabled />

				{/* Status */}
				{approvalStatus && (
					<InlineAlert
						severity={
							approvalStatus === "PENDING"
								? "info"
								: approvalStatus === "APPROVED"
									? "success"
									: "error"
						}
					>
						Application Status: {approvalStatus}
					</InlineAlert>
				)}

				{/* Button */}
				<Button
					variant="contained"
					disabled={
						statusLoading ||
						approvalStatus === "PENDING" ||
						approvalStatus === "APPROVED"
					}
					onClick={() => setOpen(true)}
				>
					{statusLoading
						? "Checking application..."
						: approvalStatus
							? "Application Submitted"
							: "Request for Dealer"}
				</Button>

				{/* Modal */}
				<DealershipModal
					open={open}
					id={profileUser.userId}
					handleClose={() => setOpen(false)}
					onSubmitted={handleSubmitted}
					reload={loadStatus}
				/>
			</div>
		</div>
	);
}

export default CustomerProfile;