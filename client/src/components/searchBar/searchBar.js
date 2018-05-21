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
    history,
    match,
    initType
})=>{
  
  var result
    typeof searchKey==='undefined'?result=[]:result=searchKey.toJS().map((key)=>({title:key.Txt}));
    initType(history.location.pathname.slice(1))
	return (    <React.Fragment>
              <Dropdown
                style={{fontFamily:''}}
                inline
                onChange={(e,data)=>{
                  history.push('/'+data.value)
                  onTypeChange(e,data)}}
                options={[
                  { key: "image", text: "image", value: "image" },
                  { key: "video", text: "video", value: "video" }
                ]}
                defaultValue={
                  [{ key:history.location.pathname.slice(1), text:history.location.pathname.slice(1), value:history.location.pathname.slice(1) }][0].value
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
              className='_search'
                size="mini"
                fluid
              >
              </Search>
            </React.Fragment>
            )
	}
export default  SearchBar