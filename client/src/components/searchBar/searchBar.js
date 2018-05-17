import React from 'react';
import {Search,Dropdown,Label} from 'semantic-ui-react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const SearchBar =({
    issearching,
    searchtype,
    searchvalue,
    onBlur,
    searchKey,
    onTypeChange,
    onSearchChange,
    onConfirmSearch,
    onPressEnter,
    resultsShow,
    history,
})=>{
  
  var result
    typeof searchKey==='undefined'?result=[]:result=searchKey.toJS().map((key)=>({title:key.Txt}));
   
	return ( <div style={{width:'100%'
          }} >

              <Dropdown
          
                inline
                onChange={(e,data)=>{
                  history.push('/'+data.value)
                  onTypeChange(e,data)}}
                options={[
                  { key: "image", text: "image", value: "image" },
                  { key: "video", text: "video", value: "video" }
                ]}
                defaultValue={
                  [{ key: "video", text: "video", value: "video" }][0].value
                }
              />

              
  
 

       
              <Search
              loading={issearching}
              onBlur={onBlur}
              value={searchvalue}
              onKeyDown={onPressEnter}
              onSearchChange={onSearchChange}
              onResultSelect={onConfirmSearch}
              open={resultsShow}
              results={result}
              // resultRenderer={({title})=><Label content={title}/>}
              onClick={onBlur}
              placeholder='search'
                style={{ margin: "0 auto", marginTop: "5px" }}
                size="mini"
                fluid
              >
              </Search>
            </div>
            )
	}
export default  SearchBar