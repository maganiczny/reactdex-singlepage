import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from './header';
import PokemonView from './content/Pokemon.js';
import HomeView from './content/Home.js';

/********************************
 *
 *     ~~ Smart Component ~~
 *
 *  The App Component is a simple router
 *  to display HomeView or PokemonView.
 *  It also supports changing the value
 *  of location.hash in the above pages.
 *
 ********************************/

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = { show: null };
  }

  searchHandler(event) {

    event.preventDefault();

    let pokemonName;

    if (typeof event.target.elements !== 'undefined')
      pokemonName = event.target.elements.pokemonName.value;

    else if (typeof event.target.form !== 'undefined')
      pokemonName = event.target.form.pokemonName.value;

    else
      pokemonName = null;

    if (pokemonName !== null) {
      window.location.hash = pokemonName;
    }

    this.setState({
      show: pokemonName
    });

  }

  componentDidMount() {
    this.detectHash();
    window.addEventListener("hashchange", this.detectHash.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.detectHash.bind(this), false);
  }

  detectHash(event = null) {

    if (event !== null) {
      event.preventDefault();
    }

    let hash = window.location.hash.slice(1);

    let state;

    switch (hash) {
      case 'home':
        state = null; break;
      case '':
        state = null; break;
      case 'random':
        window.location.hash = 'home';
        state = null; break;
      default:
        state = hash;
    }

    this.setState({
      show: state
    });

    return false;

  }

  selectPokemonFormHandler(event)
  {
    event.preventDefault();

    let newVal = event.target.value;

    if (this.state.show !== newVal) {
      window.location.hash = newVal.toLowerCase();
      this.setState({
        show: newVal
      });
    }
    return;
  }

  render() {
    return (
      <Container fluid>
        <Header
          searchHandler={this.searchHandler.bind(this)}
          value={this.state.show}
        />
        { this.state.show === null ?
          <HomeView /> :
          <PokemonView
            key={this.state.show}
            pokemon={this.state.show}
            onChangePokemonForm={this.selectPokemonFormHandler.bind(this)}
          />
        }
      </Container>
    );
  }
}


export default App;
