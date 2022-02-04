import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  
  const capatelize = (title) => {
    title = title.toLowerCase();
    return title[0].toUpperCase() + title.slice(1);
  };
  
  const update = async (pages) => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pages}&pageSize=${props.pageSize}`;
    setLoading(true)
    //Here await method waits for the fetch to complete
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setPage(pages)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
  };
  
  useEffect(() => {
    let title =  props.category === "general" ? "home" : props.category;
      document.title = capatelize(title);
    update(1)
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${Page + 1
    }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    //Here await method waits for the fetch to complete
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setPage(Page+1)
    settotalResults(parsedData.totalResults)
  };

  return (
    <>
      <h1 className="text-center" style={{margin:'10px 0px',marginTop:'60px'}}>
        Top {capatelize(props.category)} Headlines{" "}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    discription={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  pageSize: 1,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
