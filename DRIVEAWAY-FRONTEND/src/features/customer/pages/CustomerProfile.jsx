import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  applicationStatus,
  getUserByEmail,
  updateCustomerProfile,
} from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import DealershipModal from "../components/DealershipModal";
import {
  Button,
  TextField,
  CircularProgress,
  Avatar,
  Badge,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Cake as CakeIcon,
  Shield as ShieldIcon,
  CameraAlt as CameraAltIcon,
  Storefront as StorefrontIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import InlineAlert from "../../../shared/components/InlineAlert";

function CustomerProfile() {
  const { user } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    userName: "",
    userPhone: "",
    userAge: "",
  });
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
      setApprovalStatus(data);
    } catch {
      setApprovalStatus(null);
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

  /* 4️⃣ Edit mode handlers */
  const startEditing = () => {
    setEditForm({
      userName: profileUser.userName || "",
      userPhone: profileUser.userPhone || "",
      userAge: profileUser.userAge || "",
    });
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditForm({ userName: "", userPhone: "", userAge: "" });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profileUser?.userId) return;

    const formData = new FormData();
    formData.append("userId", profileUser.userId);
    formData.append("userName", editForm.userName);
    formData.append("userPhone", editForm.userPhone);
    formData.append("userAge", editForm.userAge);

    setSaving(true);
    try {
      await updateCustomerProfile(formData);
      toast.success("Profile updated successfully");
      await loadUser();
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* 5️⃣ Avatar upload */
  const handleEditAvatar = () => {
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
      toast.success("Profile photo updated");
      await loadUser();
    } catch {
      toast.error("Failed to update profile photo");
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  if (!profileUser) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 520,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 6,
          overflow: "hidden",
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
            pt: { xs: 4, sm: 5 },
            pb: { xs: 6, sm: 7 },
            px: 3,
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Edit / Save / Cancel buttons */}
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
            {editing ? (
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={cancelEditing}
                  disabled={saving}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  }}
                >
                  {saving ? (
                    <CircularProgress size={18} sx={{ color: "white" }} />
                  ) : (
                    <SaveIcon fontSize="small" />
                  )}
                </IconButton>
              </Stack>
            ) : (
              <IconButton
                size="small"
                onClick={startEditing}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Avatar */}
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
                disabled={uploading}
                onClick={handleEditAvatar}
                sx={{
                  bgcolor: "white",
                  border: "2px solid",
                  borderColor: "primary.main",
                  width: 32,
                  height: 32,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                {uploading ? (
                  <CircularProgress size={16} thickness={6} />
                ) : (
                  <CameraAltIcon sx={{ fontSize: 16, color: "primary.main" }} />
                )}
              </IconButton>
            }
          >
            <Avatar
              alt={profileUser.userName}
              src={profileUser.profileUrl}
              sx={{
                width: { xs: 88, sm: 100 },
                height: { xs: 88, sm: 100 },
                border: "4px solid rgba(255,255,255,0.4)",
                fontSize: "2rem",
                mx: "auto",
              }}
            />
          </Badge>
          <Typography
            variant="h5"
            sx={{ color: "white", mt: 1.5, fontWeight: 700 }}
          >
            {profileUser.userName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.8)", mt: 0.25 }}
          >
            {user.email}
          </Typography>
        </Box>

        {/* Profile fields */}
        <Box sx={{ px: { xs: 2.5, sm: 4 }, py: 3 }}>
          <Stack spacing={2.5}>
            {/* Full Name */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PersonIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              {editing ? (
                <TextField
                  label="Full Name"
                  name="userName"
                  value={editForm.userName}
                  onChange={handleFieldChange}
                  size="small"
                  fullWidth
                />
              ) : (
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {profileUser.userName || "—"}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Phone */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PhoneIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              {editing ? (
                <TextField
                  label="Phone"
                  name="userPhone"
                  value={editForm.userPhone}
                  onChange={handleFieldChange}
                  size="small"
                  fullWidth
                />
              ) : (
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {profileUser.userPhone || "—"}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Age */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CakeIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              {editing ? (
                <TextField
                  label="Age"
                  name="userAge"
                  value={editForm.userAge}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      userAge: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  size="small"
                  fullWidth
                  inputProps={{ maxLength: 3 }}
                />
              ) : (
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1">
                    {profileUser.userAge || "—"}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Role (read-only always) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ShieldIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1">{profileUser.role}</Typography>
              </Box>
            </Box>

            {editing && (
              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={cancelEditing}
                  disabled={saving}
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  startIcon={
                    saving ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  size="small"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Stack>
            )}
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Dealer Application Section */}
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <StorefrontIcon sx={{ color: "text.secondary", fontSize: 22 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Dealer Application
              </Typography>
            </Box>

            {approvalStatus && (
              <Box sx={{ mb: 2 }}>
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
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
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
          </Box>
        </Box>

        {/* Modal */}
        <DealershipModal
          open={open}
          id={profileUser.userId}
          handleClose={() => setOpen(false)}
          onSubmitted={handleSubmitted}
          reload={loadStatus}
        />
      </Box>
    </Box>
  );
}

export default CustomerProfile;