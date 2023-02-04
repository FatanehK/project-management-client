import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Status } from "../contants";
import { StatusType } from "../types";


export interface IStatusSelectorProps {
  value: StatusType;
  onChange?: (newValue: StatusType) => void;
}

export const StatusSelector: React.FC<IStatusSelectorProps> = (props) => {
  const { value, onChange } = props;
  const onValueChanged = (event: SelectChangeEvent) => {
    onChange?.(event.target.value as StatusType);
  };
  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="status-label-id">Status</InputLabel>
      <Select
        labelId="status-label-id"
        value={value}
        label="Status"
        onChange={onValueChanged}
      >
        {Object.keys(Status).map((s, index) => (
          <MenuItem key={index} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
