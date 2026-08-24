import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import LoginPage from "./pages/LoginPage";
import MyLeavesPage from "./pages/MyLeavesPage";
const HRPanel = lazy(() => import("./pages/HRPanel"));
function HRRoute() { const { role } = useAuth(); return role === "hr" ? <Suspense fallback={<p>Loading HR panel...</p>}><HRPanel /></Suspense> : <Navigate to="/my-leaves" replace />; }
export default function App() { return <><Navigation /><Routes><Route path="/" element={<LoginPage />} /><Route element={<ProtectedRoute />}><Route path="/apply" element={<ApplyLeavePage />} /><Route path="/my-leaves" element={<MyLeavesPage />} /><Route path="/hr" element={<HRRoute />} /></Route></Routes></>; }
