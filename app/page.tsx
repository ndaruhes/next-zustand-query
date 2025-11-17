import React from 'react'
import MainLayout from './layouts/main-layout'
import DashboardLayout from './layouts/dashboard-layout'

export default function page() {
    return (
        <MainLayout>
            <div className="container">
                <h1>Anjay</h1>
            </div>
        </MainLayout>
    )
}
