import React from "react";

// ==============================|| LOADER ||============================== //

const Loader: React.FC = () => (
  <div className="fixed top-0 left-0 z-[1301] w-full bg-transparent">
    <div className="h-1 w-full bg-muted overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-primary to-green-500 animate-pulse" />
    </div>
  </div>
);

export default Loader;
