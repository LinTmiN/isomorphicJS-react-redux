import React from 'react';
import {Button,Card,Icon}from 'semantic-ui-react'
import faker from 'faker';
import './suggestCard.css'
const fakeUser=Array.apply(null,{length:3}).map((a)=>({avatar:faker.image.avatar(),username:faker.name.findName(),job:faker.name.jobTitle()}))

const userList=fakeUser.map((user,index)=>(
 <div key={index} className={'mygrid'}>
	 <Card className='mcard' key={index} centered raised>
        <Card.Content>
        <div className='sc1'>
          <img
            className='sc2'
            alt={'user avatar'}
            src={user.avatar}
          />
          </div>
          <Card.Header style={{ marginTop:'18px',fontSize: "0.9rem" }}>{user.username}<Icon size='large' style={{ marginLeft: '10px' }} color='blue' name='user' /></Card.Header>
          <Card.Meta style={{ fontSize: "0.7rem" }}>
            <span>{user.job}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          
          <Button  size='mini' primary>关注</Button>
          
        </Card.Content>
      </Card>
    </div>
))
const SuggestCard =()=>(
  <div className='_sgc1'>
  <h1> Discover People<span>See All</span></h1>
   <div className='sc6'>
   
   	{userList}
   </div>
 </div>

  


)
export default SuggestCard