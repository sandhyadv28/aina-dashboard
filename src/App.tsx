import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>

      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patient/:bedNumber" element={<PatientDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;