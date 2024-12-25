import PropTypes from 'prop-types';
import NavBarStaff from '../components/NavBarStaff';

function staffLayout({children}) {
    return (  
       <div>
        <NavBarStaff/>
        <div>{children}</div> 
       </div>
    );
}

staffLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default staffLayout;