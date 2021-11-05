import { useContext } from "react";
import { ToastsContext } from "../pages/contexts/ToastsContext";

const useToast = () => {
  const toastContext = useContext(ToastsContext);

  if (toastContext === undefined) {
    throw new Error("Toasts context undefined");
  }

  return toastContext;
};

export default useToast;
