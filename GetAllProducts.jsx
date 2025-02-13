import { useEffect, useState } from "react";

const ProductsFetcher = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://api.freeapi.app/api/v1/ecommerce/products?page=1&limit=10";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const fetchProducts = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result); // Debugging: Check API response

        if (result.data && Array.isArray(result.data.products)) {
          setProducts(result.data.products); // Extract from result.data.products
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products available.</p>;

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name || "Unknown Product"}</strong> - ${product.price || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsFetcher;
