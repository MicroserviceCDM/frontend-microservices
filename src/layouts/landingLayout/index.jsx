import NavBar from "../components/NavBar";
import PropTypes from 'prop-types';
import LandingNavBar from "../components/LandingNavBar";
function landingLayout({children}) {
    return (  
        <div>
            <div><LandingNavBar/></div>
            <div>{children}</div> 
        </div>
    );
}

landingLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default landingLayout;