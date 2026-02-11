import Header from "./components/Header";
import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-[#0b0f1a] text-neutral-100 overflow-hidden">

      {/* HEADER */}
      <Header />

      {/* CHAT WRAPPER */}
      <main className="flex-1 flex justify-center items-center px-6 overflow-hidden">
        <Chat />
      </main>

    </div>
  );
}
