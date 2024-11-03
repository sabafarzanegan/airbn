import Image from "next/image";

type props = {
  profile: {
    profileImage: string;
    name: string;
    lastName: string;
  };
};
function Userinfo({ profile }: props) {
  return (
    <div className="flex  items-center  gap-x-2">
      <div>
        <div className="">به میزیانی</div>
        <span className="font-semibold text-lg">{profile.lastName}</span>
      </div>
      <div>
        <Image
          src={profile.profileImage}
          alt=""
          width={50}
          height={50}
          className="w-10 h-10 object-cover overflow-hidden rounded-full"
        />
      </div>
    </div>
  );
}

export default Userinfo;
