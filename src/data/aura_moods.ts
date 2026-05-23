export interface AuraMood {
  id: string;
  gradient: string;
  blur: string;
  scale: string;
}

// These gradients now serve as the full-page atmospheric background
// They are deliberately soft, pale, and pastel to match the premium editorial feel.
export const auraMoods: Record<string, AuraMood> = {
  recovery: {
    id: "recovery",
    gradient: "from-blue-50 via-sky-100 to-indigo-50",
    blur: "blur-2xl",
    scale: "scale-105"
  },
  burnout: {
    id: "burnout",
    gradient: "from-rose-100 via-stone-100 to-emerald-50", 
    blur: "blur-xl",
    scale: "scale-100"
  },
  preventive: {
    id: "preventive",
    gradient: "from-stone-50 via-orange-50 to-stone-200", 
    blur: "blur-3xl",
    scale: "scale-95"
  },
  glow: {
    id: "glow",
    gradient: "from-fuchsia-100 via-pink-50 to-purple-100", 
    blur: "blur-2xl",
    scale: "scale-110"
  },
  stress: {
    id: "stress",
    gradient: "from-slate-100 via-slate-200 to-stone-100",
    blur: "blur-xl",
    scale: "scale-100"
  },
  hidden_aging: {
    id: "hidden_aging",
    gradient: "from-amber-50 via-orange-100 to-stone-100", 
    blur: "blur-md",
    scale: "scale-90"
  },
  overworked: {
    id: "overworked",
    gradient: "from-zinc-100 via-stone-200 to-zinc-50", 
    blur: "blur-3xl",
    scale: "scale-100"
  },
  late_night: {
    id: "late_night",
    gradient: "from-indigo-50 via-purple-100 to-slate-100", 
    blur: "blur-2xl",
    scale: "scale-105"
  },
  default: {
    id: "default",
    gradient: "from-stone-50 to-stone-100",
    blur: "blur-3xl",
    scale: "scale-100"
  }
};
