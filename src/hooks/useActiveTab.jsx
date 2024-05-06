import { useContext } from "react";
import ActiveTabProvider  from "../context/ActiveTabProvider";

const useActiveTab = () => {
    return useContext(ActiveTabProvider);
}

export default useActiveTab;