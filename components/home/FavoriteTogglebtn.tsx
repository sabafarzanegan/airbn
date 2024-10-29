import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import Cardsigninbtn from "./Cardsigninbtn";
import {
  fetchFavoriteId,
  handlerFavoriteAction,
} from "@/lib/actions/formAction";
import { useFormStatus } from "react-dom";
import StatusFavoritebtn from "./StatusFavoritebtn";

async function FavoriteTogglebtn({ propertyId }: { propertyId: string }) {
  const user = await auth();
  if (!user.userId) {
    return <Cardsigninbtn />;
  }
  const favoriteId = await fetchFavoriteId({ propertyId });
  console.log(favoriteId);

  return (
    <form action={handlerFavoriteAction}>
      <input
        value={propertyId}
        name="propertyId"
        id="propertyId"
        type="hidden"
      />

      <StatusFavoritebtn favoriteId={favoriteId} />
    </form>
  );
}

export default FavoriteTogglebtn;
