import Header from "./components/Header";
import Home from "./components/Home";
import FooterCom from "./components/Footer";
import { useEffect } from 'react';




function App() {
  useEffect(() => {
    fetch(`https://whatsappapi-gamma.vercel.app`) // Replace with your actual backend URL
      .then(res => res.json())
      .catch(err => console.error('Visit report failed:', err));
  }, []);

  return (
    <>
    <Header/>
    <Home/>
    <FooterCom/>
    </>
  )
}

export default App
