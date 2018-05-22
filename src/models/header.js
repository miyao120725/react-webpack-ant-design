import React from 'react';
// import { connect } from 'dva';
import style from'./home.scss';

class Header extends React.Component{
    render(){
        return (
           
            <div className='navTop clearfix'>
                <div className="nav-left fl">
                    <a href="javascript:;"></a>
                </div>
                <span className="nav-text">头条在线</span>
                <div className="nav-right fr">
                    <a href="javascript:;"></a>
                </div>
            </div>
           
        )
    }
}

export default Header;
