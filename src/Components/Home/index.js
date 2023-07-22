import {Component} from 'react'
import Loader from 'react-loader-spinner'
import IconItem from '../IconItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    CourseData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      console.log(updatedData)

      this.setState({
        CourseData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryButton = () => {
    this.getCourseData()
  }

  getSuccessView = () => {
    const {CourseData} = this.state

    return (
      <div className="successCard">
        <h1 className="heading">Courses</h1>
        <ul className="list">
          {CourseData.map(each => (
            <IconItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  getFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="error1">Oops! Something Went Wrong</h1>
      <p className="errorPara">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retryButton"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  getLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccessView()

      case apiStatusConstants.failure:
        return this.getFailureView()

      case apiStatusConstants.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="bgContainer">{this.getApiStatus()}</div>
  }
}

export default Home
