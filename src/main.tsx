import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import './lib/i18n'
import { Toaster } from 'sonner'

createRoot(document.getElementById("root")!).render(<App />);
