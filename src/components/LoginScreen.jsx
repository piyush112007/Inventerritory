export default function LoginScreen({ darkMode, loginWithGoogle }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 overflow-hidden relative ${
        darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute w-72 h-72 bg-orange-600/20 blur-3xl rounded-full top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-orange-500/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* LOGIN CARD */}
      <div
        className={`relative z-10 w-full max-w-md rounded-3xl border shadow-2xl backdrop-blur-xl px-8 py-10 ${
          darkMode
            ? "bg-slate-900/80 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* LOGO */}

        {/* TITLE */}
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Inventerritory Logo"
            className="w-full h-45 mb-4 object-contain"
          />

          <h1 className="text-5xl font-black text-orange-600">
            Inventerritory
          </h1>
        </div>

        {/* SUBTITLE */}
        <p className="text-center text-gray-400 mt-4 leading-relaxed text-sm">
          Smart inventory management platform for modern businesses.
        </p>

        {/* FEATURES */}
        <div className="mt-8 space-y-3">
          {[
            "Real-time inventory tracking",
            "Secure cloud-based storage",
            "Multi-user SaaS architecture",
          ].map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl px-4 py-4 border transition ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="font-medium text-sm">{feature}</p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={loginWithGoogle}
          className="w-full mt-8 bg-red-800 hover:bg-orange-700 text-white py-4 rounded-2xl text-base font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Powered by Firebase & React
        </p>
      </div>
    </div>
  );
}
