export function AuthHero({ title, description }) {
  return (
    <section className="auth-hero-bg relative hidden lg:flex lg:w-1/2 border-r border-slate-200/80 text-slate-800 flex-col justify-between p-10 xl:p-14 overflow-hidden select-none">
      {/* Latar: blob warna lembut + pola titik */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/45 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-6 right-6 w-96 h-96 bg-indigo-300/35 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-[0.045]" />
      </div>

      {/* Header brand */}
      <header className="relative z-10 flex items-center gap-3.5">
        <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-500/25">
          A
        </div>
        <div>
          <div className="font-bold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-2">
            APS Group 2
            <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
              DATA APLIKASI
            </span>
          </div>
          <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
            Penyimpanan Data Aplikasi
          </p>
        </div>
      </header>

      {/* Ilustrasi + judul */}
      <div className="relative z-10 my-auto py-6 max-w-xl mx-auto w-full">
        <svg
          aria-hidden="true"
          className="w-full max-w-[420px] mx-auto h-auto drop-shadow-sm"
          fill="none"
          viewBox="0 0 520 380"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="auth-visor-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="auth-visor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>

          {/* Lantai */}
          <ellipse cx="260" cy="350" rx="220" ry="22" fill="#E2E8F0" opacity="0.6" />
          <ellipse cx="260" cy="350" rx="170" ry="14" fill="#CBD5E1" opacity="0.4" />

          {/* Meja */}
          <rect x="90" y="270" width="340" height="12" rx="6" fill="#4F46E5" opacity="0.9" />
          <rect x="100" y="282" width="320" height="4" fill="#3730A3" />
          <rect x="120" y="286" width="10" height="64" rx="3" fill="#64748B" />
          <rect x="390" y="286" width="10" height="64" rx="3" fill="#64748B" />
          <rect x="125" y="325" width="270" height="6" rx="2" fill="#94A3B8" />

          {/* Tanaman */}
          <g className="auth-plant">
            <path d="M112 270 L115 250 L129 250 L132 270 Z" fill="#CBD5E1" />
            <path d="M122 250 Q112 235 110 220 Q122 230 123 246" fill="#10B981" />
            <path d="M122 250 Q126 230 136 224 Q132 238 123 248" fill="#059669" />
            <path d="M122 245 Q122 220 120 212 Q126 226 123 245" fill="#34D399" />
          </g>

          {/* Monitor utama */}
          <g className="auth-screen">
            <rect x="140" y="125" width="170" height="110" rx="8" fill="#1E293B" />
            <rect x="146" y="131" width="158" height="98" rx="5" fill="#0F172A" />
          </g>
          <rect x="220" y="235" width="10" height="35" rx="2" fill="#64748B" />
          <rect x="205" y="268" width="40" height="4" rx="2" fill="#475569" />
          <rect x="154" y="140" width="36" height="6" rx="3" fill="#6366F1" />
          <rect x="154" y="152" width="60" height="4" rx="2" fill="#475569" />
          <rect x="154" y="160" width="45" height="4" rx="2" fill="#334155" />
          <circle className="auth-led-fast" cx="288" cy="142" r="2.5" fill="#10B981" />
          <circle className="auth-led-slow" cx="296" cy="142" r="2.5" fill="#38BDF8" />
          <path
            className="auth-chart-line"
            d="M154 195 L170 180 L185 188 L202 172 L218 184 L235 168 L250 178 L265 160 L280 170 L292 155"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="154" y="208" width="42" height="12" rx="3" fill="#4338CA" />
          <rect x="202" y="208" width="42" height="12" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <rect x="250" y="208" width="42" height="12" rx="3" fill="#10B981" opacity="0.8" />

          {/* Monitor kedua */}
          <g className="auth-screen">
            <rect x="320" y="105" width="85" height="135" rx="8" fill="#1E293B" />
            <rect x="325" y="110" width="75" height="125" rx="5" fill="#0F172A" />
          </g>
          <rect x="358" y="240" width="8" height="30" rx="2" fill="#64748B" />
          <rect x="345" y="268" width="34" height="4" rx="2" fill="#475569" />
          <rect x="333" y="120" width="32" height="4" rx="2" fill="#F43F5E" />
          <rect x="333" y="130" width="55" height="3" rx="1.5" fill="#38BDF8" />
          <rect x="340" y="137" width="40" height="3" rx="1.5" fill="#A855F7" />
          <rect x="340" y="144" width="48" height="3" rx="1.5" fill="#64748B" />
          <rect x="333" y="154" width="28" height="3" rx="1.5" fill="#10B981" />
          <rect x="340" y="161" width="45" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="340" y="168" width="36" height="3" rx="1.5" fill="#64748B" />
          <rect x="333" y="178" width="50" height="3" rx="1.5" fill="#F59E0B" />
          <rect x="340" y="185" width="42" height="3" rx="1.5" fill="#38BDF8" />
          <rect x="333" y="195" width="38" height="3" rx="1.5" fill="#A855F7" />
          <rect x="333" y="205" width="56" height="3" rx="1.5" fill="#64748B" />
          <rect x="333" y="215" width="44" height="3" rx="1.5" fill="#10B981" />

          {/* Keyboard, mouse, cangkir */}
          <rect x="180" y="272" width="70" height="4" rx="2" fill="#CBD5E1" />
          <rect x="260" y="272" width="12" height="4" rx="2" fill="#94A3B8" />
          <rect x="145" y="260" width="14" height="11" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M159 263 C163 263 163 268 159 268" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Kursi */}
          <ellipse cx="270" cy="335" rx="28" ry="6" fill="#1E293B" />
          <rect x="267" y="295" width="6" height="40" fill="#475569" />
          <rect x="250" y="280" width="40" height="15" rx="5" fill="#334155" />
          <rect x="245" y="215" width="16" height="70" rx="8" fill="#1E293B" />

          {/* Karakter */}
          <g className="auth-robot-body">
            <path d="M255 240 Q270 236 285 240 L292 280 L248 280 Z" fill="#4F46E5" />
            <path d="M266 240 L270 248 L274 240 Z" fill="#EEF2FF" />

            <g className="auth-arm-left">
              <path d="M255 248 Q235 258 220 272" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" />
              <circle cx="218" cy="272" r="5" fill="#FBCFE8" />
            </g>
            <g className="auth-arm-right">
              <path d="M280 248 Q275 260 258 272" stroke="#4338CA" strokeWidth="10" strokeLinecap="round" />
              <circle cx="256" cy="272" r="5" fill="#FBCFE8" />
            </g>

            <g className="auth-robot-head">
              <rect x="267" y="230" width="6" height="12" fill="#FBCFE8" />
              <circle cx="270" cy="216" r="14" fill="#FBCFE8" />
              <path d="M256 216 C256 202 278 200 284 208 C284 216 280 222 280 222 L260 222 Z" fill="#1E293B" />
              <rect x="261" y="210" width="20" height="7" rx="2" fill="#1E293B" />
              <g className="auth-visor" filter="url(#auth-visor-glow)">
                <rect x="263" y="212" width="16" height="3" rx="1.5" fill="url(#auth-visor-grad)" />
              </g>
              <line x1="270" y1="213" x2="272" y2="213" stroke="#4F46E5" strokeWidth="1.5" />
            </g>
          </g>
        </svg>

        <div className="mt-8 text-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {title}
          </h1>
          <p className="mt-3 text-slate-600 text-sm xl:text-base leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>

    </section>
  );
}