import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-navy-800">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar title={title} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
