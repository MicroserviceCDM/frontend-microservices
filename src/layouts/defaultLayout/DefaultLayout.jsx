import NavBar from "../components/NavBar";
import PropTypes from 'prop-types';

function DefaultLayout({children}) {
    return (  
        <div>
            <NavBar/>
            <div>{children}</div> 
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;