import React, { useEffect } from "react";
import s from "./ProductList.module.scss";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={s.toast}>{message}</div>;
};

export default Toast;
