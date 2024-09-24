import { Outlet } from "react-router-dom";
import withUserData from "../../../core/hoc/withUserData";

const OutletWithUserData = withUserData(Outlet);
export default OutletWithUserData;
