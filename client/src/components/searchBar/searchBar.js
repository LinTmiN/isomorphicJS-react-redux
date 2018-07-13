import React from 'react';
import {Search,Dropdown,Ref} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'
class SearchBar extends React.PureComponent{
  constructor(props){
    super(props)
   
    this.state={
      type:this.props.location.pathname.indexOf('image')>=0?'image':'video',
      value:'',
      issearching:false,
      showResult:false
    }
  }
  static getDerivedStateFromProps(props,state){
    if(props.location.pathname==='/search/image'){
        return {type:'image'}
    }else if(props.location.pathname==='/search/video'){return {type:'video'}}
    return null
  }
  render(){
    let {history,issearching,searchKey}=this.props
   let result=typeof searchKey==='undefined'?[]:searchKey.toJS().map((key)=>({title:key}));  
  return (    <React.Fragment>
              <Dropdown
                style={{fontFamily:''}}
                inline
                closeOnBlur={true}
                onChange={(e,data)=>{
                  this.setState({type:data.value})
                                      history.push('/search/'+data.value)
                }
                  
                  

                 }
                options={[
                  { key: "image", text: "image", value: "image" },
                  { key: "video", text: "video", value: "video" }
                ]}
                
                value={this.state.type}
              />    
              <Ref innerRef={(r)=>this.myref=r}> 
              <Search
              loading={issearching}
             
              value={this.state.value}
              onKeyDown={(e)=>{ if(e.keyCode===13){
                  this.props.onPressEnter(this.state.type,this.state.value);
                  history.push('/search/'+this.state.type)
                  this.setState({value:''})
                this.myref.getElementsByTagName('input')[0].blur()
                }

              }
             }
              onSearchChange={(e,{value})=>{
                this.props.onSearchChange(value);
                this.setState({isLoading:true,value:value,issearching:true})
              }}
              onResultSelect={(e,{result})=>{this.props.onConfirmSearch(this.state.type,result.title);this.setState({value:result.title});history.push('/search/'+this.state.type)}}
              results={result}
               
              placeholder='search'
              className='_search'
                size="mini"
                fluid
              >
              </Search>
              </Ref>
            </React.Fragment>
            )
  }
}
export default  withRouter(SearchBar)