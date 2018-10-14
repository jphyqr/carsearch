import React, { Component } from "react";
import CarSearchForm from "../../features/CarSearch/CarSearchForm"
import CarSearchResults from "../../features/CarSearch/CarSearchResults"

class App extends Component {
  render() {
    return (
      <div>
        <CarSearchForm />
      </div> 
    );
  }
}

export default App;
