import PropertyForm from "@/components/form/PropertyForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCenter } from "@/lib/actions/formAction";
import React from "react";

async function page() {
  const city = await getCenter();

  return (
    <section>
      <Card className="min-h-screen">
        <CardHeader>
          <CardTitle>مشخصات مکان مورد نظر را در این قسمت بنویسید</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm city={city} />
        </CardContent>
      </Card>
    </section>
  );
}

export default page;
