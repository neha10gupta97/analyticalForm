import React from "react";
import { TextField } from "@material-ui/core";

interface Props {
  label: string;
  field: string;
  value: any;
  type?: string;
  onChange(e: React.ChangeEvent<any>): void;
}

const TextInput: React.FC<Props> = props => {
  return (
    <TextField
      id={props.field}
      type={props.type || "text"}
      fullWidth
      required
      margin="normal"
      label={props.label}
      variant={"outlined"}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default TextInput;
