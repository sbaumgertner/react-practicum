import { useSelector } from "../services/store";
import { getIsAuthChecked, getUser } from "../services/user/reducer";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "react-ts-loaders";

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return (<div className="loader"><Loader /></div>);
  }

  if (onlyUnAuth && user) {
    const { from }: { from: { pathname: string } } = location.state ?? { from: { pathname: "/ " } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <Protected onlyUnAuth={true} component={component} />
);