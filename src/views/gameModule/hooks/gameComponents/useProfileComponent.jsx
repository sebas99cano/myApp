import { useSelector } from "react-redux";

export const useProfileComponent = () => {
  const data = useSelector((state) => state.GameReducer);
  return {
    data,
  };
};
