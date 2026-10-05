import TopBar from '../components/layout/TopBar.jsx';

function MainLayout({ children, showHeader, navigate, shiftStarted, menuOpen, setMenuOpen }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {showHeader && (
        <TopBar
          navigate={navigate}
          shiftStarted={shiftStarted}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
      {children}
    </div>
  );
}

export default MainLayout;
