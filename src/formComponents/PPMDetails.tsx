import React from "react";
import TextInput from "../textInput";

interface Props {
  ppmValues: { lod: string; loq: string };
  onChange(field: string): (e: React.ChangeEvent<any>) => void;
}

const PPMDetails: React.FC<Props> = props => {
  const { ppmValues } = props;
  return (
    <div className="flex">
      <TextInput
        field={"lod"}
        label={"LOD"}
        type={"number"}
        onChange={props.onChange("lod")}
        value={ppmValues.lod}
      />
      <div className="mr-10" />
      <TextInput
        field={"loq"}
        label={"LOQ"}
        type={"number"}
        onChange={props.onChange("loq")}
        value={ppmValues.loq}
      />
    </div>
  );
};

export default PPMDetails;
