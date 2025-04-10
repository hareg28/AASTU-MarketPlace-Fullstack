import React from "react";
import item from "../../Assets/product-1.png";
import star from "../../Assets/Vector.png";
import heart from "../../Assets/heart.svg";
import eye from "../../Assets/eye.svg";
import profile from "../../Assets/Profile.png";

const ItemSales = () => {
  return (
    <section className="item-sales">
      {/* Product Cards */}
      {[...Array(5)].map((_, index) => (
        <div className="product-card" key={index}>
          <div className="product-image">
            <div className="icons">
              <span className="icon-heart">
                <img src={heart} alt="Heart Icon" />
              </span>
              <span className="icon-eye">
                <img src={eye} alt="Eye Icon" />
              </span>
            </div>
          </div>
          <img
            className="product-img"
            src={item}
            alt={`Product ${index + 1}`}
          />
          <div className="product-detail">
            <img src={profile} alt="customer-profile" width={50} height={50} />
            <div className="customer-profile">
              <div className="profile">
                <h5>Product Name</h5>
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
