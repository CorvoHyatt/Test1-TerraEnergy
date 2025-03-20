import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { UserList } from "./components/UserList";
import { Box, CssBaseline } from "@mui/material";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
