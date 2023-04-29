import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News = (props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const webTitle = props.category;
  document.title = webTitle.charAt(0).toUpperCase() + webTitle.slice(1);

  const loadNews = async(page)=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }

  useEffect(()=>{
    loadNews()
  }, []);

  const handlePrevClick = async ()=>{
    loadNews(page-1);
    setState({page: page-1});
  }
  const handleNextClick = async ()=>{
    loadNews(page+1);
    setState({page: page-1});
  }

  return (
    <div className='container my-3'>
      <h2 className='text-center' style={{margin: "35px 0px"}}>Daily Insight - Top Headlines from {webTitle.charAt(0).toUpperCase() + webTitle.slice(1)}</h2>
      {loading && <Spinner />}
      
      <div className="row">
        {!loading && articles.map((element)=>{
          return (
            <div className="col-md-4">
              <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
            </div>
          )
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <button disabled={(page+1)>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number
}

export default News



/****************************** Class based component  **************************/
// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 12,
//     category: 'general'
//   }

//   static propTypes = {
//     country: PropTypes.string.isRequired,
//     pageSize: PropTypes.number
//   }

//   webTitle = this.props.category;
//   constructor(props){
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1
//     }
//     document.title = this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1);
//   }

//   async loadNews(page){
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
//     this.setState({loading: true});
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false
//     });
//   }

//   async componentDidMount(){
//     this.loadNews();
//   }

//   handlePrevClick = async ()=>{
//     this.loadNews(this.state.page-1);
//     this.setState({page: this.state.page-1});
//   }
//   handleNextClick = async ()=>{
//     this.loadNews(this.state.page+1);
//     this.setState({page: this.state.page-1});
//   }

//   render() {
//     return (
//       <div className='container my-3'>
//         <h2 className='text-center' style={{margin: "35px 0px"}}>Daily Insight - Top Headlines from {this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1)}</h2>
//         {this.state.loading && <Spinner />}
        
//         <div className="row">
//           {!this.state.loading && this.state.articles.map((element)=>{
//             return (
//               <div className="col-md-4">
//                 <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
//               </div>
//             )
//           })}
//         </div>
//         <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//           <button disabled={(this.state.page+1)>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div>
//       </div>
//     )
//   }
// }

