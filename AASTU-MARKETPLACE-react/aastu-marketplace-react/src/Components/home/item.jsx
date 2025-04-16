import React from "react";
import item from "../../Assets/Product-1.png";
import star from "../../Assets/Vector.png";
import heart from "../../Assets/heart.svg";
import eye from "../../Assets/eye.svg";
import profile from "../../Assets/Profile.png";

const ItemSales = ({ count = 10 }) => {
  return (
    <section className="item-sales">
      {[...Array(count)].map((_, index) => (
        <div className="item-card" key={index}>
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
            </div>
            <img className="item-img" src={item} alt={`Item ${index + 1}`} />
          </div>
          <div className="item-detail">
            <img src={profile} alt="customer-profile" width={50} height={50} />
            <div className="customer-profile">
              <div className="profile">
                <h5>Item Name</h5>
                <p>AASTU Electronics</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <img src={star} alt="Star" key={i} />
                  ))}
                </div>
              </div>
              <p>$25.98</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ItemSales;
