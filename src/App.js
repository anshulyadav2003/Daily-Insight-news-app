import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
// import News from './components/News';
import NewsScroll from './components/NewsScroll'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = ()=>{
  const apiKey = process.env.REACT_APP_NEWS_API;

  const pageSize=12;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar
          color='#2ECC71'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>} />
          <Route exact path="/Business" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>} />
          <Route exact path="/Entertainment" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
          <Route exact path="/Health" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>} />
          <Route exact path="/Science" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>} />
          <Route exact path="/Sports" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>} />
          <Route exact path="/Technology" element={<NewsScroll setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>} />
        </Routes>
      </Router>
    </div>
  )
}
export default App



/****************************** Class based component  **************************/
// import React, { Component } from 'react'
// export default class App extends Component {
//   apiKey = process.env.REACT_APP_NEWS_API;

//   pageSize=12;
//   state = {progress: 0};
//   setProgress = (progress)=>{
//     this.setState({progress: progress});
//   }

//   render() {
//     return (
//       <div>
//         <Router>
//           <Navbar/>
//           <LoadingBar
//             color='#2ECC71'
//             height={3}
//             progress={this.state.progress}
//           />
//           <Routes>
//             <Route exact path="/" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>} />
//             <Route exact path="/Business" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>} />
//             <Route exact path="/Entertainment" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
//             <Route exact path="/Health" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>} />
//             <Route exact path="/Science" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>} />
//             <Route exact path="/Sports" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
//             <Route exact path="/Technology" element={<NewsScroll setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
//           </Routes>
//         </Router>
//       </div>
//     )
//   }
// }
