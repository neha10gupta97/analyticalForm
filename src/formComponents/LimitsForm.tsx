import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextInput from "../textInput";
import { LimitFields } from "../form";
import { FormControlLabel, Radio } from "@material-ui/core";

interface Props {
  limitValues: LimitFields;
  onChange(field: string): (e: React.ChangeEvent<any>) => void;
}

const limitsOptions = [
  { name: "Yes", value: "yes" },
  { name: "No", value: "no" }
];

const PPMDetails: React.FC<Props> = props => {
  const { limitValues } = props;
  return (
    <div>
      <TextInput
        field={"method"}
        label={"Method Used"}
        onChange={props.onChange("method")}
        value={limitValues.method}
      />
      <div>
        <div>Define TNTC and TFNC Limits?</div>
        <RadioGroup
          aria-label={"Limits"}
          onChange={props.onChange("limits")}
          row={true}
        >
          {limitsOptions.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option.value}
              label={option.name}
              name={"gender"}
              control={
                <Radio
                  name={"gender"}
                  checked={limitValues.limits === option.value}
                />
              }
            />
          ))}
        </RadioGroup>
      </div>
      {limitValues.limits === "yes" && (
        <div className="flex">
          <TextInput
            field={"tntcLimit"}
            label={"TNTC Limit (in CFU)"}
            type={"number"}
            onChange={props.onChange("tntcLimit")}
            value={limitValues.tntcLimit}
          />
          <div className="mr-10" />
          <TextInput
            field={"tftcLimit"}
            label={"TFTC Limit (in CFU)"}
            type={"number"}
            onChange={props.onChange("tftcLimit")}
            value={limitValues.tftcLimit}
          />
        </div>
      )}
    </div>
  );
};

export default PPMDetails;
