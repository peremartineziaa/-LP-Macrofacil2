import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, ArrowUp, X, Check } from 'lucide-react';

interface NotificationItem {
  name: string;
  city: string;
  plan: string;
}

const NOTIFICATIONS_LIST: NotificationItem[] = [
  { name: 'María', city: 'Barcelona', plan: 'Plan VIP' },
  { name: 'Juan', city: 'Santiago de Chile', plan: 'Plan VIP' },
  { name: 'Carlos', city: 'Madrid', plan: 'Plan VIP' },
  { name: 'Sofía', city: 'Ciudad de México', plan: 'Plan VIP' },
  { name: 'Alejandro', city: 'Bogotá', plan: 'Plan VIP' },
  { name: 'Lucía', city: 'Buenos Aires', plan: 'Plan VIP' },
  { name: 'Mateo', city: 'Lima', plan: 'Plan VIP' },
  { name: 'Elena', city: 'Zaragoza', plan: 'Plan VIP' },
  { name: 'Valentina', city: 'Guadalajara', plan: 'Plan VIP' },
  { name: 'Diego', city: 'Málaga', plan: 'Plan VIP' },
  { name: 'Camila', city: 'Medellín', plan: 'Plan VIP' },
  { name: 'Lucas', city: 'Valencia', plan: 'Plan VIP' },
  { name: 'Isabella', city: 'Quito', plan: 'Plan VIP' },
  { name: 'Daniel', city: 'Sevilla', plan: 'Plan VIP' },
  { name: 'Javier', city: 'Bilbao', plan: 'Plan VIP' },
  { name: 'Mariana', city: 'Caracas', plan: 'Plan VIP' },
  { name: 'Nicolás', city: 'Montevideo', plan: 'Plan VIP' },
  { name: 'Andrés', city: 'Alicante', plan: 'Plan VIP' },
  { name: 'Paula', city: 'San José', plan: 'Plan VIP' },
  { name: 'Gabriel', city: 'Guatemala', plan: 'Plan VIP' },
];

export default function SocialProofAndMobileCTA() {
  const [hasReachedOffer, setHasReachedOffer] = useState(false);
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetEl = document.getElementById('checkout-pricing-section');
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // HasReachedOffer: Triggered once the top profile of #checkout-pricing-section is close to entering or has entered
      // to start the social proof timer.
      const hasReached = (rect.top <= windowHeight + 100) || (scrollTop + windowHeight > targetEl.offsetTop);
      
      if (hasReached) {
        setHasReachedOffer(true);
      }

      // Show scroll CTA only if we are currently looking at or below the pricing section
      // and we want to scroll back to the offers if we scrolled down to FAQ, author, etc.
      // Let's activate the CTA when the pricing section is scrolled past (i.e. top is out of view)
      // or simply once they have reached it.
      // "solo aparecer cuando el visitante llegue con el scroll a la sección de ofertas. Al hacer clic, el botón debe desplazar la página suavemente de regreso a la oferta principal (Plan VIP)."
      const isScrollInOrBelowOffer = rect.top <= windowHeight * 0.5;
      setShowScrollCTA(isScrollInOrBelowOffer);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once initially
    setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Notifications display timing loop
  useEffect(() => {
    if (!hasReachedOffer) return;

    let showTimer: any;
    let hideTimer: any;

    const triggerNotification = () => {
      // Pick random notification
      const randomIndex = Math.floor(Math.random() * NOTIFICATIONS_LIST.length);
      setCurrentNotification(NOTIFICATIONS_LIST[randomIndex]);
      setAnimateIn(true);

      // Remain visible for 4 seconds
      hideTimer = setTimeout(() => {
        setAnimateIn(false);
        // After transition out, clear state
        setTimeout(() => {
          setCurrentNotification(null);
        }, 300); // match transition speed

        // Schedule next one in 15-20 seconds
        const randomDelay = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
        showTimer = setTimeout(triggerNotification, randomDelay);
      }, 4000);
    };

    // First presentation starts 3 seconds after reaching
    const initialTimer = setTimeout(triggerNotification, 3000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasReachedOffer]);

  const scrollToOffer = () => {
    const target = document.getElementById('checkout-pricing-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. SOCIAL PROOF NOTIFICATION SYSTEM (BOTTOM LEFT) */}
      <div 
        id="social-proof-toast"
        className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 max-w-[340px] w-full transition-all duration-300 transform ${
          currentNotification && animateIn
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {currentNotification && (
          <div className="bg-[#12121e]/95 border border-orange-500/30 text-white rounded-2xl p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md flex gap-3 items-center relative overflow-hidden group">
            {/* Ambient orange glow inside toast */}
            <div className="absolute -left-10 -top-10 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none"></div>
            
            {/* Avatar / Icon Badge */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shrink-0 shadow-inner relative">
              <span className="absolute -right-0.5 -bottom-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#12121e] flex items-center justify-center">
                <Check className="w-2 h-2 text-white stroke-[4]" />
              </span>
              <ShoppingBag className="w-4 h-4 text-black" />
            </div>

            {/* Notification Text content */}
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-[11px] sm:text-xs leading-snug text-white/90 font-medium">
                <span className="font-bold text-white text-[12px]">{currentNotification.name}</span> de <span className="font-semibold text-orange-400">{currentNotification.city}</span> acaba de comprar el <span className="text-white bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/20 font-bold whitespace-nowrap text-[10px]">{currentNotification.plan}</span>
              </p>
              <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-white/40">
                <span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded border border-emerald-500/20 font-bold uppercase text-[8px]">Compra Verificada</span>
                <span>•</span>
                <span>Hace unos instantes</span>
              </div>
            </div>

            {/* Close Button */}
            <button 
              id="close-social-proof"
              onClick={() => {
                setAnimateIn(false);
                setTimeout(() => setCurrentNotification(null), 300);
              }}
              className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. FLOATING CTA BUTTON (MOBILE ONLY) */}
      <div 
        id="mobile-floating-cta"
        className={`fixed bottom-4 left-4 right-4 z-40 block sm:hidden transition-all duration-300 transform ${
          showScrollCTA 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToOffer}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-[0_4px_25px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 duration-200 border border-orange-300/20"
        >
          <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '3s' }} />
          <span>👉 CONSEGUIR PLAN VIP — 19€</span>
          <ArrowUp className="w-4 h-4 text-black ml-1 animate-bounce" />
        </button>
      </div>
    </>
  );
}
