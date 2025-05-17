import React, { useEffect, useState } from "react";
import heart from "../../Assets/heart.svg";
import eye from "../../Assets/eye.svg";
import profile from "../../Assets/Profile.png";

const ItemSales = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/backend/items.php"
        );

        const data = await response.json();

        if (response.ok) {
          setItems(data);
        } else {
          console.error("Failed to fetch items:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="item-sales">
      {items.map((item) => (
        <div className="item-card" key={item.itemid}>
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
                src={item.itemprofile} // Directly use full URL from backend
                alt="product"
              />
            </div>
          </div>
          <div className="item-detail">
            <img src={profile} alt="customer-profile" width={50} height={50} />
            <div className="customer-profile">
              <div className="profile">
                <h5>{item.itemname}</h5>
                <p>AASTU Electronics</p>
                <div className="rating">{item.itemrate}</div>
              </div>
              <p>{item.itemprice} ETB</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ItemSales;
