import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import GoDBPage from "./pages/GoDBPage";
import DocumentationPage from "./pages/DocumentationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RECAPTCHA_SITE_KEY = "6Lc-OzgsAAAAAAIBOBNb7HrBqXDr9VIQ2HCnEKtX";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/godb" element={<GoDBPage />} />
              <Route path="/godb.html" element={<GoDBPage />} />
              <Route path="/godb/documentation" element={<DocumentationPage />} />
              <Route path="/godb/documentation.html" element={<DocumentationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  </QueryClientProvider>
);

export default App;
