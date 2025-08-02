import { FullScreenErrorState } from "@/components";

export function ErrorBoundaryPage() {
  return (
    <FullScreenErrorState
      type="generic"
      title="Oops! Something went wrong"
      message="We're sorry, but something unexpected happened."
      onRetry={() => window.location.reload()}
    />
  );
}
