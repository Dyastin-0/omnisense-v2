import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";

const Signin = lazy(() => import("./pages/Signin"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense>
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
