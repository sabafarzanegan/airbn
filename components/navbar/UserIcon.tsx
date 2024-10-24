import { fetchImageUser } from "@/lib/actions/formAction";
import { CircleUserRound } from "lucide-react";

async function UserIcon() {
  const profileImage = await fetchImageUser();
  if (profileImage) {
    return (
      <img
        className="w-10 h-10 mr-4 rounded-full"
        src={profileImage}
        alt="user image"
      />
    );
  }
  return (
    <div className=" mr-4 flex items-center justify-between">
      <CircleUserRound className=" text-primary w-10 h-10" />
    </div>
  );
}

export default UserIcon;
