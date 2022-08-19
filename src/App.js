
import React from "react"
import MovieInfo from './MovieInfo'
import './App.css';

class App extends React.Component {

  state = {
    baseURL: 'http://www.omdbapi.com/?',
    apikey: 'apikey=' + 'd385f9b3',
    query: '&t=',
    movieTitle: '',
    searchURL: ''
}

handleChange = (event) =>{
  this.setState({ [event.target.id]: event.target.value })
}

handleSubmit = (event) => {
  event.preventDefault()
  this.setState({
    searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.movieTitle
  }, () => {
    fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        movie: json,
        movieTitle: ''
      }),
      err => console.log(err))
  })
}

  render () {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='movieTitle'>Title</label>
        <input
          id='movieTitle'
          type='text'
          value={this.state.movieTitle}
          onChange={this.handleChange}
        />
        <input
          type='submit'
          value='Find Movie Info'
        />
      </form>
      {(this.state.movie)
        ? <MovieInfo movie={this.state.movie} />
      : ''
      }
    </>
    )
  }
}

export default App;