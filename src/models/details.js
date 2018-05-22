import React from 'react';
import { connect } from 'dva';
import './details.scss';

function IndexPage() {
    
  return (
    <div className="details-auto">
        <div className="details-top">
            <a href="javascript:void(0)" className="topBack"></a>
            <div className="topCenter">4545122</div>
            <div className="topRight">
                <span className="btn-reply"></span>
                <span className="btn-share"></span>
            </div>
        </div>
        <div className="details-content">
            <div className="content-top">
                <h2>男子把嫂子和侄 子骗回家，3天没出门，警察冲进屋 使劲揉眼睛</h2>
                <div className="content-top-user">
                    <img src="../assets/icon-07.png" alt=""/>
                    <div className="top-user-describe">
                        <h3>
                            来源：实时社会资讯
                        </h3>
                        <span>2018-02-28 18:28</span>
                    </div>
                </div>
            </div>
            <div className="content-text"></div>
        </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
