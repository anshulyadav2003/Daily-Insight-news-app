import React from 'react'

const NewsItem = (props)=>{
  let {title, description, imgUrl, newsUrl, author, date, sourceName} = props;
  return (
    <div className='my-3'>
      <div className="card">
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author ? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-primary">Read more</a>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
            {sourceName}
          </span>
        </div>
      </div>
    </div>
  )
}


/****************************** Class based component  **************************/
// import React, { Component } from 'react'
// export class NewsItem extends Component {
//   render() {
//     let {title, description, imgUrl, newsUrl, author, date, sourceName} = this.props;
//     return (
//       <div className='my-3'>
//         <div className="card">
//           <img src={imgUrl} className="card-img-top" alt="..."/>
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}</p>
//             <p className="card-text"><small className="text-body-secondary">By {author ? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
//             <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-primary">Read more</a>
//             <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
//               {sourceName}
//             </span>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

export default NewsItem
