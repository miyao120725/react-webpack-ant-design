import React from 'react';
import { connect } from 'dva';
import style from'./home.scss';
import Header from './header.js';
import { Link } from 'dva/router';
import http from '../axios-http.js';
import GLOBAL from '../common/global.js'


const Content=(props)=>{
    let jsonObject=strJosn(props.name.imgjs);
    return(
        <section className="content-one">
            <a href="javascript: void(0)" className="title">
                <h3>{props.name.title}</h3>
            </a>
            <div className="post-info clearfix">
                <a href="" className="post-man fl">
                    <img src={'//i1.mopimg.cn/head/'+props.name.userid+'/80x80'} alt=""/>
                    <span>{props.name.username}</span>
                </a>
                <div className="post-count fr">
                    <span className="post-view">
                        <i></i>
                        {props.name.readnum}
                    </span>
                    <span className="post-reply">
                        <i></i>
                        {props.name.replynum}
                    </span>
                </div>
            </div>
        </section>
    )
}

const ContentTwo=(props)=>{
    let jsonObject=strJosn(props.name.imgjs);
    // console.log(props.imgjs)
    
    return(
        <section className="content-one">
        <Link to={'/details/'+props.name.readnum}  className="title">
           
                <h3>{props.name.title}</h3>
                <div className="post-imgs img-preview">
                    <div className="img-wrap">
                        <img src={jsonObject[0].src} alt=""/>
                    </div>
                    <div className="img-wrap">
                        <img src={jsonObject[1].src} alt=""/>
                    </div>
                    <div className="img-wrap">
                        <img src={jsonObject[2].src} alt=""/>
                    </div>
                </div>
           
            </Link>
            <div className="post-info clearfix">
                <a href="" className="post-man fl">
                    <img src={'//i1.mopimg.cn/head/'+props.name.userid+'/80x80'} alt=""/>
                    <span>{props.name.username}</span>
                </a>
                <div className="post-count fr">
                    <span className="post-view">
                        <i></i>
                        {props.name.readnum}
                    </span>
                    <span className="post-reply">
                        <i></i>
                        {props.name.replynum}
                    </span>
                </div>
            </div>
        </section>
    )
}
const strJosn=(data)=>{
    return JSON.parse(data)
}
const ContentThree=(props)=>{
    let jsonObject=strJosn(props.name.imgjs);
    // console.log(props)
    return(
        <section className="content-one single-img">
            <a href="javascript: void(0)" className="title">
                <h3>{props.name.title}</h3>
                <div className="post-img img-preview">
                    <div className="img-wrap">
                        <img src={jsonObject[0].src} alt=""/>
                    </div>
                </div>
            </a>
            <div className="post-info clearfix">
                <a href="" className="post-man fl">
                    <img src={'//i1.mopimg.cn/head/'+props.name.userid+'/80x80'} alt=""/>
                    <span>{props.name.username}</span>
                </a>
                <div className="post-count fr">
                    <span className="post-view">
                        <i></i>
                        {props.name.readnum}
                    </span>
                    <span className="post-reply">
                        <i></i>
                        {props.name.replynum}
                    </span>
                </div>
            </div>
        </section>
    )
}

class Item extends React.Component{
    render() {
        // let {item: item} = this.props;
        let { item } = this.props;
        
        function setItem(item) {
            let imgJs='';
            if(item.imgjs.length>0){
                imgJs=strJosn(item.imgjs);
                if(imgJs===''||imgJs===null){ 
                    return <Content name={item}></Content>;
                }else if(imgJs.length>3){
                    return <ContentTwo name={item}/>;
                }else if(imgJs.length<3){
                    return <ContentThree name={item}/>;
                }
            }
        }
        return (
            <div>
                {
                    setItem(item)
                }
            </div>
        )  
    }
}
    

class List extends React.Component{
    
    render() {
        console.log(this.props)
        return (
            <div>
                    {
                     this.props.listdata.map((item, i) => <Item item={item}/>)
                    }
                   
            </div> 
        )  
    }
}

class ContentIndex extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            listdata: [
                {'url':'javascript:;','title':'推荐','id':'999999'},
                {'url':'javascript:;','title':'热点','id':'100001'},
                {'url':'javascript:;','title':'社会','id':'100002'},
                {'url':'javascript:;','title':'娱乐','id':'100003'},
                {'url':'javascript:;','title':'国际','id':'100004'},
                {'url':'javascript:;','title':'时尚','id':'100005'},
                {'url':'javascript:;','title':'汽车','id':'100006'},
                {'url':'javascript:;','title':'体育','id':'100007'},
                {'url':'javascript:;','title':'军事','id':'100008'},
                {'url':'javascript:;','title':'故事','id':'100009'},
            ],
            click:0,
            width:'',
            left:'',
        };
        this.fleg=true;
        this.numpage=0;
        this.navId="999999";
        this.startCol="";
        this.mirrorId="";
        this.active=this.active.bind(this);
    }
    componentWillMount(){
        console.log(11111111111)
        // this.ajaxcon()
        
      }
    componentDidMount(){
        let $this=this;
        this.ajaxcon({pgNum:0,listId:'999999'});
       this.scrollFun();
       console.log(this.props.match.params.id)
    }

    scrollFun(){
        let distance=600,_this=this;
        window.addEventListener('scroll', function () {
            let scrollTop=document.body.scrollTop || document.documentElement.scrollTop ,
            screenHeight=window.innerHeight,
            domHeight=document.body.clientHeight ;
            if((domHeight-distance)<=(scrollTop+screenHeight)&&_this.fleg){
                _this.fleg=false;
                _this.numpage++;
                _this.ajaxcon({pgNum:_this.numpage,listId:_this.navId})
                console.log(22222222222)
            }
        })
    }

    ajaxcon(obj){
        let _this=this;
        http.listHttp({
            pgnum: obj.pgNum,
            colid: obj.listId,
            pgsize: 20,
            serialnum: '300000',
            startcol: this.startCol||null,
            mirrorid: this.mirrorId||null,
            platform: 'wap',
            qid: '01711',
            uid: '15184108460509177',
          }).then(res=>{
              if(res.data.data.length>0){
                let dataLength=res.data.data.length-1;
                this.mirrorId=res.data.mirrorid;
                this.startCol=res.data.data[dataLength].startcol;
              if(_this.numpage>0){
                _this.setState({data:_this.state.data.concat(res.data.data)});
              }else{
                _this.setState({data:res.data.data});
              }
              _this.fleg=true;
              }
              
            console.log(res.data.data)
          })
    }

    // contdata(){
    //     let datas=this.state.data,
    //     contents=[];
    //     for(let i=0;i<datas.length;i++){
            
    //        if(datas[i].imgjs===''||datas[i].imgjs===null){ 
    //             contents.push(<Content name={datas[i]}></Content>);
    //        }else if(strJosn(datas[i].imgjs).length>3){
    //             contents.push(<ContentTwo name={datas[i]}/>);
    //        }else if(strJosn(datas[i].imgjs)<3){
    //             contents.push(<ContentThree name={datas[i]}/>);
    //        }
    //     }
    //     return contents
    // }

    active(item,i,ele){
        this.setState({
            click:i,
            width:ele.target.offsetWidth
        })
        document.documentElement.scrollTop=0;
        this.mirrorId=null;
        this.startCol=null;
        this.numpage=0;
        let scrollDom=document.querySelector('.navTwo-left'),
        bodyWidth=document.body.clientWidth,
        iLeft=ele.target.offsetLeft,
        iWidth=ele.target.offsetWidth;
        if(iLeft>(bodyWidth/2)){
            scrollDom.scrollLeft=iLeft-(bodyWidth-iWidth)/2;
            this.setState({
                left:iLeft
            })
        }else{
            scrollDom.scrollLeft=0;
            this.setState({
                left:iLeft
            })
        }
        // console.log(document.querySelector('.navTwo-left').scrollLeft=200)
        
        let navData=this.state.listdata;
       for(let i=0;i<navData.length;i++){
            if(navData[i].title===item.title){
                this.navId=navData[i].id;
                this.ajaxcon({
                    pgNum:0,
                    listId:navData[i].id
                })
            }
       }
    }

    render(){
        return (
            <div className="app-h5">
                <div className="nav-flexd">
                    <Header/>
                    <div className="navTwo">
                        <div className="navTwo-left clearfix">
                            {
                                this.state.listdata.map((item,i) => <a href={item.url} onClick={this.active.bind(null, item, i)} className={this.state.click===i?'active':''}>{item.title}</a>)
                            }
                            <i className="tabs-line" style={{left:this.state.left,width:this.state.width}}></i>
                        </div>
                        <div className="navTwo-right">
                            <div></div>
                            <a href="javascript:void(0)">
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <List listdata={this.state.data} />
                </div>
            </div>
        )
    }
}

export default  connect()(ContentIndex);
