import s from './BackLink.module.css';
import { GoArrowLeft } from "react-icons/go";
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