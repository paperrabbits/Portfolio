  // NPM
import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'

  // LOCAL
import './App.scss'
import routes from './routes'

const App = (props) => {
  const {pathname} = props.location

  useEffect(() => {
    if (pathname === '/') {
      document.title = 'Porfolio'
    } else if (pathname === '/projects') {
      document.title = 'Porfolio'
    } else if (pathname === '/poker') {
      document.title = 'Texas Holdem'
    } else if (pathname === '/todo') {
      document.title = 'My Time App'
    } else if (pathname === '/gallery') {
      document.title = 'Freshly Picked Prints'
    }
  }, [pathname])

  return (
    <div className="App">
      {routes}
    </div>
  )
}
export default withRouter(App)