import React, { useEffect, useState } from "react";
import heart from "../../Assets/heart.svg";
import eye from "../../Assets/eye.svg";
import profile from "../../Assets/Profile.png";

const ItemSales = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/aastu-marketplace-react/php/fetch.php"
    )
      .then((response) => response.json())
      .then((data) => {
        // Clean up image URLs
        const cleanedData = data.map((item) => ({
          ...item,
          itemProfile: item.itemProfile.split("\u0000")[0], // remove null characters
        }));
        console.log("Fetched items:", cleanedData);
        setItems(cleanedData);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <section className="item-sales">
      {items.map((item) => (
        <div className="item-card" key={item.itemId}>
          <div className="item-upper">
            <div className="item-image">
              <div className="icons">
                <span className="icon-heart">
                  <img src={heart} alt="Heart Icon" />
                </span>
                <span className="icon-eye">
                  <img src={eye} alt="Eye Icon" />
                </span>
              </div>
              <img
                className="item-img"
                src={item.itemProfile}
                alt="product image"
              />
            </div>
          </div>
          <div className="item-detail">
            <img src={profile} alt="customer-profile" width={50} height={50} />
            <div className="customer-profile">
              <div className="profile">
                <h5>{item.itemName}</h5>
                <p>AASTU Electronics</p>
                <div className="rating">{item.itemRate}</div>
              </div>
              <p>{item.itemPrice} ETB</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ItemSales;
