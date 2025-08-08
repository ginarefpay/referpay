
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/partnership");
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Home;
