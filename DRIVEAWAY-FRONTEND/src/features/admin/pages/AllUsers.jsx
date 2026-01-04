import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services';

function AllUsers() {
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUserList = async () => {
            try {
                const { data } = await getAllUsers();
                console.log(data);
                if (data) setUsersList(data);
            } catch (err) {
                setError(setError(err))
            }
        }
        getUserList();
    }, [])


    return (
        <div>
            {
                error ? (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
                ) :
                    (
                        <table style={{ border: "2px solid black", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid black" }}>S.No</th>
                                    <th style={{ border: "1px solid black" }}>Name</th>
                                    <th style={{ border: "1px solid black" }}>Phone</th>
                                    <th style={{ border: "1px solid black" }}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((user, ind) => (
                                    <tr key={ind}>
                                        <td style={{ border: "1px solid black" }}>{ind + 1}</td>
                                        <td style={{ border: "1px solid black" }}>{user.userName}</td>
                                        <td style={{ border: "1px solid black" }}>{user.userPhone}</td>
                                        <td style={{ border: "1px solid black" }}>{user.userEmail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    )
            }
        </div>
    )
}

export default AllUsers