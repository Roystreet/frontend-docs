import React from "react";
import { Outlet } from "react-router-dom";
import NavAdmin from "../nav-admin";

const AuthenticatedLayoutAdmin = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="flex-1 ">
                    <NavAdmin />
                    <div className='pl-2'>
                        <Outlet className="" />

                    </div>
                </div>
            </div>
        </>)
};

export default AuthenticatedLayoutAdmin;