import React, { useState } from 'react'
import { getUserByEmail } from '../services'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { useEffect } from 'react';
import DealershipModal from '../../../shared/components/DealershipModal';
import { Box, Button, TextField } from '@mui/material';



function UserProfile() {

  const [profileUser, setProfileUser] = useState({});
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useAuth();


  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getUserByEmail(user.email);
        console.log(data);
        setProfileUser(data);
      } catch (error) {
        setError(error.response.data);
      }
    }
    getUser();
  }, [])


  return (
    <div className='p-4 justify-center items-center flex mt-10'>
      <div className='mt-5 flex flex-col w-75 gap-5 shadow-2xl p-4'>
        {/* <input value={profileUser.userName} type="text" /> */}
        <TextField
          label="Full Name"
          name="userName"
          value={profileUser.userName}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        <TextField
          label="Phone"
          value={profileUser.userPhone}
          type="text"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        <TextField
          label="Age"
          value={profileUser.userAge}
          type="text"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        <TextField
          label="Role"
          value={profileUser.role}
          type="text"
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        <Button
          className='bg-blue-500 text-white font-bold rounded-xl p-2'
          onClick={() => setOpen(true)}>
          Request for Dealer
        </Button>

        <DealershipModal
          open={open}
          handleClose={() => setOpen(false)}
        />

      </div>
    </div>
  )
}

export default UserProfile