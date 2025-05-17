import React, { useState } from "react";

const PostModal = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemImage) return alert("Choose an image");

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemDescription", itemDescription);
    formData.append("itemPrice", itemPrice);
    formData.append("image", itemImage);

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/backend/items.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Item uploaded successfully ✅");
        setItemName("");
        setItemDescription("");
        setItemPrice("");
        setItemImage(null);
      } else {
        alert(`Upload failed: ${result.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-modal-form">
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Item Description"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
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

      <button type="submit" disabled={loading}>
        {loading ? "Posting…" : "Post Item"}
      </button>
    </form>
  );
};

export default PostModal;
