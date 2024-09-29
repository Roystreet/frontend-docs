
import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';

const AutenticatedLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 pl-2">
                <Outlet className=" p-2" />
            </div>
        </div>
    );
}

export default AutenticatedLayout;