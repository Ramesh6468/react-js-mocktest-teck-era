import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/te/courses/${id}`
    console.log(url)
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="bgCard">
        <div className="successCard2">
          <img src={imageUrl} alt={name} className="image2" />
          <div className="nameCard">
            <h1 className="name">{name}</h1>
            <p className="para">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getCourseDetails()
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
    return <div className="detailCard">{this.getApiStatus()}</div>
  }
}

export default CourseDetails
