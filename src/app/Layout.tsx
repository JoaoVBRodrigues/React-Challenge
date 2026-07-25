import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Outlet />
    </div>
  );
}
