import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import LuminaBg from './LuminaBg';

export default function AppShell() {
  return (
    <>
      <LuminaBg />
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </>
  );
}
