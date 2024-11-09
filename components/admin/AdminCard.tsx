import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function AdminCard({ lable, count }: { lable: string; count: number }) {
  return (
    <Card className="bg-muted w-64">
      <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="capitalize text-3xl font-bold">{lable}</h3>
        <span className="text-primary text-5xl font-extrabold">{count}</span>
      </CardHeader>
    </Card>
  );
}

export default AdminCard;
