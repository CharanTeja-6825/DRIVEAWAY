import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services';

function AllUsers() {
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const handleRole = () => {
        role === "CUSTOMER" ? setRole("DEALER") : setRole("CUSTOMER");
    }

    useEffect(() => {
        const getUserList = async () => {
            try {
                const { data } = await getAllUsers();
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
                        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 mt-5">
                            {/* buttons */}
                            <div className="flex gap-6 mb-6">
                                <button
                                    onClick={handleRole}
                                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Customers
                                </button>
                                <button
                                    onClick={handleRole}
                                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Dealers
                                </button>
                            </div>

                            {/* table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-md">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="px-4 py-2 text-center">S.No</th>
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Phone</th>
                                            <th className="px-4 py-2 text-left">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.map(
                                            (user, ind) =>
                                                user.role === role && (
                                                    <tr
                                                        key={ind}
                                                        className="odd:bg-white even:bg-gray-100 hover:bg-blue-50 transition"
                                                    >
                                                        <td className="px-4 py-2 text-center border-t">
                                                            {ind + 1}
                                                        </td>
                                                        <td className="px-4 py-2 border-t">{user.userName}</td>
                                                        <td className="px-4 py-2 border-t">{user.userPhone}</td>
                                                        <td className="px-4 py-2 border-t">{user.userEmail}</td>
                                                    </tr>
                                                )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    )
            }
        </div>
    )
}

export default AllUsers