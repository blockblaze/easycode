import Header from "./components/Header";
import Home from "./components/Home";
import FooterCom from "./components/Footer";
import { useEffect } from 'react';




function App() {
  const whatsappKey = import.meta.env.VITE_WHATSAPP_KEY
  useEffect(() => {
    fetch(`https://whatsappapi-gamma.vercel.app/?key=${whatsappKey}`) // Replace with your actual backend URL
      .then(res => res.json())
      .then(data => console.log('Visit reported:', data))
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
