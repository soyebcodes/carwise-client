import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white">
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate("/")} className="cursor-pointer">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
