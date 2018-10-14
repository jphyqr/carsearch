import React, { Component } from "react";
import CarSearchResults from './CarSearchResults';
import { Button, Segment, Form } from "semantic-ui-react";
import axios from "axios";
export class CarSearchForm extends Component {
  state = {
    result: "",
    search: {
      year: ""
    }
  };

  onFormSubmit = evt => {
    const your_api_key = "V78kVFiCxJvr9ZNZZQlFOF4VTEi1GO5f";
    evt.preventDefault();

    const config = {
        headers: {'Host': 'marketcheck-prod.apigee.net','Content-Type': 'application/json'}
      };

    axios
      .get(
        `https://marketcheck-prod.apigee.net/v1/search?api_key=${your_api_key}&seller_type=dealer&year=${this.state.search.year}
        `,
        config
      )
      .then(res => {
        const result = res.data;
        this.setState({ result });
      });
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
            <Form.Field>
              <label>Year</label>
              <input
                name="year"
                value={this.state.search.year}
                onChange={this.onInputChange}
                placeholder="year"
              />
            </Form.Field>

            <Button positive type="submit">
              Submit
            </Button>
            <Button positive onClick={this.onFormSubmit} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
        <Segment>
          <CarSearchResults results={this.state.result}/>
        </Segment>

           
      </div>
    );
  }
}

export default CarSearchForm;
