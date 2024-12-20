import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateUserform from "@/components/form/CreateUserform";

function page() {
  return (
    <Card className="p-10 bg-transparent mt-5">
      <CardHeader>
        <CardTitle>لطفا مشخصات خود را تکمیل کنید</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateUserform />
      </CardContent>
    </Card>
  );
}

export default page;
