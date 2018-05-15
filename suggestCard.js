import React from 'react';
import { Button,Card,Image,Container,Icon}from 'semantic-ui-react'
import faker from 'faker';
import './SuggestCard.css'
const fakeUser=Array.apply(null,{length：3}).map((a)=>({avatar:faker.image.avatar(),username:faker.name.finName(),job:faker.name.jobTitle()}))

const userList=fakeUser.map((user,index)=>(
	 <Card key={index} centered raised>
        <Card.Content>
        <div style={{margin:'0 auto' ,width:'60px',height:'60px'}}>
          <img

            style={{ margin: "15px 0", width: '100%', height: '100%',borderRadius: '55px' }}
            src={user.avatar}
          />
          </div>
          <Card.Header style={{ marginTop:'18px',fontSize: "0.9rem" }}>{user.username}<Icon size='large' style={{ marginLeft: '10px' }} color='blue' name='user' /></Card.Header>
          <Card.Meta style={{ fontSize: "0.7rem" }}>
            <span>{user.job}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          
          <Button  size=' mini' primary>关注</Button>
          
        </Card.Content>
      </Card>
))
const SuggestCard =()=>(

	<Container>
    <Card.Group itemsPerRow={3}>
   		
    </Card.Group>
  </Container>

)