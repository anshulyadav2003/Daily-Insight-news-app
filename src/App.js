import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
// import News from './components/News';
import NewsScroll from './components/NewsScroll'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  
  // apiKey = "fe9b7ad4d0f14f518da6961f30db83ff";

  pageSize=12;
  state = {progress: 0};
  setProgress = (progress)=>{
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#2ECC71'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route exact path="/Business" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>} />
            <Route exact path="/Entertainment" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
            <Route exact path="/Health" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>} />
            <Route exact path="/Science" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>} />
            <Route exact path="/Sports" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
            <Route exact path="/Technology" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}
