Intro to AJAX and CREATE REACT APP
Learning Objectives
Making AJAX requests in a React Application
Lifting state that is shared by components
Describe what is AJAX
Describe what AJAX is used for
Describe what are 3rd Party APIs and How they are used
Describe what are API keys and how to use them
Review Query Parameters and how they can be used in 3rd Party API requests
Set up fetch for a React App
Learn how to use fetch to make API requests
Learn how to incorporate data from fetch requests into a SPA using React
AJAX
AJAX stands for Asynchronous JavaScript an XML.

XML was once a popular way to store and send data over the internet and it is still used. However, JSON has become the predominant way to send data over the internet. But, no one seems to want to change the acronym AJAX to AJAJ.

When we will use AJAX, we will be sending and receiving JSON.

AJAX allows us to only reload portions of a web page. Thinking of an embedded google map, you can click around it and change the view/data, without having to reload the page every single time.

AJAX/HTTP Requests
At first, jQuery was the only 'friendly' way to make AJAX requests. Over time, new libraries have developed.

Some top choices

fetchbuilt in to most modern browsers
axios - Axios has a few built in security features (examples use promises)
Ky - A small lightweight library with examples using async/await
Third Party APIs
Many web sites have their own data, but they can pull in other data. For example, many news sites have a weather widget. This widget gets its data from a weather resource.

There are many APIs that can be used by individuals and companies. Some are totally free, some are available for a small fee, and some are really expensive.

There are APIs for

Weather
Stocks
Beer
Dictionaries
Books
Sports
Art
Games
Movies
Here is one list of APIs

API Keys
Many APIs are restricted. Maintaining data on a server can get expensive and the data on a lot of these sites is valuable.

The two main ways individuals/companies can get access to APIs is through API keys - a special set of characters that is purchased through the website. Every time you make a request, the key must be used, this lets the API keep track of how many requests you make and limit/charge you accordingly.

The other way is OAuth. OAuth is a tangent to what we'll talk about today, but if you want to learn more, here is a good start.

Typically, API keys go in as query parameters. Query parameters go at the end of a URL. They start with a ?and then have key value pairs. Many key-value pairs can be used and each key-value pair can be used by separating them with an equal sign.

Here is an example of a request to OMDB (open movie data base), for a movie with the title Eraserheadand the apikey(this is a fake key).

http://www.omdbapi.com/?t=Eraserhead&apikey=x9903Ddc
A response in JSON will be sent and could be seen in the browser

eraserhead omdb json

Mini Movie App
We're going to build a tiny React single page app that has a text input, a button and when a user inputs a movie, they will get a set of movies that match from OMDB.

Setup
create-react-app
When it comes to using the major frontend frameworks (Angular, React, Vue, and Svelte) to really create the ideal development environment it can take several different tools.

babel A tool for taking cutting ends javascript code and jsx and translating it into older browser readable javascript. This allows us to use the newest javascript in React with out concern for browser compatibility.
ESLint A linter is a tool that seeks out syntax errors and issues warnings and errors to help you clean up your code faster. There is React ESLint libraries that allow ESLint to give us information to optimize our React builds.
bundler A bundler takes all our code across several javascript files, runs it through several plugins (like babel and eslint) then takes all the code and builds it into one javascript file for deployment. The two major bundlers are Webpack and Rollup, with Parcel and Snowpack being newcomers growing in popularity.
It would not be pleasant to have to configure all of the above for every React app you want to create so there is a vast array of project generators out there for all the frameworks that give you pre-configured templates to start from.

Facebook, the creators of React, have created one for React called, create-react-app. With one command we can generate the an optimized and configured environment designed by the Facebook team to start our app from!

How do we do it!

npx create-react-app projectName

Let's break it down...

NPX npx is a tool build into npm to run different npm tools one time, so that way you don't have to install them permanent for quick use. This is usually used mainly with project generators and CLI tools.
create-react-app tool created by facebook that does one thing, generate a React project with all the fancy tools ready to go (Webpack, ESLint, Babel, more).
projectName The name of the folder that will be created with your new project!
Creating our Project
create a new "react" folder where we will generate all our React projects going forward.
From the terminal in your react folder run the following command npx create-react-app reactmovies
cd into the new reactmovies folder
enter command npm startto start the development server and see the default react website.
npm scripts
When using node, scripts can be defined to run certain files and commands very quickly. These are usually defined in the package.json file under "scripts". When using a template like create-react-app it is always a good habit to read the package.json to know what scripts are available (also generally documented in readme.md's of most templates).

*For the exception of "start" which can be run as "npm start" all scripts are run by prefixing it with npm run... "npm run |ScriptName|"

npm start This command will run the development server in react which we will use when developing
npm run build This is for deployment. The build command will run webpack to build out all your files into one outputed into a folder named "build".
npm run test This is to run a built-in testing feature, a discussion for another day.
npm run eject Facebook hides all the tools and configuration files for this template to keep things simple, but if you want to look at the guts to better understand what's going on or tweak and customize you can run this command to reveal the inner workings of the CRA template.
The Source Folder
All your code will generally exist in the src folder. Below are some of the main files to be aware of...

index.js: This is the file that renders your app component to your index.html
index.css: This css file is imported info index.js, so think of it as your global css file
App.js: This is your app component it represents, well... your application
App.js

set up a ReactDOM.render()that will render an Appcomponent that will, for now, just say 'hello world'
import React from 'react'

class App extends React.Component {
  render () {
    return (
      <div>Hello World</div>
    )
  }
}

export default App;
index.js

// will look something like this depending on your react version
// your app may querySelector a different element

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(<App />, document.querySelector('#app'))
Setting Up Our Form
We're going to be making requests to OMDB using fetch. We'll be viewing those results in Chrome's Console. Once we build out the functionality, we'll start incorporating our data into our web page.

Go to request an api key from OMDB

Fill out the form, you should get an email asking you to validate your key within a few minutes. Hold on to this key, we'll be using it soon enough.

An http request requires:

headers (fetch handles most of this for us)
a url to send the request
a method (get, post, put, delete...)
a way to send data if it is a post or put request
a way to wait for the response before doing something with the incoming data (We'll use promises, but there is a newer way with async/await that you can research on your own)
a way to do something with the incoming data
a way to handle errors
Let's build our first fetch request.

fetchis a function. it takes one argument which MUST be an object. We'll code this out together after we put together our query string

The object requires a minimum of two key value pairs

method- a string: GET, POST, PUT, DELETE
url- a string of where to send the request
if the request is sending data (ie input from input fields), a third key value pair is required
data: an object of key value pairs Since we are just sending GET requests, we won't need datafor now - We'll build out our fetchrequest after we set up our form.
App.js

for now we will build the form in our App.js, but once we finish it at the end we will create a seperate file just for the form

Let's build our form and form functionality. We've done this before and it seems like a lot of boilerplate functionality. Because react has reusable components, you could just build this functionality once per project. But you may find that you want different behaviors for different inputs.

We're going to break our request into multiple parts and then concatenate it. This will help us see each piece and what it does, and then possibly, help us have more flexibility as we build more complex/varied requests

baseURl: 'http://www.omdbapi.com/?'the start of our request beginning with http://, after the last /we have a question mark, that will start our query parameters
apikey: 'apikey='+ 'your api key here'apikeyis the specific key OMDB is looking for, then we'll add our own api key (no spaces).
query: '&t='the ampersand &lets us know that there is another query parameter coming up. t=is the next key, it matches the type of search we want to do. There are a few searches in the OMDB documentation. Perhaps later on, we'd want to use a different one?.
movieTitle: ''- the movie title we'd like to search for. We'll be able to enter what we want using our input and form
searchURL:''- here we'll end up concatenating all the pieces to make a working url.
state = {
    baseURL: 'http://www.omdbapi.com/?',
    apikey: 'apikey=' + '98e3fb1f',
    query: '&t=',
    movieTitle: '',
    searchURL: ''
}
Next we'll have to add our form(and we'll add an anchor tag at the bottom, if we've successfully built our URL, we should be able to click on it and see our JSON from OMBD):

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
        <a href={this.state.searchURL}>{this.state.searchURL}</a>
      </>
    )
  }
Finally, we have to add our handleChangeand handleSubmitfunctionality. And let's not forget to bind those in our constructor

state = {
    baseURL: 'http://www.omdbapi.com/?',
    apikey: 'apikey=' + '98e3fb1f',
    query: '&t=',
    movieTitle: '',
    searchURL: ''
}

handleChange = (event) =>{
  this.setState({ [event.target.id]: event.target.value })
}
handleSubmit = (event) =>{
  event.preventDefault()
  this.setState({
    searchURL: this.state.baseURL + this.state.apikey + this.state.query +  this.state.movieTitle
  })
}
Our searchURL should look like (the api key is fake, it should be the one you got via email).

http://www.omdbapi.com/?apikey=9999999&t=Eraserhead
When you click on your anchor tag, you should be taken to the JSON view:

OMDB response

Note: including your API key in the app.jsand then pushing it up to github makes your API key findable. OMDB keys are not that valuable, so it shouldn't be a worry.

However, there are services that cost thousands of dollars a month. People write bots to look for exposed API keys to steal them. We don't have time to cover hiding API keys today. But keep it in mind for your projects.

Using Fetch
Rather than render the atag, we want to be able display the data we want on on our web page. Let's start out by getting our JSON from OMDB to console log. When we are doing a get request, all we need to do is put a string as our first argument.

We have a one little GOTCHA - we have to make sure that state has been set, before we make our request. So we'll add our fetch request as a second argument in our setStatefunction inside our handleSubmit

handleSubmit = (event) => {
  event.preventDefault()
  this.setState({
    searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.movieTitle
  }, () => {
    // fetch request will go here
  })
}
Let's isolate and look at each part of our fetch request as we build it inside our callback of setState

fetch function

fetch()
fetch function with url string as argument

  fetch(this.state.searchURL)
Remember, JavaScript just runs through the code top to bottom. It doesn't wait for one thing to finish before moving on to the next thing.

One way we've been handling waiting is by using callbacks (like we just did with setState). Callbacks can get unwieldy. Promises can be a nicer way to write our code. Often you'll be working with promises that were already created for you from a library or framework (like fetch)

A promise is a way of writing code that says 'hey, wait for me, and I promise I'll send you a response soon. Then, you can do what you need to do'

A promise has three states

Pending
Fulfilled (completed successfully)
Rejected (it failed)
After calling the initial function (in our case fetch()), all we need to do is chain another function .then()

.then()takes two callback functions.

The first one is onFulfilledthis one is executed if the promise is fulfilled. This function can do whatever we want, for now, we'll just console.log the response.

The second one is onRejectedthis one is executed instead of the first one if the promise has failed in some way.

Thenwe need to convert our response to JSON

  fetch(this.state.searchURL).then(response => return response.json())
Then we will console log our resonse. We can break our then()onto multiple lines to make it easier to read(())

fetch(this.state.searchURL)
  .then(response => {
    return response.json()
  }).then(json => console.log(json),
      err => console.log(err))
Our error handling can be very simple, we can just console log the error.

The entire handleSubmitfunction

handleSubmit = (event) => {
  event.preventDefault()
  this.setState({
    searchURL: this.state.baseURL + this.state.apikey + this.state.query + this.state.movieTitle
  }, () => {
    console.log(this.state.searchURL)
    fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => console.log(json),
        err => console.log(err))
  })
}
This will send our request, but now we have to handle the response. The fetch function returns a promise. A promise is an object that handles asynchronous operations.

fetch({
  method: 'GET',
  url: this.searchURL
}).then( response => {
  console.log(response);
})
Expected Appearance: success OMDB Eraserhead console response

Rendering our response in the Browser
Let's make a movie component that will render a view of our movie in MovieInfo.js

import React from 'react'

class MovieInfo extends React.Component {
  render () {
    return  (
      <div>
        <h1>Title: {this.props.movie.Title}</h1>
        <h2>Year: {this.props.movie.Year}</h2>
        <img src={this.props.movie.Poster} alt={this.props.movie.Title}/>
        <h3>Genre: {this.props.movie.Genre}</h3>
        <h4>Plot: {this.props.movie.Plot}</h4>
      </div>
    )
  }
}

export default MovieInfo;
Gotcha! - the data that came back to us from OMDB set the keys to have a capital letter- we need to make sure we match our data

Now, instead of console.logging our data, let's set the state and clear the form

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
Finally, let's swap out our atag with our component and pass in our movie data as props we'll render nothing if there is no data.

render () {
  return (
    <>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='movieTitle'>Title</label>
        <input
          id='movieTitle'
          type='text'
          placeholder='Movie Title'
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
Entire code

import React from 'react'

class MovieInfo extends React.Component {
  render () {
    return  (
      <div>
        <h1>Title: {this.props.movie.Title}</h1>
        <h2>Year: {this.props.movie.Year}</h2>
        <img src={this.props.movie.Poster} alt={this.props.movie.Title}/>
        <h3>Genre: {this.props.movie.Genre}</h3>
        <h4>Plot: {this.props.movie.Plot}</h4>
      </div>
    )
  }
}

export default MovieInfo;
import React from 'react'
import MovieInfo from './MovieInfo.js'

class OMDBQueryForm extends React.Component {
  state = {
    baseURL: 'http://www.omdbapi.com/?',
    apikey: 'apikey=' + '98e3fb1f',
    query: '&t=',
    movieTitle: '',
    searchURL: '',
    movie: ''
  }

  handleChange = (event) => {
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
          ? <MovieInfo movie={this.state.movie}/>
          : ''
        }
      </>
    )
  }
}

export default OMDBQueryForm;
import React from 'react'
import OMDBQueryForm from './OMDBQueryForm.js'

class App extends React.Component {
  render () {
    return (
      <OMDBQueryForm />
    )
  }
}

export default App;