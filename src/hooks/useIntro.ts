import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function useIntro() {
  const [currentStep, setCurrentStep] = useState(0);
  const nav=useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const step = Math.floor(scrollY / (windowHeight * 0.8));
      setCurrentStep(Math.min(step, 4));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return {
    currentStep, nav
  }
}