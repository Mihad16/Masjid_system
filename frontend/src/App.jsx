import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/dashboard/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Members from "../pages/auth/Members";
import MemberDetail from "../pages/auth/MemberDetail";
import Dashboard from "../pages/dashboard/dashboard";
import MemberProfile from "../pages/auth/MemberProfile";
import AddMember from "../pages/members/AddMember";
import SetPassword from "../pages/auth/SetPassword";
import Varisangyam from "../pages/donations/varisangyam";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
<Route path="/member-profile" element={<MemberProfile />} />
<Route path="/add-member" element={<AddMember />} />
<Route path="/set-password/:id" element={<SetPassword />} />
<Route path="/varisangyam" element={<Varisangyam />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Members />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


<Route
  path="/members/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <MemberDetail />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;