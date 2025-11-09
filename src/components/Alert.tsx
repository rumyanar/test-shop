import { ReactElement, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faWarning,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const TAlertIcons = {
  "alert-warning": faWarning,
  "alert-error": faXmarkCircle,
  "alert-info": faInfoCircle,
  "alert-success": faCheckCircle,
};
export const Alert = (props: {
  msg?: string;
  type?: keyof typeof TAlertIcons;
  icon?: ReactElement;
  children?: ReactNode;
}) => {
  const { type, msg, icon, children } = props;

  return (
    <div className={`alert ${type} shadow-lg overflow-scroll my-2 max-w-lg`}>
      <div style={{ width: "inherit" }}>
        {icon || (
          <FontAwesomeIcon
            icon={TAlertIcons[type || "alert-info"]}
            className="pr-1"
          />
        )}
        {msg} {children}
      </div>
    </div>
  );
};
