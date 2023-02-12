import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "../services/requestHandlers";
import { currentUserAtom } from "../state/atoms";
import { IUser } from "../types";

interface IMemberDropDownProps {
  currentValue?: IUser;
  projectId: number;
  onChange: (member: IUser) => void;
}

export const MemberDropDown: React.FC<IMemberDropDownProps> = (props) => {
  const [currentUser] = useAtom(currentUserAtom);
  const { currentValue, projectId, onChange } = props;
  const { GetProjectMember } = useQuery();
  const [members, setMembers] = useState<IUser[]>([]);

  const getMembers = useCallback(async () => {
    const prjMembers = await GetProjectMember(`${projectId}`);
    if (currentUser) prjMembers.push(currentUser);
    setMembers(prjMembers);
  }, [GetProjectMember, projectId, currentUser]);
  useEffect(() => {
    getMembers();
  }, [getMembers, projectId]);

  const onValueChanged = (event: SelectChangeEvent<string>) => {
    const member = members.filter((m) => m.email === event.target.value);
    if (member.length > 0) {
      onChange?.(member[0]);
    }
  };

  return (
    <FormControl sx={{ pb: 1, minWidth: 200 }} size="small">
      <InputLabel id="status-label-id">Member</InputLabel>
      <Select
        labelId="status-label-id"
        value={currentValue?.email ?? ""}
        label="Status"
        onChange={onValueChanged}
      >
        {members.map((member, index) => (
          <MenuItem key={index} value={member.email}>
            {member.full_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
