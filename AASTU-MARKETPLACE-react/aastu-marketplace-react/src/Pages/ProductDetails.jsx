import React from "react";
import { useCart } from "../Components/CartContext";
import "../CSS/Productdetails.css";
import img57 from "../Assets/image 57.png";
import img58 from "../Assets/image 58.png";
import img59 from "../Assets/image 59.png";
import img61 from "../Assets/image 61.png";
import img63 from "../Assets/image 63.png";
import img611 from "../Assets/Frame 611.png";
import img612 from "../Assets/Frame 612.png";
import img610 from "../Assets/Frame 610.png";
import img613 from "../Assets/Frame 613.png";
import "remixicon/fonts/remixicon.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ProductDetails = () => {
    
   
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProduct = async () => {
          try {
              const response = await fetch("http://localhost/backend/getProduct.php?id=4");
              const data = await response.json();
              setProduct(data);
          } catch (error) {
              console.error('Error fetching product:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      // Get the quantity from the input field
      const quantityInput = document.querySelector('.spin');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      
      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image_url,
        subtotal: product.price * quantity
      };
  
      try {
        // Send to PHP backend
        const response = await fetch('http://localhost/backend/addToCart.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem)
        });
  
        const result = await response.json();
        
        if (result.success) {
          // Also add to local cart context
          addToCart(cartItem);
          alert(`${product.name} has been added to your cart!`);
        } else {
          alert('Failed to add to cart: ' + result.message);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart. Please try again.');
      }
    }
  };

  if (loading) return <div>
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  
    

  
  </div>;
  if (!product) return <div className="Ntf">Product not found.</div>;



  return (
    <div>
      <div className="main">
        <div className="image1">
          <img src={img57} alt="" />
        </div>
        <div className="image2">
          <img src={img58} alt="" />
        </div>
        <div className="image3">
          <img src={img59} alt="" />
        </div>
        <div className="image4">
          <img src={img61} alt="" />
        </div>
        <div className="image5">
          <img src={img63} alt="" />
        </div>

        <div className="discription">
          <h3>{product.name}</h3>
          <span className="head"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star">(150 reviews)</span>
          <h4>{product.price}</h4>
          <p>
            {product.description}
          </p>

          <div className="choice">
            <label htmlFor="">Colour: </label>
            <input id="blue" type="radio" name="choose" />
            <label htmlFor="red">red</label>
            <input id="red" type="radio" name="choose" />
            <label htmlFor="blue">blue</label>
          </div>
          <div className="size">
            <label htmlFor="">Size:</label>
            <input className="space" type="button" value="XS" />
            <input className="space" type="button" value="S" />
            <input className="space" type="button" value="M" />
            <input className="space" type="button" value="L" />
            <input className="space" type="button" value="XL" />
          </div>
          <input className="spin" type="number" min="1" max="20" required />
          <button 
            className="addcart"
            id="addcart"
            type="submit"
            
            onClick={handleAddToCart}
          >Add to Cart</button>

          <div className="delivery" id="delivery">
            <p>Free Delivery</p>
            <a href="#" id="check-delivery-link">
              Enter your postal code for delivery avalaibility
            </a>
            <div id="postal-code-container" style={{ display: "none" }}>
              <input
                type="text"
                id="postal-code"
                placeholder="Enter your postal code"
              />
              <button id="check-delivery-btn">Check Delivery</button>
            </div>
            <p id="delivery-message" style={{ color: "green" }}></p>
          </div>
        </div>

        <div className="items">
          <h4 className="related">Related items</h4>

          <div className="item" id="item">
            <img src={img611} alt="" />
            <div className="add-to-cart">Add to Cart</div>

            <i className="ri-heart-3-line love"></i>

            <i className="ri-eye-line eye"></i>

            <div className="content">
              <p>HAVIT HV-G92 Gamepad</p>
              <h5>
                $120 <del>$160 ETB</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img612} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>AK-900 Wired Keyboard</p>
              <h5>
                $960 <del>$1160</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img610} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>IPS LCD Gaming Monitor</p>
              <h5>
                $370 <del>$400</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
          <div className="item" id="">
            <img src={img613} alt="" />
            <div className="add-to-cart">Add to Cart</div>
            <i className="ri-heart-line love"></i>
            <i className="ri-eye-line eye"></i>
            <div className="content">
              <p>RGB liquid CPU Cooler</p>
              <h5>
                $160 ETB <del>$170</del>
              </h5>
              <span className="head"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;