
import { useState, useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Backend not reachable." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
     <div className="w-full max-w-3xl h-[600px] flex flex-col bg-[#0f1623] rounded-2xl border border-white/10 shadow-lg">


      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 premium-scroll">

        <div className="max-w-xl mx-auto space-y-5">

          {messages.length === 0 && !loading && (
            <div className="text-center mt-12 space-y-3">
              <h2 className="text-2xl leading-[1.34] pb-1 font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome to Agentic RAG AI
              </h2>
              <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                Ask questions about your indexed knowledge and reasoning.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 text-sm leading-relaxed
                max-w-[75%] rounded-2xl
                transition-all duration-200
                ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    : "mr-auto bg-white/5 border border-white/10 text-neutral-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-400 animate-pulse">
                Agentic RAG AI is thinking…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT (YOUR EXACT PREMIUM STYLE) */}
      <div className="px-10 py-8 border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center gap-4 bg-white/[0.06] px-6 py-4 rounded-2xl border border-white/10 focus-within:border-purple-400/50 transition-all">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something meaningful…"
              className="flex-1 bg-transparent outline-none text-base placeholder-white/40"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(139,92,246,0.6)]"
            >
              <SendHorizonal size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
