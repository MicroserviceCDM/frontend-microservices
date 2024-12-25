import ManagerNavBar from "../components/ManagerNavBar";
import PropTypes from 'prop-types';

function ManagerLayout({children}) {
    return (  
        <div>
            <ManagerNavBar/>
            <div>{children}</div> 
        </div>
    );
}

ManagerLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ManagerLayout;