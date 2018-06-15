import React from 'react';
import { Form,Segment,Button,Message,Grid,Container,Header} from 'semantic-ui-react';
import './loginBox.css';
 
const LoginBox = ({
  email,
  password,
  avatar,
  isLoging,
  isRegister,
  onChangeInput,
  authType,
  onLoginSubmit,
  onRegisterSubmit,
  onSwitchType,
  loginError
})=>{
 
const loginForm=(  
 <React.Fragment>
  <Form  error size="large">
    <Segment stacked>
      <Header as='h1' style={{margin:'25px',fontFamily:`'Pacifico','cursive'`}}>ReduxTube</Header>
   {loginError===''?'':<Message
       error
       header='Action Forbidden'
       content={loginError}
     />}
      <Form.Input
        onChange={onChangeInput}
        fluid
        icon="mail"
        iconPosition="left"
        placeholder="Enter email"
      />
      <Form.Input
        fluid
        onChange={onChangeInput}
        icon="lock"
        iconPosition="left"
        placeholder="Enter Password"
        type="password"
      />
      <Button loading={isLoging} onClick={onLoginSubmit} fluid primary size="tiny">
        Login
      </Button>
      
      <Button color='black' style={{marginTop:'15px'}} loading={false} fluid size='tiny'> 
        忘记密码？ 
      </Button>               
    </Segment>
  </Form>
  <Message>
    New to us? <span style={{color:'#5070FF',cursor:'pointer'}} onClick={onSwitchType('register')}>Sign Up</span >
  </Message>

</React.Fragment>
)
const registerForm =(
    <React.Fragment>
    <Form size="large">
      <Segment stacked>
        <Header as='h1' style={{margin:'25px',fontFamily:"'Pacifico','cursive'"}}>ReduxTube</Header>

        <Form.Input
          fluid

          onChange={onChangeInput}
          icon="user"
          iconPosition="left"
          placeholder="Enter username"
          type="text"
        />
        <Form.Input
          onChange={onChangeInput}
          fluid
          icon="mail"
          iconPosition="left"
          placeholder="Enter email"
          input={''}
        />
        <Form.Input
          fluid
          onChange={onChangeInput}
          icon="lock"
          iconPosition="left"
          placeholder="Enter Password"
          type="password"
        />

        <Button loading={isRegister} onClick={onRegisterSubmit} fluid primary size="tiny">
          Register
        </Button>              
      </Segment>
    </Form>
      <Message>
        Has account? <span style={{color:'#5070FF',cursor:'pointer'}} href='#' onClick={onSwitchType('login')}>Login In</span >
      </Message>
  </React.Fragment>
  )

  return (
    <Container text style={{ marginTop: "7em" }}>

      <Header as="h1">ReduxTube find your favorite img</Header>
      <Grid>
      <Grid.Column only='computer'> 
      <p>find your favorite image and video,dont forget to collect your favorite image</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>
      </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column  only='computer tablet' tablet={8} width={8}>
           <div relaxed='vary' className='HomeBackground'>
             <div className='Homeimg'>
               
             </div>
           </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            {authType ==='register'?registerForm:loginForm}
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
    )
}
 
export default LoginBox;
   