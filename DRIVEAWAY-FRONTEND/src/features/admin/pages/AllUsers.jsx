import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services';

function AllUsers() {
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState("");

    useEffect(async () => {
        try {
            const response = await getAllUsers();
        } catch (error) {
            setError()
        }
    }, [])


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList.map((user, ind) => (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.userPhone}</td>
                                <td>{user.userEmail}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers