import { Box } from "@mui/system";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQuery } from "../services/requestHandlers";
import { useAtom } from "jotai";
import { currentUserAtom, jwtTokenAtom } from "../state/atoms";

export const GoogleAuth: React.FC = () => {
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [, setJwtToken] = useAtom(jwtTokenAtom);
  const queries = useQuery();

  const onSuccess = async (codeResponse: CredentialResponse) => {
    if (codeResponse.credential) {
      const userInfo = await queries.ValidateGoogleAuth(
        codeResponse.credential
      );
      setJwtToken(userInfo.token);
      setCurrentUser(userInfo.user);
    }
  };

  return (
    <Box>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => console.log("Error in google singg n")}
      />
    </Box>
  );
};
