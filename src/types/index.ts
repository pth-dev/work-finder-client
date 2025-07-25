export * from "./navigation";
export * from "./layout";

// Common types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface WithOptionalChildren {
  children?: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}
