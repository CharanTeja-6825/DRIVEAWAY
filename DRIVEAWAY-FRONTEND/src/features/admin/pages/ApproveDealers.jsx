import React, { useEffect, useState } from 'react'
import { approveDealer, getAllApplications } from '../services';

function ApproveDealers() {
    const [applicationList, setApplicationList] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getApplications = async (e) => {
            try {
                const { data } = await getAllApplications();
                setApplicationList(data);
                console.log(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
        getApplications();
    }, [applicationList])

    const handleApprove = async (id) => {
        try {
            const { data } = await approveDealer(id);
            console.log(data);
            setMessage(data);
            setTimeout(() => {
                setMessage("");
            }, 1500);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='overflow-x-auto mt-3 flex justify-center'>
            
            { error && (<p className='text-red-500 font-bold'>{error}</p>)}
            { message && (<p className='text-green-400 font-bold'>{message}</p>)}
            <br />
            <table className="min-w-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className='px-4'>S.No</th>
                        <th className='px-4'>DealerShip Name</th>
                        <th className='px-4'>Dealer</th>
                        <th className='px-5 w-50'>GSTIn</th>
                        <th className='px-4'>Location</th>
                        <th className='px-4'>Created At</th>
                        <th className='px-4'>Approval</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicationList &&
                        applicationList.map((application, ind) => (
                            <tr key={application.id}>
                                <td className='text-center'>{ind+1}</td>
                                <td className='text-center'>{application.ownerName}</td>
                                <td className='text-center'>{application.dealerShipName}</td>
                                <td className='text-center'>{application.gstIn}</td>
                                <td className='text-center'>{application.location}</td>
                                <td className='text-center'>{application.createdAt.substring(0, 10)}</td>
                                <td className='text-center p-3 flex flex-col'>
                                    <button onClick={() => handleApprove(application.id)} className='bg-green-400 text-white rounded-xl w-25'>Approve</button>
                                    <button className='bg-red-400 text-white rounded-xl w-25'>Reject</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ApproveDealers