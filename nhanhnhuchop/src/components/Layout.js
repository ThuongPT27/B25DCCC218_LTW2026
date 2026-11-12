import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div>
    <NavBar />
    <main className="content">
      {loading ? (
        <p>Đang tải câu hỏi...</p>
      ) : error ? (
        <p>Không tải được câu hỏi</p>
      ) : (
        <Outlet />
      )}
    </main>
  </div>
);

export default Layout;
