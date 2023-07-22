import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="image3"
    />
    <h1 className="notFoundTitle">Page Not Found</h1>
    <p className="errorPara">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
