// SignUpPage with home redirect
import withHomeRedirect from "../hoc/withHomeRedirect";
import SignUpPage from "./SignUpPage";

const SignUpPageHR = withHomeRedirect(SignUpPage);

export default SignUpPageHR;
