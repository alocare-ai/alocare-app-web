export type OAuthMode = "login" | "link";

export function encodeOAuthState(mode: OAuthMode, returnPath: string): string {
  return `${mode}|${returnPath}`;
}

export function parseOAuthState(state: string | null): {
  mode: OAuthMode;
  returnPath: string;
} {
  if (!state) {
    return { mode: "login", returnPath: "/dashboard" };
  }
  const sep = state.indexOf("|");
  if (sep === -1) {
    return { mode: "login", returnPath: state || "/dashboard" };
  }
  const mode: OAuthMode = state.slice(0, sep) === "link" ? "link" : "login";
  const returnPath = state.slice(sep + 1);
  return {
    mode,
    returnPath: returnPath || (mode === "link" ? "/settings" : "/dashboard"),
  };
}
