import React, { Component } from "react";
import _uniqueId from "lodash/uniqueId";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel, Radio } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core";
import { SwabSample as SwabSampleModel, MOC } from "../form";
import TextInput from "../textInput";
import MOCComponent from "./MOCComponent";

interface Props {
  swabSampleData: SwabSampleModel;
  formType: "A" | "B";
  addSample(): void;
  removeSample(id: string): void;
  updateSwabSample(swapSample: SwabSampleModel): void;
}

interface State {
  swabSample: SwabSampleModel;
}

const recoveryOption = [
  { name: "Yes", value: "yes" },
  { name: "No", value: "no" }
];

class SwabSample extends Component<Props & { classes: any }> {
  state = {
    swabSample: this.props.swabSampleData || {}
  };

  onChange = (field: string) => (e: React.ChangeEvent<any>) => {
    const swabSample = { ...this.state.swabSample, [field]: e.target.value };
    this.setState({ swabSample });
    this.props.updateSwabSample(swabSample);
  };

  addMOC = () => {
    const moc = {
      id: _uniqueId(),
      moc: "",
      recovery: ""
    };
    const swabSample = { ...this.state.swabSample };
    const updatedSwabSample = {
      ...swabSample,
      mocs: this.state.swabSample.mocs.concat(moc)
    };
    this.setState({ swabSample: updatedSwabSample });
    this.props.updateSwabSample(updatedSwabSample);
  };

  removeMOC = (id: string) => {
    const mocs = [...this.state.swabSample.mocs];
    const updatedMocs = mocs.filter(moc => moc.id !== id);

    const swabSample = {
      ...this.state.swabSample,
      mocs: updatedMocs
    };
    this.setState({ swabSample });
    this.props.updateSwabSample(swabSample);
  };

  updateMOC = (newMoc: MOC) => {
    const mocs = [...this.state.swabSample.mocs];
    const updatedMocs = mocs.map(moc => (moc.id === newMoc.id ? newMoc : moc));
    const swabSample = {
      ...this.state.swabSample,
      mocs: updatedMocs
    };
    this.setState({ swabSample });
    this.props.updateSwabSample(swabSample);
  };

  render() {
    const { swabSample } = this.state,
      { classes, formType } = this.props;

    if (!swabSample) {
      return null;
    }

    const mocs = swabSample.mocs || [];
    return (
      <div>
        <div
          className={`center-x py-10 cp ${classes.btn} ${classes.removeBtn}`}
          onClick={() => this.props.removeSample(swabSample.id)}
        >
          Remove Swab Sampling Parameters
        </div>
        <div className={classes.swapForm}>
          {formType === "A" ? (
            <>
              <TextInput
                field={"methodUsed"}
                label={"Method Used"}
                onChange={this.onChange("methodUsed")}
                value={swabSample.methodUsed}
              />
              <div className="flex">
                <TextInput
                  field={"solvantName"}
                  label={"Solvant Name"}
                  onChange={this.onChange("solvantName")}
                  value={swabSample.solvantName}
                />
                <div className="mr-10" />
                <TextInput
                  field={"solvantQuantity"}
                  label={"Solvant Quantity"}
                  onChange={this.onChange("solvantQuantity")}
                  value={swabSample.solvantQuantity}
                />
              </div>
              <TextInput
                field={"defaultRecovery"}
                label={"Default Recovery(%)"}
                onChange={this.onChange("defaultRecovery")}
                value={swabSample.defaultRecovery}
              />
            </>
          ) : (
            <div className="center-y">
              <div className={classes.recoveryField}>
                <div>User Recovery for Swab?</div>
                <RadioGroup
                  aria-label={"Recovery Use"}
                  onChange={this.onChange("useRecovery")}
                  row={true}
                >
                  {recoveryOption.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option.value}
                      label={option.name}
                      name={"gender"}
                      control={
                        <Radio
                          name={"gender"}
                          checked={swabSample.useRecovery === option.value}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
              <div className="mr-10" />
              <TextInput
                field={"defaultRecovery"}
                label={"Default Recovery(%)"}
                onChange={this.onChange("defaultRecovery")}
                value={swabSample.defaultRecovery}
              />
            </div>
          )}

          {mocs && mocs.length ? (
            <div className={classes.mocWrapper}>
              {mocs.map(moc => (
                <MOCComponent
                  key={moc.id}
                  mocData={moc}
                  addMOC={this.addMOC}
                  removeMOC={this.removeMOC}
                  updateMOC={this.updateMOC}
                />
              ))}
              <div
                className={`py-10 cp ${classes.blueText}`}
                onClick={this.addMOC}
              >
                + Create New Moc
              </div>
            </div>
          ) : (
            <div
              className={`center-x py-10 cp ${classes.btn} ${
                classes.addMocBtn
              }`}
              onClick={this.addMOC}
            >
              + Add MOC
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  swapForm: {
    border: `1px solid ${theme.palette.divider}`,
    padding: "25px 15px",
    borderRadius: 4,
    marginTop: 15
  },
  mocWrapper: {
    background: theme.palette.divider,
    borderRadius: 4,
    marginTop: 10,
    padding: "10px 20px"
  },
  recoveryField: {
    width: "50%"
  },
  removeBtn: {
    border: "1px solid red",
    color: "red"
  },
  btn: {
    padding: 5,
    margin: "5px 0",
    borderRadius: 4
  },
  addMocBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main
  },
  blueText: {
    color: theme.palette.primary.main
  }
});

export default withStyles(styles)(SwabSample);
