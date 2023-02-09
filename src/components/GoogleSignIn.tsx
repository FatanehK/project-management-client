import { Box } from "@mui/system";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { ValidateGoogleAuth } from "../services/requestHandlers";
import { useAtom } from "jotai";
import { currentUserAtom, jwtTokenAtom } from "../state/atoms";

export const GoogleAuth = () => {
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [, setJwtToken] = useAtom(jwtTokenAtom);
  const [user, setUser] = useState<CredentialResponse>();

  useEffect(() => {
    const getUserInfo = async () => {
      if (user && user.credential) {
        const userInfo = await ValidateGoogleAuth(user.credential);
        setJwtToken(userInfo.token);
        setCurrentUser(userInfo.user);
      }
    };
    getUserInfo();
  }, [user, setCurrentUser, setJwtToken]);

  const onSuccess = (codeResponse: CredentialResponse) => setUser(codeResponse);

  return (
    <Box>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => console.log("Error in google singg n")}
      />
    </Box>
  );
};
