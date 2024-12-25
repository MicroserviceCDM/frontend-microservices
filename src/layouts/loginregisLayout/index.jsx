import PropTypes from 'prop-types';

function loginregisLayout({children}) {
    return (  
        <div>{children}</div> 
    );
}

loginregisLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default loginregisLayout;