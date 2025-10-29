import React from 'react';

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">Sidebar</aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 p-4">Header</header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;