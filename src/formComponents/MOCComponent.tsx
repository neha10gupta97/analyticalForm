import React, { Component } from "react";
import { Theme, withStyles } from "@material-ui/core";
import { MOC } from "../form";
import TextInput from "../textInput";
import SelectInput from "../selectInput";

interface Props {
  mocData: MOC;
  addMOC(): void;
  removeMOC(id: string): void;
  updateMOC(moc: MOC): void;
}

interface State {
  mocData: MOC;
}

const mocTypes = [
  { name: "Stainless Steel", value: "stainless_steel" },
  { name: "Glass", value: "glass" },
  { name: "Teflon", value: "teflon" },
  { name: "Plastic", value: "plastic" }
];

class MOCComponent extends Component<Props & { classes: any }> {
  state = {
    mocData: this.props.mocData || {}
  };

  onChange = (field: string) => (e: React.ChangeEvent<any>) => {
    const mocData = { ...this.state.mocData, [field]: e.target.value };
    this.setState({
      mocData
    });
    this.props.updateMOC(mocData);
  };

  render() {
    const { mocData } = this.state,
      { classes } = this.props;

    if (!mocData) {
      return null;
    }
    return (
      <div className={classes.mocForm}>
        <div className="center-y">
          <SelectInput
            field={"moc"}
            label={"Select MOC"}
            value={mocData.moc}
            options={mocTypes}
            onChange={this.onChange("moc")}
          />
          <div className="mr-10" />
          <TextInput
            field={"recovery"}
            label={"Recovery(%)"}
            onChange={this.onChange("recovery")}
            value={mocData.recovery}
          />
          <div
            className={"ml-10 cp"}
            onClick={() => this.props.removeMOC(mocData.id)}
          >
            X
          </div>
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  swapForm: {
    border: `1px solid ${theme.palette.divider}`
  },
  removeBtn: {
    border: "1px solid red",
    color: "red"
  },
  addMocBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: 5,
    margin: 5,
    borderRadius: 4
  }
});

export default withStyles(styles)(MOCComponent);
