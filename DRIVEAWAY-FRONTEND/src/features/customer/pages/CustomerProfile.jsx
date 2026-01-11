import React, { useEffect, useState } from "react";
import { applicationStatus, getUserByEmail } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import DealershipModal from "../components/DealershipModal";
import { Button, TextField, Alert } from "@mui/material";

function CustomerProfile() {
  const { user } = useAuth();

  const [profileUser, setProfileUser] = useState({
    userId: "",
    userName: "",
    userPhone: "",
    userAge: "",
    role: ""
  });

  const [approvalStatus, setApprovalStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  // 1️⃣ Fetch user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getUserByEmail(user.email);
        setProfileUser(data);
      } catch (err) {
        setError("Failed to load user");
      }
    };
    loadUser();
  }, [user.email]);

  // 2️⃣ Fetch application status AFTER userId exists
  useEffect(() => {
    if (!profileUser.userId) return;

    const loadStatus = async () => {
      try {
        const { data } = await applicationStatus(profileUser.userId);
        setApprovalStatus(data?.status); // PENDING / APPROVED / REJECTED
      } catch (err) {
        // No application found → allow user to apply
        setApprovalStatus(null);
      }
    };

    loadStatus();
  }, [profileUser.userId]);

  return (
    <div className="p-4 justify-center items-center flex mt-10">
      <div className="mt-5 flex flex-col w-75 gap-4 shadow-2xl p-4">

        {error && <Alert severity="error">{error}</Alert>}

        <TextField label="Full Name" value={profileUser.userName} />
        <TextField label="Phone" value={profileUser.userPhone} />
        <TextField label="Age" value={profileUser.userAge} />
        <TextField label="Role" value={profileUser.role} />

        {/* 3️⃣ Show application status if exists */}
        {approvalStatus && (
          <Alert
            severity={
              approvalStatus === "APPROVED"
                ? "success"
                : approvalStatus === "REJECTED"
                ? "error"
                : "info"
            }
          >
            Application Status: {approvalStatus}
          </Alert>
        )}

        {/* 4️⃣ Disable button if application exists */}
        <Button
          variant="contained"
          disabled={approvalStatus === "PENDING" || approvalStatus === "APPROVED"}
          onClick={() => setOpen(true)}
        >
          {approvalStatus ? "Application Submitted" : "Request for Dealer"}
        </Button>

        <DealershipModal
          open={open}
          id={profileUser.userId}
          handleClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}

export default CustomerProfile;
