import  { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import './App.css'

interface TokenResponse {
  access_token: string;
  authuser?: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
  prompt?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
}

function App() {
const [user, setUser] = useState<TokenResponse | null>(null);
const [profile, setProfile] = useState<UserProfile | null>(null);

  console.log(user);
  console.log(profile);
  

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div className="profile">
          <img className="profile-image" src={profile?.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile?.name}</p>
          <p>Email Address: {profile?.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App;
