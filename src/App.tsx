import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LanguageScreen from "./pages/LanguageScreen";
import LoginScreen from "./pages/LoginScreen";
import RoleSelection from "./pages/RoleSelection";
import WorkerSetup from "./pages/worker/WorkerSetup";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerJobs from "./pages/worker/WorkerJobs";
import JobDetails from "./pages/worker/JobDetails";
import ActiveJob from "./pages/worker/ActiveJob";
import EarningsScreen from "./pages/worker/EarningsScreen";
import WorkerProfile from "./pages/worker/WorkerProfile";
import WorkerEditProfile from "./pages/worker/WorkerEditProfile";
import WorkerHistory from "./pages/worker/WorkerHistory";
import WorkerHistoryDetails from "./pages/worker/WorkerHistoryDetails";
import ClientSetup from "./pages/client/ClientSetup";
import ClientDashboard from "./pages/client/ClientDashboard";
import PostJob from "./pages/client/PostJob";
import WorkerList from "./pages/client/WorkerList";
import WorkerProfileView from "./pages/client/WorkerProfileView";
import RateJob from "./pages/client/RateJob";
import ClientProfile from "./pages/client/ClientProfile";
import ClientEditProfile from "./pages/client/ClientEditProfile";
import ClientActiveJobs from "./pages/client/ClientActiveJobs";
import ClientHistory from "./pages/client/ClientHistory";
import ClientHistoryDetails from "./pages/client/ClientHistoryDetails";
import ClientJobDetails from "./pages/client/ClientJobDetails";
import ClientApplications from "./pages/client/ClientApplications";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorkers from "./pages/admin/AdminWorkers";
import AdminClients from "./pages/admin/AdminClients";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminReports from "./pages/admin/AdminReports";
import NotFound from "./pages/NotFound";
import ScreenNavigator from "./components/ScreenNavigator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/language" element={<LanguageScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/worker/setup" element={<WorkerSetup />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/jobs" element={<WorkerJobs />} />
          <Route path="/worker/job/:id" element={<JobDetails />} />
          <Route path="/worker/active-job" element={<ActiveJob />} />
          <Route path="/worker/active-job/:id" element={<ActiveJob />} />

          <Route path="/worker/earnings" element={<EarningsScreen />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/edit-profile" element={<WorkerEditProfile />} />
          <Route path="/worker/history" element={<WorkerHistory />} />
          <Route path="/worker/history/:id" element={<WorkerHistoryDetails />} />
          <Route path="/client/setup" element={<ClientSetup />} />

          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/post-job" element={<PostJob />} />
          <Route path="/client/workers" element={<WorkerList />} />
          <Route path="/client/worker/:id" element={<WorkerProfileView />} />
          <Route path="/client/rate-job" element={<RateJob />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/edit-profile" element={<ClientEditProfile />} />
          <Route path="/client/active-jobs" element={<ClientActiveJobs />} />
          <Route path="/client/active-job/:id" element={<ClientJobDetails />} />
          <Route path="/client/active-job/:id/applications" element={<ClientApplications />} />
          <Route path="/client/history" element={<ClientHistory />} />
          <Route path="/client/history/:id" element={<ClientHistoryDetails />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="workers" element={<AdminWorkers />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScreenNavigator />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
