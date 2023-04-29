import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
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
      page: 1
    }
    document.title = this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1);
  }

  async loadNews(page){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount(){
    this.loadNews();
  }

  handlePrevClick = async ()=>{
    this.loadNews(this.state.page-1);
    this.setState({page: this.state.page-1});
  }
  handleNextClick = async ()=>{
    this.loadNews(this.state.page+1);
    this.setState({page: this.state.page-1});
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin: "35px 0px"}}>Daily Insight - Top Headlines from {this.webTitle.charAt(0).toUpperCase() + this.webTitle.slice(1)}</h2>
        {this.state.loading && <Spinner />}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return (
              <div className="col-md-4">
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sourceName={element.source.name}/>
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={(this.state.page+1)>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
