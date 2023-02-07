import { Box } from "@mui/system";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { ValidateGoogleAuth } from "../services/requestHandlers";

export const GoogleAuth = () => {
  const [user, setUser] = useState<CredentialResponse>();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const getUserInfo = async () => {
      if (user && user.credential) {
        console.log(user);
        const userInfo = await ValidateGoogleAuth(user.credential);
        setProfile(userInfo);
      }
    };
    getUserInfo();
  }, [user]);

  const onSuccess = (codeResponse: CredentialResponse) => setUser(codeResponse);

  return (
    <Box>
      {profile ? (
        <div>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
        </div>
      ) : (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => console.log("Error in google singg n")}
        />
      )}
    </Box>
  );
};
