import React, { Component } from "react";
import CarSearchResults from "./CarSearchResults";
import { Button, Segment, Form, Dropdown, Grid } from "semantic-ui-react";
import axios from "axios";
import keys from "../../config/keys";

const config = {
  headers: {
    Host: "marketcheck-prod.apigee.net",
    "Content-Type": "application/json"
  }
};

const config2 = {
  headers: {
    Host: "marketcheck-prod.apigee.net"
  }
};
const dealershipOptions = [
  { key: "titan", value: "titan", text: "Titan Auto" },
  { key: "mercedez", value: "mercedez", text: "Mercedes Regina" }
];
export class CarSearchForm extends Component {
  state = {
    result: "",
    search: {
      year: "",
      dealership: ""
    },
    dealerships : ""
  };

  componentDidMount(){
    const DEALER_URL = "http://api.marketcheck.com/v1/dealers?";
    const DEALER_NEAR_ZIP = `http://api.marketcheck.com/v1/dealers?api_key=${keys.marketCheckKey}&rows=50&sort_order=asc`;
    axios
    .get(
      DEALER_NEAR_ZIP,
      config2
    )
    .then(res => {
      const dealerships = res.data;
      this.setState({ dealerships });
    });
  }

  onFormSubmit = evt => {
    evt.preventDefault();

    const ROOT_URL = "https://marketcheck-prod.apigee.net/v1/search?";


    axios
      .get(
        `${ROOT_URL}api_key=${keys.marketCheckKey}&seller_type=dealer&year=${
          this.state.search.year
        }&country=CA
        `,
        config
      )
      .then(res => {
        const result = res.data;
        this.setState({ result });
      });
  };

  onDealershipSelect = (e, data) => {
   console.log(data.value)
  };

  onInputChange = evt => {
    const newSearch = this.state.search;
    newSearch[evt.target.name] = evt.target.value;
    this.setState({
      search: newSearch
    });
  };
  render() {
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Grid>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Year</label>
                  <input
                    name="year"
                    value={this.state.search.year}
                    onChange={this.onInputChange}
                    placeholder="year"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
              <label>Dealership</label>
                <Dropdown
                onChange={this.onDealershipSelect}
                  placeholder="Select Dealership"
                  fluid
                  search
                  selection
                  options={dealershipOptions}
                />
              </Grid.Column>
            </Grid>

            <Button positive type="submit">
              Submit
            </Button>
            <Button positive onClick={this.onFormSubmit} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
        <Segment>
          <CarSearchResults results={this.state.result} />
        </Segment>
      </div>
    );
  }
}

export default CarSearchForm;
