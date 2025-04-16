import "../CSS/Wishlist.css";

import ItemSales from "../Components/home/item";
import WishlistHeader from "../Components/wishlist/wishlistheader";
import ThisMonthHeader from "../Components/wishlist/header2";
const Wishlist = () => {
  return (
    <div className="">
      <WishlistHeader />
      <ItemSales count={5} />
      <ThisMonthHeader />
      <ItemSales count={5} />
    </div>
  );
};

export default Wishlist;
