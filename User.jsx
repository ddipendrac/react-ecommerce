import { useEffect, useState } from "react";

const UserFetcher = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const url = "https://api.freeapi.app/api/v1/public/randomusers/user/random";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const fetchUser = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.success && result.data) {
          setUser(result.data); // Store only user data
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    fetchUser();
  }, []);

  console.log(user);
  

  // Show loading state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user || !user.name) return <p>No user data available</p>;

  return (
    <div>
      <h2>User Info</h2>
      <p><strong>Name:</strong> {user.name.title} {user.name.first} {user.name.last}</p>
    </div>
  ); 
};

export default UserFetcher;
