import React from 'react';
import MainBar from '../mainBar';
import SuggestCard from '../suggestCard'

import { Container,Grid} from 'semantic-ui-react'
import ImgExplore from '../../containers/imgExploreContainer'
import './sf.css'
const MainPage=()=>(
      <div>

      	<MainBar/>
    

      	<SuggestCard/>
      	<ImgExplore/>
 
        
      </div>

)
export default MainPage