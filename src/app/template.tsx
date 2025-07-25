export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {children}
    </div>
  );
}
