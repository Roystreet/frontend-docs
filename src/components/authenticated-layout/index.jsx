
import React from 'react';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';
import NavHeader from '../nav';

const AutenticatedLayout = () => {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 ">
                    <NavHeader />
                    <div className='pl-2'>
                    <Outlet className="" />

                    </div>
                </div>
            </div>
        </>
    );
}

export default AutenticatedLayout;