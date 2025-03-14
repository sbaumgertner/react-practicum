import { useSelector } from "react-redux";
import { getIsAuthChecked, getUser } from "../services/user/reducer";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "react-ts-loaders";

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component}: ProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return (<div className="loader"><Loader /></div>);
  }

  if (onlyUnAuth && user) {
      const { from } = location.state ?? { from: { pathname: "/ "} };
      return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
      return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
  <Protected onlyUnAuth={true} component={component} />
);