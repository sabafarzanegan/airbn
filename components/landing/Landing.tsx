import Navbar from "../navbar/Navbar";
import landing from "../../public/images/landing.jpg";

function Landing() {
  return (
    <div className="min-h-screen w-full absolute overflow-x-hidden">
      <div
        className="relative top-0 left-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landing.jpg')" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default Landing;
