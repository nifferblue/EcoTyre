const API_URL = "http://localhost:5000/api/users"; // Update if backend is deployed

// Login Function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Store token in localStorage (or sessionStorage)
    localStorage.setItem("token", data.token);
    return data; // Return user data
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// Register Function
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};
