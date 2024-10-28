import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "درحال ارسال" : "ارسال"}
    </Button>
  );
}

export default ButtonSubmit;
