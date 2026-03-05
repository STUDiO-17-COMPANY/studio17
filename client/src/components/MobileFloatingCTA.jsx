export default function MobileFloatingCTA({ href = '#contact', label = 'Book a Call' }) {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden pointer-events-none">
      <a
        href={href}
        className="pointer-events-auto block w-full bg-primary text-white text-center py-4 rounded-full font-bold text-lg shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
      >
        {label}
      </a>
    </div>
  );
}
