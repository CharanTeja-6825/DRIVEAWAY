import React, { useEffect, useState } from "react";
import { applicationStatus, getUserByEmail } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import DealershipModal from "../components/DealershipModal";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";

function CustomerProfile() {
  const { user } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  /* 1️⃣ Load user */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getUserByEmail(user.email);
        setProfileUser(data);
      } catch {
        setError("Failed to load user");
      }
    };

    loadUser();
  }, [user.email]);

  /* 2️⃣ Load application status */
  useEffect(() => {
    if (!profileUser?.userId) return;

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

    loadStatus();
  }, [profileUser?.userId]);

  /* 3️⃣ Optimistic update after submit */
  const handleSubmitted = () => {
    setApprovalStatus("PENDING");
    setOpen(false);
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

        {error && <Alert severity="error">{error}</Alert>}

        <TextField label="Full Name" value={profileUser.userName} disabled />
        <TextField label="Phone" value={profileUser.userPhone} disabled />
        <TextField label="Age" value={profileUser.userAge} disabled />
        <TextField label="Role" value={profileUser.role} disabled />

        {/* Status */}
        {approvalStatus && (
          <Alert
            severity={
              approvalStatus === "PENDING"
                ? "info"
                : approvalStatus === "APPROVED"
                ? "success"
                : "error"
            }
          >
            Application Status: {approvalStatus}
          </Alert>
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
        />
      </div>
    </div>
  );
}

export default CustomerProfile;