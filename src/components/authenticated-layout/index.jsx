
import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';

const AutenticatedLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}

export default AutenticatedLayout;