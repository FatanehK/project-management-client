import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { blue } from "@mui/material/colors";
import { useQuery } from "../services/requestHandlers";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../types";

interface IMembersListProps {
  projectId: number;
  onMemberSelected?: (member: IUser) => void;
  onClose?: () => void;
  onError?: (errorMessage: string) => void;
}

export const MembersListDialog: React.FC<IMembersListProps> = (props) => {
  const { projectId, onMemberSelected, onClose, onError } = props;
  const { GetProjectMember, AddMemberToProject, RemoveProjectMember } =
    useQuery();
  const [members, setMembers] = useState<IUser[]>([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const getMembers = useCallback(async () => {
    const prjMembers = await GetProjectMember(`${projectId}`);
    setMembers(prjMembers);
  }, [GetProjectMember, projectId]);

  useEffect(() => {
    getMembers();
  }, [getMembers, projectId]);

  const addMember = async () => {
    try {
      await AddMemberToProject(`${projectId}`, fullName, email);
      getMembers();
      setEmail("");
      setFullName("");
    } catch {
      onError?.("Member cannot be added to this project.");
    }
  };

  const removeMember = async (removedMember: IUser) => {
    try {
      await RemoveProjectMember(`${projectId}`, removedMember.id);
      getMembers();
    } catch {
      onError?.("Error when trying to remove this member.");
    }
  };

  const onEmailChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.currentTarget.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(newValue);
  };

  return (
    <Dialog onClose={onClose} open={true} maxWidth="lg">
      <DialogTitle>Members</DialogTitle>
      <DialogContent dividers={true} sx={{ width: 400 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FormControl sx={{ m: 2, width: "100%" }}>
            <Typography variant="caption">Add New Member</Typography>
            <TextField
              variant="standard"
              id="member-name"
              aria-describedby="member-name"
              placeholder="Fullname"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
            />
            <TextField
              variant="standard"
              error={!emailIsValid}
              helperText={!emailIsValid && "Email is not valid."}
              id="member-email"
              aria-describedby="member-email"
              placeholder="Email address"
              value={email}
              onChange={onEmailChanged}
            />
          </FormControl>
          <IconButton
            color="primary"
            aria-label="add-member"
            sx={{ p: 2, alignSelf: "flex-end" }}
            onClick={addMember}
            disabled={!emailIsValid}
          >
            <PersonAddAltRoundedIcon />
          </IconButton>
        </Paper>
        <Box sx={{ maxHeight: "50vh", overflow: "auto" }}>
          <List>
            {members.map((member) => (
              <ListItem disableGutters>
                <ListItemButton
                  onClick={() => onMemberSelected?.(member)}
                  key={member.id}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.full_name} />
                </ListItemButton>
                <IconButton onClick={() => removeMember(member)}>
                  <PersonRemoveIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
