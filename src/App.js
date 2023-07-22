import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import CourseDetails from './Components/CourseDetails'
import NotFound from './Components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
