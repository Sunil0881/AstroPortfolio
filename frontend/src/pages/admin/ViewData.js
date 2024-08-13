import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';

const ViewData = () => {
    const [data, setData] = useState([]);
    const urlvar = 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${urlvar}/getData`);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <AdminNav />
            <div className='text-center pt-10 text-2xl font-semibold'>
                View Data
            </div>
            <div className='overflow-x-auto my-8 mx-5'>
                <table className='min-w-full bg-white border border-gray-400'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border border-gray-400 text-center'>S.No</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Name</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Email</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Phone</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Date</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Time</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Mode</th>
                            <th className='py-2 px-4 border border-gray-400 text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((datum, index) => (
                            <tr key={datum._id}>
                                <td className='py-2 px-4 border border-gray-400'>{index + 1}</td>
                                <td className='py-2 px-4 border border-gray-400 overflow-hidden max-w-xs'>
                                    <div className="truncate hover:overflow-auto hover:scrollbar-thin hover:scrollbar-thumb-gray-400">
                                        {datum.name}
                                    </div>
                                </td>
                                <td className='py-2 px-4 border border-gray-400 overflow-hidden max-w-xs'>
                                    <div className="truncate hover:overflow-auto hover:scrollbar-thin hover:scrollbar-thumb-gray-400">
                                        {datum.email}
                                    </div>
                                </td>
                                <td className='py-2 px-4 border border-gray-400 overflow-hidden max-w-xs'>
                                    <div className="truncate hover:overflow-auto hover:scrollbar-thin hover:scrollbar-thumb-gray-400">
                                        {datum.phone}
                                    </div>
                                </td>
                                <td className='py-2 px-4 border border-gray-400'>{formatDate(datum.date)}</td>
                                <td className='py-2 px-4 border border-gray-400'>{datum.time}</td>
                                <td className='py-2 px-4 border border-gray-400'>{datum.mode}</td>
                                <td className='py-2 px-4 border border-gray-400'>
                                    {datum.isSubmitted ? 'Confirmed' : 'Pending'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewData;