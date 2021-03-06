import React from 'react';
import {FormControl} from 'react-bootstrap';
import $ from 'jquery';
import 'jquery-ui/ui/unique-id';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/menu';
import 'jquery-ui/ui/widgets/autocomplete';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/menu.css';
import 'jquery-ui/themes/base/autocomplete.css';

import pokemonAPI from '../pokemonAPI.js';

class SearchInput extends React.Component {

  componentDidMount() {
    this.$el = $(this.el);
    let searchHandler = this.props.onSubmit;
    this.$el.autocomplete({
      source: new pokemonAPI().getPokemonNames(),
      select: function(event, ui) {
            event.target.value = ui.item.value;
            searchHandler(event);
          }
    });
  }

  componentWillUnmout() {
    this.$el.autocomplete('destroy');
  }

  render() {
    return <FormControl
      key={this.props.value}
      type="text"
      placeholder="Type Pokemon Name or id"
      className="me-2"
      aria-label="Search"
      name="pokemonName"
      id="pokemonSearch"
      autoComplete="off"
      defaultValue={this.props.defaultValue}
      form="searchForm"
      ref={el => this.el = el}
    />;
  }

}

export default SearchInput;
