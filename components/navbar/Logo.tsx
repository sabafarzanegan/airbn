import Image from "next/image";
import logo from "../../public/images/tent.png";
import Link from "next/link";
function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <Image alt="tent" src={logo} width={40} height={40} />
        <span className="font-lale tracking-wide text-lg font-medium ">
          جاباما
        </span>
      </Link>
    </div>
  );
}

export default Logo;
