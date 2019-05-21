import { Theme, withStyles } from "@material-ui/core";
import _uniqueId from "lodash/uniqueId";
import React from "react";
import "./App.css";
import { LimitFields, SwabSample as SwabSampleModel } from "./form";
import LimitsForm from "./formComponents/LimitsForm";
import PPMDetails from "./formComponents/PPMDetails";
import SelectInput from "./selectInput";
import TextInput from "./textInput";
import SwabSample from "./formComponents/SwabSample";

interface Props {}

interface State {
  analyticalId: string;
  residueType: string;
  reason: string;
  ppmDetails: {
    lod: string;
    loq: string;
  };
  limitsFields: LimitFields;
  swabSamples: SwabSampleModel[];
}

const residueOptions = [
  { name: "API", value: "API" },
  { name: "Cleaning Agent", value: "cleaning_agent" },
  { name: "Bioburden", value: "bioburden" },
  { name: "Endotoxin", value: "endotoxin" }
];

class App extends React.Component<Props & { classes: any }, State> {
  state: State = {
    analyticalId: "",
    residueType: "API",
    ppmDetails: { lod: "", loq: "" },
    limitsFields: {
      method: "",
      limits: "",
      tntcLimit: "",
      tftcLimit: ""
    },
    reason: "",
    swabSamples: []
  };

  componentDidMount() {
    const stateString = localStorage.getItem("state");
    let state;
    stateString
      ? (state = JSON.parse(stateString || ""))
      : localStorage.setItem("state", JSON.stringify(this.state));
    state && this.setState(state);
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  updatePPMDetails = (field: string) => (e: React.ChangeEvent<any>) => {
    this.setState({
      ppmDetails: { ...this.state.ppmDetails, [field]: e.target.value }
    });
  };

  updateLimitFields = (field: string) => (e: React.ChangeEvent<any>) => {
    this.setState({
      limitsFields: { ...this.state.limitsFields, [field]: e.target.value }
    });
  };

  addSwabSample = () => {
    const swapForm = {
      id: _uniqueId(),
      methodUsed: "",
      solvantName: "",
      solvantQuantity: "",
      defaultRecovery: "",
      useRecovery: "",
      mocs: []
    };
    this.setState({ swabSamples: this.state.swabSamples.concat(swapForm) });
  };

  removeSwabSample = (id: string) => {
    const swabSamples = [...this.state.swabSamples];
    const updatedSamples = swabSamples.filter(sample => sample.id !== id);

    this.setState({ swabSamples: updatedSamples });
  };

  updateSwabSample = (swapSample: SwabSampleModel) => {
    const swapSamples = [...this.state.swabSamples];
    const updatedswapSamples = swapSamples.map(sample =>
      sample.id === swapSample.id ? swapSample : sample
    );
    this.setState({
      swabSamples: updatedswapSamples
    });
  };

  updateFormFields = (field: string) => (e: React.ChangeEvent<any>) => {
    e.persist();
    console.log(field);
    let swabSamples = { ...this.state.swabSamples };
    if (field === "residueType") {
      swabSamples = [];
    }
    this.setState((prevState: State) => ({
      ...prevState,
      [field]: e.target.value,
      swabSamples
    }));
  };

  renderAdditionalForm = () => {
    const { residueType } = this.state;
    if (residueType === "API" || residueType === "cleaning_agent") {
      return (
        <PPMDetails
          onChange={this.updatePPMDetails}
          ppmValues={this.state.ppmDetails}
        />
      );
    }
    return (
      <LimitsForm
        limitValues={this.state.limitsFields}
        onChange={this.updateLimitFields}
      />
    );
  };

  render() {
    const { state } = this,
      { swabSamples } = state,
      { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextInput
          field={"analyticalId"}
          label={"Analytical Method ID"}
          value={state.analyticalId}
          onChange={this.updateFormFields("analyticalId")}
        />
        <SelectInput
          field={"residueType"}
          label={"Target Residue Type"}
          value={state.residueType}
          options={residueOptions}
          onChange={this.updateFormFields("residueType")}
        />
        {state.residueType && this.renderAdditionalForm()}

        {swabSamples && swabSamples.length ? (
          swabSamples.map(sample => (
            <SwabSample
              key={sample.id}
              formType={
                state.residueType === "API" ||
                state.residueType === "cleaning_agent"
                  ? "A"
                  : "B"
              }
              swabSampleData={sample}
              addSample={this.addSwabSample}
              removeSample={this.removeSwabSample}
              updateSwabSample={this.updateSwabSample}
            />
          ))
        ) : (
          <div
            className={`center-x py-10 cp ${classes.configureBtn}`}
            onClick={this.addSwabSample}
          >
            + Configure Swap Sample Paramters
          </div>
        )}

        <TextInput
          field={"reason"}
          label={"Reason"}
          value={state.reason}
          onChange={this.updateFormFields("reason")}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 50
  },
  configureBtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: 5,
    margin: "10px 0",
    borderRadius: 4
  }
});

export default withStyles(styles)(App);
