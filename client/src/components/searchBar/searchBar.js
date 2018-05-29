import React from 'react';
import {Search,Dropdown} from 'semantic-ui-react';


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
    initType,
    history
})=>{
  
  var result
    typeof searchKey==='undefined'?result=[]:result=searchKey.toJS().map((key)=>({title:key.Txt}));  
      let type=history.location.pathname.slice(8,13)||'video'
       console.log(type)
       initType(type)
	return (    <React.Fragment>
              <Dropdown
                style={{fontFamily:''}}
                inline
                closeOnBlur={true}
                onChange={(e,data)=>{
                  history.push('/search/'+data.value)
                  onTypeChange(e,data)}}
                options={[
                  { key: "image", text: "image", value: "image" },
                  { key: "video", text: "video", value: "video" }
                ]}
                value={type}
              />     
              <Search
              loading={issearching}
              onBlur={onBlur}
              value={searchvalue}
              onKeyDown={(e)=>{onPressEnter(e,history)}}
              onSearchChange={onSearchChange}
              onResultSelect={onConfirmSearch}
              open={resultsShow}
              results={result}
              onClick={onBlur}
              placeholder='search'
              className='_search'
                size="mini"
                fluid
              >
              </Search>
            </React.Fragment>
            )
	}
export default  SearchBar