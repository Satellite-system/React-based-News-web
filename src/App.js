import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App = ()=>{
  const [progress, setProgress] = useState(0);

  // Environment variable to hide My Api_Key automatically added to .gitignore
  const apiKey = process.env.REACT_APP_NEWS_API_KEY3

    return( <div>
      <Router>
        <div>
          <Navbar/>
          <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
          />
          <Switch>  {/* passed unique key each time to force it reroute/reMount */}
            <Route exact path="/science">
              <News setProgress={setProgress}  key='sci' pageSize={9} apiKey={apiKey} country = 'in' category='science'/>
            </Route>
            <Route exact path="/sport">
              <News setProgress={setProgress}  key='spo' pageSize={9} apiKey={apiKey} country = 'in' category='sports'/>
            </Route>
            <Route exact path="/health">
              <News setProgress={setProgress}  key='heal' pageSize={9} apiKey={apiKey} country = 'in' category='health'/>
            </Route>
            <Route exact path="/tech">
              <News setProgress={setProgress}  key='tech' pageSize={9} apiKey={apiKey} country = 'in' category='technology'/>
            </Route>
            <Route exact path="/business">
              <News setProgress={setProgress}  key='bus' pageSize={9} apiKey={apiKey} country = 'in' category='business'/>
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={setProgress}  key='ent' pageSize={9} apiKey={apiKey} country = 'in' category='entertainment'/>
            </Route>
            <Route exact path="/">
              <News setProgress={setProgress}  key='gen' pageSize={9} apiKey={apiKey} country = 'in' category='general'/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    );
}

export default App;
