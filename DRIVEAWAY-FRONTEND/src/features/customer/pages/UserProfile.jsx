import React, { useState } from 'react'
import { getUserByEmail } from '../services'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { useEffect } from 'react';

function UserProfile() {

    const [profileUser, setProfileUser] = useState({});
    const [error, setError] = useState("");

    const { user } = useAuth();


    useEffect(() => {
      const getUser = async () => {
        try{
          const { data } = await getUserByEmail(user.email);
          console.log(data);
          setProfileUser(data);
        }catch(error){
          setError(error.response.data);
        }
      }
      getUser();
    }, [])
    

    return (
    <div>
      {profileUser.userEmail}
    </div>
  )
}

export default UserProfile