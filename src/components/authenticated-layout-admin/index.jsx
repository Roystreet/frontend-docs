import React from "react";
import { Outlet } from "react-router-dom";

const AuthenticatedLayoutAdmin = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="flex-1 ">
                    <div className='pl-2'>
                        <Outlet className="" />

                    </div>
                </div>
            </div>
        </>)
};

export default AuthenticatedLayoutAdmin;