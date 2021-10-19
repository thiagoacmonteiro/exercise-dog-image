import React from 'react';
import './App.css';

// Create component App
class App extends React.Component {
  constructor() {
    super();

    this.fetchDog = this.fetchDog.bind(this);
    
    // Set initial state
    this.state = {
      image: '',
      loading: true,
      urls: []
    }
  }

  // Fetch API and update the state
  async fetchDog() {
    this.setState(
      { loading: true },
      async () => {
        const requestHeaders = { headers: { Accept: 'application/json' } }
        const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random', requestHeaders)
        const requestObject = await requestReturn.json();
        this.setState({
          loading: false,
          image: requestObject.message,
        })
      }  
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { image, urls } = this.state;

    if (image.includes('terrier')) {
      return false
    }
    this.setState({
      urls: [...image, nextState.message]
    })
    localStorage.setItem('urls', urls)
    return true;
  }

  // Call fetch API after render
  componentDidMount() {
    this.fetchDog();
  }

  // Render according to the moment and the click
  render() {
    const { image, loading } = this.state;

    return (
      <div className="App">
        { loading ? <span>Loading...</span> : <img src={ image } alt={ image } className="dog" /> }
        <button type="button" onClick={ this.fetchDog }>New Dog</button>
      </div>
    );
  }
}

export default App;
