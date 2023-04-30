import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

/****************************** Class based component  **************************/
import React, { Component } from 'react'
export class NewsScroll extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number
  }

  webTitle = this.props.category;
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1);
  }

  async loadNews(page){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.loadNews();
  }

  fetchMoreData = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page+1,
      loading: false
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin: "100px 0px 30px 0px"}}>Daily Insight - Top Headlines from {this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1)}</h2>
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element)=>{
                return (
                  <div className="col-md-4">
                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={(this.state.page+1)>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

// import React, { useEffect, useState } from 'react'
// const NewsScroll = (props)=>{
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const webTitle = props.category;
//   document.title = webTitle.charAt(0).toUpperCase() + webTitle.slice(1);
    

//   const loadNews = async(page)=>{
//     props.setProgress(10);
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     setLoading(true);
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     setArticles(parsedData.articles);
//     setTotalResults(parsedData.totalResults);
//     setLoading(false); 
//     props.setProgress(100);
//   }
  
//   useEffect(()=>{
//     loadNews();
//   })

//   const fetchMoreData = async ()=>{
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
//     // setLoading(true);
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setArticles(articles.concat(parsedData.articles));
//     setTotalResults(parsedData.totalResults);
//     setPage(page+1);
//     setLoading(false);
//   }
  
//   return (
//     <div className='container my-3'>
//       <h2 className='text-center' style={{margin: "100px 0px 30px 0px"}}>Daily Insight - Top Headlines from {webTitle.charAt(0).toUpperCase() + webTitle.slice(1)}</h2>
//       {loading && <Spinner />}
      
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length !== totalResults}
//         loader={<Spinner/>}
//       >
//         <div className="container">
//           <div className="row">
//             {articles.map((element)=>{
//               return (
//                 <div className="col-md-4">
//                   <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </InfiniteScroll>

//     </div>
//   )
// }

// NewsScroll.defaultProps = {
//   country: 'in',
//   pageSize: 12,
//   category: 'general'
// }

// NewsScroll.propTypes = {
//   country: PropTypes.string.isRequired,
//   pageSize: PropTypes.number
// }


export default NewsScroll
