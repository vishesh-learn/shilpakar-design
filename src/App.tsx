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
import ClientSetup from "./pages/client/ClientSetup";
import ClientDashboard from "./pages/client/ClientDashboard";
import PostJob from "./pages/client/PostJob";
import WorkerList from "./pages/client/WorkerList";
import WorkerProfileView from "./pages/client/WorkerProfileView";
import RateWorker from "./pages/client/RateWorker";
import ClientProfile from "./pages/client/ClientProfile";
import NotFound from "./pages/NotFound";

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
          <Route path="/worker/earnings" element={<EarningsScreen />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/client/setup" element={<ClientSetup />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/post-job" element={<PostJob />} />
          <Route path="/client/workers" element={<WorkerList />} />
          <Route path="/client/worker/:id" element={<WorkerProfileView />} />
          <Route path="/client/rate-worker" element={<RateWorker />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
