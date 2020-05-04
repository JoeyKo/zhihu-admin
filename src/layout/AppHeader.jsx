import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Header } = Layout

const AppHeader = props => {
    
    return (
        <Header className='header'>
          header
        </Header>
    )
}

AppHeader.propTypes = {
    menuClick: PropTypes.func,
    avatar: PropTypes.string,
    menuToggle: PropTypes.bool,
    loginOut: PropTypes.func
}

export default AppHeader