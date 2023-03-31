import "@/styles/globals.css";
import Provider from "streamr-client-react";

export default function App({ Component, pageProps }) {
  let options = {}
  if (typeof window !== "undefined") {
    options = {
      auth: { ethereum: window.ethereum },
    };
  }

  return (
    <Provider {...options}>
      <Component {...pageProps} />
    </Provider>
  );
}
