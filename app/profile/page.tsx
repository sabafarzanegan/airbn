import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileForm from "@/components/form/ProfileForm";
import { getAuthuser } from "@/lib/actions/formAction";
import db from "../../lib/db";
import ImageInput from "@/components/form/ImageInput";
async function page() {
  const user = await getAuthuser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  return (
    <Card className="p-10 bg-transparent mt-5">
      <CardHeader>
        <CardTitle>اطلاعات حساب کاربری</CardTitle>
      </CardHeader>
      <ImageInput profilePicture={profile?.profileImage} />
      <ProfileForm
        firstName={profile?.firstName}
        lastName={profile?.lastName}
        username={profile?.username}
      />
    </Card>
  );
}

export default page;
