import React, { Component } from "react";
import { Button, Segment, Form } from "semantic-ui-react";
import CarSearchItem from './CarSearchItem'

export class CarSearchResult extends Component {

 
  render() {

    const {results} = this.props;
    const list = results.listings;
    return (
      <div>
       <h1>Results</h1>
       <h1>{results.num_found} cars found</h1>
       {list&&list.map((result)=>(
<CarSearchItem key={result.id} result={result}/>
       ))}
      </div>
    );
  }
}

export default CarSearchResult;
