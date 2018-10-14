import React, { Component } from 'react'
import {Item, Segment} from 'semantic-ui-react'
export default class CarSearchItem extends Component {
  render() {
    const {result} = this.props;
    return (
      <div>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={result.media.photo_links[0]} />
              <Item.Content>
                <Item.Header as="a">{result.heading}</Item.Header>
                <Item.Description>
                  <a>${result.price}</a>
                  {result.dealer.name}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>


      </div>
    )
  }
}
