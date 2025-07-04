// pages/_app.js
import "@/styles/globals.css";

// INTERNAL IMPORT
import { TrackingProvider } from "../Context/TrackingContext";
import { NavBar, Footer } from "../Components";

function App({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </>
    </TrackingProvider>
  );
}

export default App;
