import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Layout Component - Main layout wrapper with sidebar and header
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Header />
          <div className="mt-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
