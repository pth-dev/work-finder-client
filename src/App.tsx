import React from "react";
import ErrorBoundary from "./components/ui/error-boundary";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
};

export default App;
