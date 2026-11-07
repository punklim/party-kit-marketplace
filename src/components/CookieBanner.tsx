import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-6 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <p className="text-sm flex-1">
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez leur utilisation.
          <Link to="/mentions-legales" className="underline ml-1">En savoir plus</Link>
        </p>
        <div className="flex gap-3">
          <button onClick={() => setVisible(false)} className="text-sm text-zinc-400 hover:text-white px-4 py-2">Refuser</button>
          <button onClick={accept} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90">Accepter</button>
        </div>
      </div>
    </div>
  );
}