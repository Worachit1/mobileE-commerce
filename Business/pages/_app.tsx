// pages/_app.tsx

import { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <div style={buttonContainer}>
          <Link href="/login">
            <button style={buttonStyle}>Login</button>
          </Link>
          <Link href="/register">
            <button style={buttonStyle}>Register</button>
          </Link>
        </div>
      </nav>
      {/* Render the current page */}
      <Component {...pageProps} />
    </div>
  );
}

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#008E97",
  color: "white",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
};

const buttonContainer = {
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  padding: "8px 15px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  backgroundColor: "white",
  color: "#008E97",
};
