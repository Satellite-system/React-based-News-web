import React from "react";
import defaultImg from "./default_news.jpg";

const NewsItem = (props)=> {
  let { title, discription, imgUrl, newsUrl, date,source } = props;
    return (
      <div className="my-2">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right : '0'
          }}>
            <span className="badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
            
          </div>
          <img src={imgUrl == null ? defaultImg : imgUrl} alt='img'/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription} </p>
            <p>
              <small className="text-muted">
                Last updated {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
