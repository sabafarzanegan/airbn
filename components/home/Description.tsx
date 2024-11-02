"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Description({ description }: { description: string }) {
  const [isShow, setIsshow] = useState(false);
  const handlerShow = () => {
    setIsshow(!isShow);
  };
  const word = description.split(" ");
  console.log(word);
  const longWord = word.length > 20;

  const displayedDesc =
    longWord && isShow == false
      ? word.splice(0, 25).join(" ") + "..."
      : description;

  return (
    <div>
      <h3 className="text-lg font-bold">توضیحات</h3>
      <p>{displayedDesc}</p>
      {isShow ? (
        <Button className="px-0" onClick={handlerShow} variant="link">
          مشاهده کمتر
        </Button>
      ) : (
        <Button className="px-0" onClick={handlerShow} variant="link">
          مشاهده بیشتر
        </Button>
      )}
    </div>
  );
}

export default Description;
