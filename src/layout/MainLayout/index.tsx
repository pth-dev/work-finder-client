import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Header component would go here */}
      <header className="header">
        <h1>WorkFinder</h1>
        {/* Navigation component would go here */}
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer component would go here */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} WorkFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
