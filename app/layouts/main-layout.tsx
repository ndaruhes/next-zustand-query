'use client'

import { Navbar } from '@/components/sections/navbar';
import React, { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="main-layout">
            <Navbar />
            {children}
        </div>
    );
}