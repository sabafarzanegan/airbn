import { auth } from "@clerk/nextjs/server";
import Cardsigninbtn from "./Cardsigninbtn";
import {
  fetchFavoriteId,
  toggleFavoriteAction,
} from "@/lib/actions/formAction";

import StatusFavoritebtn from "./StatusFavoritebtn";

async function FavoriteTogglebtn({ propertyId }: { propertyId: string }) {
  const user = await auth();
  if (!user.userId) {
    return <Cardsigninbtn />;
  }
  const favoriteId = await fetchFavoriteId({ propertyId });

  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
  });
  return (
    <form action={toggleAction}>
      <StatusFavoritebtn favoriteId={favoriteId} />
    </form>
  );
}

export default FavoriteTogglebtn;
