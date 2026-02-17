import React, { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	Typography,
	alpha
} from "@mui/material";
import {
	Assignment as RequestsIcon,
	Dashboard as DashboardIcon,
	People as PeopleIcon,
	PersonAdd as PersonAddIcon,
	Shield as ShieldIcon
} from "@mui/icons-material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isHtmlResponse } from "../../../shared/utils/responseUtils";
import { getAllApplications, getAllUsers } from "../services";

const StatCard = ({ icon: Icon, title, value, helper, color, bgColor }) => (
	<Card
		elevation={0}
		sx={{
			height: "100%",
			borderRadius: 3,
			border: "1px solid",
			borderColor: "divider",
			transition: "all 0.3s ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: (theme) =>
					`0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
				borderColor: color
			}
		}}
	>
		<CardContent sx={{ p: 3 }}>
			<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
				<Box>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{title}
					</Typography>
					<Typography variant="h3" fontWeight={700} color={color}>
						{value}
					</Typography>
					{helper && (
						<Typography variant="caption" color="text.secondary">
							{helper}
						</Typography>
					)}
				</Box>
				<Box
					sx={{
						width: 56,
						height: 56,
						borderRadius: 2,
						bgcolor: bgColor,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon sx={{ fontSize: 28, color }} />
				</Box>
			</Stack>
		</CardContent>
	</Card>
);

const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
	<Card
		elevation={0}
		sx={{
			borderRadius: 3,
			border: "1px solid",
			borderColor: "divider",
			cursor: "pointer",
			transition: "all 0.3s ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: (theme) =>
					`0 12px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
				borderColor: "primary.main"
			}
		}}
		onClick={onClick}
	>
		<CardContent sx={{ p: 3 }}>
			<Stack direction="row" spacing={2} alignItems="center">
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: 2,
						background: (theme) =>
							`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon sx={{ fontSize: 24, color: "white" }} />
				</Box>
				<Box>
					<Typography variant="subtitle1" fontWeight={600}>
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</Box>
			</Stack>
		</CardContent>
	</Card>
);

function AdminHome() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const [usersResponse, applicationsResponse] = await Promise.all([
					getAllUsers(),
					getAllApplications()
				]);
				const usersData = usersResponse?.data;
				if (Array.isArray(usersData)) {
					setUsers(usersData);
				} else if (typeof usersData === "string") {
					if (isHtmlResponse(usersData)) {
						toast.error("Unable to load user summary right now.");
					} else {
						toast.info(usersData);
					}
					setUsers([]);
				}

				const applicationsData = applicationsResponse?.data;
				if (Array.isArray(applicationsData)) {
					setApplications(applicationsData);
				} else if (typeof applicationsData === "string") {
					if (isHtmlResponse(applicationsData)) {
						toast.error("Unable to load dealer requests right now.");
					} else {
						toast.info(applicationsData);
					}
					setApplications([]);
				}
			} catch {
				toast.error("Failed to load admin dashboard data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchAdminData();
	}, []);

	const stats = useMemo(() => {
		const totalUsers = users.length;
		const dealers = users.filter((user) => user.role === "DEALER").length;
		const customers = users.filter((user) => user.role === "CUSTOMER").length;
		const pendingRequests = applications.length;

		return {
			totalUsers,
			dealers,
			customers,
			pendingRequests
		};
	}, [users, applications]);

	const recentApplications = useMemo(
		() =>
			[...applications]
				.sort(
					(a, b) =>
						new Date(b.createdAt || 0).getTime() -
						new Date(a.createdAt || 0).getTime()
				)
				.slice(0, 4),
		[applications]
	);

	if (loading) {
		return (
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="60vh"
				gap={2}
			>
				<CircularProgress size={48} thickness={4} />
				<Typography variant="body2" color="text.secondary">
					Loading admin dashboard...
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				p: { xs: 2, sm: 3, md: 4 },
				minHeight: "100vh",
				bgcolor: "background.default"
			}}
		>
			<Box sx={{ mb: 4 }}>
				<Stack direction="row" alignItems="center" spacing={2} mb={1}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 48,
							height: 48,
							borderRadius: 2,
							background: (theme) =>
								`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
							boxShadow: (theme) =>
								`0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
						}}
					>
						<DashboardIcon sx={{ color: "white", fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: "-0.02em" }}
						>
							Admin Overview
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Track users, dealer onboarding, and platform activity.
						</Typography>
					</Box>
				</Stack>
			</Box>

			<Grid container spacing={3} sx={{ mb: 3 }}>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={PeopleIcon}
						title="Total Users"
						value={stats.totalUsers}
						helper="All registered accounts"
						color="primary.main"
						bgColor={(theme) => alpha(theme.palette.primary.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={PersonAddIcon}
						title="Customers"
						value={stats.customers}
						helper="Active customers"
						color="success.main"
						bgColor={(theme) => alpha(theme.palette.success.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={ShieldIcon}
						title="Dealers"
						value={stats.dealers}
						helper="Verified partners"
						color="secondary.main"
						bgColor={(theme) => alpha(theme.palette.secondary.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={RequestsIcon}
						title="Pending Requests"
						value={stats.pendingRequests}
						helper="Awaiting review"
						color="warning.main"
						bgColor={(theme) => alpha(theme.palette.warning.main, 0.12)}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card
						elevation={0}
						sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
					>
						<CardContent sx={{ p: 3 }}>
							<Stack direction="row" justifyContent="space-between" alignItems="center">
								<Stack direction="row" spacing={1.5} alignItems="center">
									<RequestsIcon color="primary" />
									<Box>
										<Typography variant="h6" fontWeight={600}>
											Recent Dealer Applications
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Latest onboarding requests waiting for approval.
										</Typography>
									</Box>
								</Stack>
								<Button
									variant="outlined"
									size="small"
									onClick={() => navigate("/admin/applications")}
								>
									Review Queue
								</Button>
							</Stack>
							<Divider sx={{ my: 2 }} />
							{recentApplications.length === 0 ? (
								<Typography variant="body2" color="text.secondary">
									No pending dealer requests right now.
								</Typography>
							) : (
								<Stack spacing={2}>
									{recentApplications.map((application, index) => (
										<Box key={application.id || index}>
											<Stack
												direction="row"
												justifyContent="space-between"
												alignItems="center"
											>
												<Box>
													<Typography variant="subtitle2" fontWeight={600}>
														{application.dealerShipName || "Dealer Application"}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														Owner: {application.ownerName || "Pending"}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{application.location || "Location pending"} •{" "}
														{application.createdAt
															? new Date(application.createdAt).toLocaleDateString()
															: "Date pending"}
													</Typography>
												</Box>
												<Chip label="Pending" color="warning" size="small" />
											</Stack>
											{index !== recentApplications.length - 1 && (
												<Divider sx={{ mt: 2 }} />
											)}
										</Box>
									))}
								</Stack>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Stack spacing={2}>
						<QuickActionCard
							icon={PeopleIcon}
							title="Manage Users"
							description="Review customers and dealer profiles."
							onClick={() => navigate("/admin/all")}
						/>
						<QuickActionCard
							icon={RequestsIcon}
							title="Approve Dealers"
							description="Process pending dealership requests."
							onClick={() => navigate("/admin/applications")}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default AdminHome;
