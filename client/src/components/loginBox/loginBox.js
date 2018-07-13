import React from 'react';
import { Icon,Segment,Button,Message,Grid,Container,Header} from 'semantic-ui-react';
import './loginBox.css';
import MyInput from './input'
 class LoginForm extends React.Component{
   constructor(props){
    super(props)
    this.state={focus:false,type:'password',password:'',}
   }
   render=()=>{
    let {loginError,onChangeInput,isLoging,onLoginSubmit,onSwitchType}=this.props
    return (<React.Fragment>
    <form  onKeyDown={(e)=>{if(e.keyCode===13){console.log(e);onLoginSubmit()}}} >
    <Segment className='_mysegment' stacked>
      <Header as='h1' style={{fontWeight:'normal',fontSize:'38px',margin:'25px',fontFamily:"'Eater','cursive'"}}>lifecams</Header>
   
      <MyInput  placeholder={'邮箱、用户名'} value={this.props.email} inputType={'text'} onChange={(e)=>{onChangeInput(e,'email')}} />
      <MyInput passwordShowhide placeholder={'密码'} value={this.props.password} inputType={'password'} onChange={(e)=>{onChangeInput(e,'password')}} />
      <Button disabled={this.props.email.length===0?true:false} type='button' loading={isLoging} onClick={onLoginSubmit} fluid primary size="tiny">
        登陆
      </Button>
      {loginError?<div style={{color:'#ed4956',fontSize:"14px",margin:'5px'}}>{loginError}</div>:""}
      <Button type='button' style={{marginTop:'15px',background:"white"}} loading={false} fluid size='tiny'> 
        忘记密码？ 
      </Button>

    </Segment>
  </form>
  <Message className='_message'>
    没有账号? <span style={{color:'#5070FF',cursor:'pointer'}} onClick={onSwitchType('register')}>注册</span >
  </Message>

</React.Fragment>)
    }
 };
 class RegisterForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showEmail:false,
      showUsername:false,
      showPassword:false,
      
      
    }
  }

  render(){
    let {validate,validateInfo,onChangeInput,isRegister,onRegisterSubmit,onSwitchType,loginError}=this.props;

    return (
    
    <React.Fragment>
    <form >
      <Segment className='_mysegment' stacked>
      
        <Header as='h1' style={{fontWeight:'normal',fontSize:'38px',margin:'25px',fontFamily:"'Eater','cursive'"}}>lifecams</Header>
          <p style={{color:'#999',fontSize:"13px",fontWeight:'600'}}>注册 lifecams，分享精彩视界</p>
         <MyInput icon={
          this.state.showEmail?
          (<Icon color={"email" in validateInfo.err?"red":'green'} style={{lineHeight:'36px',fontWeight:"normal",height:'100%'}} size='big' name={"email" in validateInfo.err?'remove circle':'check circle'}/>):null
        }  onBlur={()=>{validate().then((data)=>this.setState({showEmail:true}))}}  placeholder={'邮箱'} value={this.props.email} inputType={'text'} onChange={(e)=>{onChangeInput(e,'email')}} />
        <MyInput icon={
          this.state.showUsername?
          (<Icon color={"username" in validateInfo.err?"red":'green'} style={{lineHeight:'36px',fontWeight:"normal",height:'100%'}} size='big' name={"username" in validateInfo.err?'remove circle':'check circle'}/>):null
        }  onBlur={()=>{validate().then((data)=>this.setState({showUsername:true}))}} placeholder={'用户名'} value={this.props.username} inputType={'text'} onChange={(e)=>{onChangeInput(e,'username')}} />
       
        <MyInput passwordShowhide icon={
          this.state.showPassword?
          (<Icon color={"password" in validateInfo.err?"red":'green'} style={{lineHeight:'36px',fontWeight:"normal",height:'100%'}} size='big' name={"password" in validateInfo.err?'remove circle':'check circle'}/>):null
        }  onBlur={()=>{validate().then((data)=>this.setState({showPassword:true}))}}  placeholder={'密码'} value={this.props.password} inputType={'password'} onChange={(e)=>{onChangeInput(e,'password')}} />

        <Button type='button' disabled={this.state.disabled} loading={isRegister} onClick={()=>{onRegisterSubmit().then(()=>{
          this.setState({
            showEmail:true,
            showPassword:true,
            showUsername:true
          })
        })}} fluid primary size="tiny">
          注册
        </Button>
        {loginError?<div style={{color:'#ed4956',fontSize:"14px",margin:'5px'}}>{loginError}</div>:""}
        <p className='_tiaokuan'>注册即表示你同意接受我们的 <span>条款</span> 、 <span>数据使用政策</span> 和 <span>Cookie 政策</span> 。</p>              
      </Segment>
    </form>
      <Message className='_message'>
        有账号了? <span style={{color:'#5070FF',cursor:'pointer'}} href='#' onClick={onSwitchType('login')}>请登录</span >
      </Message>
  </React.Fragment>
  )
 
  }
}
const LoginBox = ({
  email,
  username,
  password,
  validate,
  isLoging,
  isRegister,
  onChangeInput,
  authType,
  onLoginSubmit,
  onRegisterSubmit,
  onSwitchType,
  loginError,
  validateInfo
})=>{
 

  return (
    <Container text style={{ marginTop: "25px" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column  only='computer tablet' tablet={8} width={8}>
           <div relaxed='vary' className='HomeBackground'>
             <div className='Homeimg'>
               
             </div>
           </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            {authType ==='register'?<RegisterForm validateInfo={validateInfo} validate={validate} email={email} loginError={loginError}  username={username} onChangeInput={onChangeInput} isRegister={isRegister} onRegisterSubmit={onRegisterSubmit} password={password} onSwitchType={onSwitchType} />:<LoginForm email={email} password={password} isLoging={isLoging} onChangeInput={onChangeInput} onLoginSubmit={onLoginSubmit} onSwitchType={onSwitchType}  loginError={loginError}/>}
            <div className='_download'>
              <p>下载应用</p>
              <div className='_downloadsrc'>
              <img alt='google brand' src='/uploads/homepage/gg.png'/>
              <img alt='appstore brand' src='/uploads/homepage/ap.png'/>
                <img alt='microsoft brand' src='/uploads/homepage/mc.png'/>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
    )
}
 
export default LoginBox;
   