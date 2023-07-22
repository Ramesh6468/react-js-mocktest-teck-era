import {Link} from 'react-router-dom'
import './index.css'

const IconItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <Link to={`/courses/${id}`}>
      <li className="item">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="name1">{name}</p>
      </li>
    </Link>
  )
}

export default IconItem
