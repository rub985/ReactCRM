import axios from "axios";
import { useState } from "react";

const Login =({onAuthentication})=>{
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      // Send login request to Laravel API
      const response = await axios.post(process.env.REACT_APP_URL + `/login`, credentials);

      // Extract token from the response
      const token = response.data.data.token;

      // Store the token securely (e.g., in localStorage or a state management library)
      localStorage.setItem('apiToken', token);
      onAuthentication(true);
      // Make subsequent requests with the token
      const authenticatedResponse = await axios.get(process.env.REACT_APP_URL + `/authenticate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the authenticated response as needed
      console.log(authenticatedResponse.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;