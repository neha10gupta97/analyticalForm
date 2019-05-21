import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

interface SelectOption {
  name: string;
  value: string;
}

interface Props {
  label: string;
  field: string;
  value: any;
  size?: number;
  options: SelectOption[];
  onChange(e: React.ChangeEvent<any>): void;
}

const SelectInput: React.FC<Props> = props => {
  const { label } = props;
  return (
    <TextField
      select
      id={props.field}
      name={label}
      value={props.value}
      label={label}
      margin="normal"
      fullWidth
      variant={"outlined"}
      onChange={props.onChange}
    >
      <MenuItem value="" disabled={true}>
        {label}
      </MenuItem>
      {(props.options || []).map((option: SelectOption, index: number) => (
        <MenuItem key={index} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;
