import { GoArrowLeft } from "react-icons/go";
import s from './BackLink.module.css';
import { Link } from "react-router-dom";
const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={s.link}>
      <GoArrowLeft />
      {children}
    </Link>
  );
};
export default BackLink;