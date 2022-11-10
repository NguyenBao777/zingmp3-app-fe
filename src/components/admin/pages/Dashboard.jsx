import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { HeaderAdmin, TableCategory } from "../../../components";

const Dashboard = () => {
    return (
        <div className="w-screen h-screen">
            <HeaderAdmin />
            <div className="w-full mt-14">
                <Routes>
                    <Route path="/dashboard/category" element={<TableCategory />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard
