// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Router } from "./router";
import { ReactQueryProvider } from "@/queryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Toaster2 } from "@/components/ui/sonner";

// Import Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ReactQueryProvider>
        <Router />
        <Toaster2 duration={3000} />
        <Toaster />
      </ReactQueryProvider>
    </ClerkProvider>,
    // </StrictMode>,
  );
}
