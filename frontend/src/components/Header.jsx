
export default function Header() {
  return (
    <div className="px-10 pt-8 pb-4">

      <div className="max-w-3xl mx-auto flex justify-between items-center">

        {/* Subtle ambient glow layer */}
        <div className="relative">
          <div className="absolute inset-0 blur-lg opacity-30 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg pointer-events-none" />
          
          <div className="relative inline-block">
            <h1 className="
              text-2xl font-semibold tracking-wider
              bg-gradient-to-r from-purple-400 to-indigo-400
              bg-clip-text text-transparent
              drop-shadow-[0_0_6px_rgba(139,92,246,0.35)]
            "
            >
            AGENTIC RAG AI
            </h1>
          </div>
        </div>

        <span className="text-sm text-neutral-400 tracking-wide">
          Endee Vector Memory · Gemini Reasoning
        </span>

      </div>

      {/* Subtle Divider */}
      <div className="max-w-3xl mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    </div>
  );
}

