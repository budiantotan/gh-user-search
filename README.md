# Search Github users
Simple app built to search github user, view the follower & following information. Supports SSR, SPA, Universal Rendering. Building from scratch as a challenge.

Available in Heroku: https://shielded-bastion-65107.herokuapp.com/

## Technology Stack
- React
- Redux
- React Redux
- React Helmet
- React Router
- Emotion
- Express
- Webpack

## Installation and Setup
Clone the repo:
```
git clone https://github.com/budiantotan/gh-user-search.git
```

Install the dependencies and start the server:

```sh
$ cd gh-user-search
$ yarn
$ yarn dev // watching the build
$ yarn start // starting the server
```

Check here: http://localhost:3000/

## Directory convention
```
── src
    ├── components
    ├── hooks
    ├── pages
    ├── redux
    ├── services
    └── utils
```

- `components` where component lives
- `hooks` custom hooks
- `pages` pages, separated by route definition (react router)
- `redux` all redux related files
- `services` all api call are in here
- `utils` common utility / helpers


## Features
### getInitialProps ({ params, store })
`Params: The parameter from react-router-dom, which will be useful to get url param / query strings`

`Store: Redux store object`

Similar with next.js' `getInitialProps`. This is no where near what next.js has, but the basic idea is the same. Every page with getInitialProps will be executed in server / client.

```jsx
const Home = () => {
  const state = useSelector(state => state.todo);
  useEffect(() => {
    // Executed in client side
    console.log(state);
  }, [])

  return (
    <div>Hello</div>
  )
}

Home.getInitialProps = ({ store }) => {
  // This will be executed in server, SSR works and will be hydrated to client
  // Client side navigation will also trigger this function.
  store.dispatch({ type: 'SET_TODO', todo: 'My todo' })
}
```
