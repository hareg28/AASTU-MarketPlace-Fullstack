import React, { useState } from "react";

const PostModal = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemPrice", itemPrice);
    formData.append("itemRate", 0); // default
    formData.append("image", itemImage);

    fetch(
      "http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/aastu-marketplace-react/php/upload.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.text())
      .then((res) => {
        alert("Uploaded Successfully!");
        console.log(res);
      })
      .catch((err) => console.error("Upload error:", err));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Item Price"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setItemImage(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default PostModal;
