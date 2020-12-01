import React from 'react';
import './Article-tile.css';


function ArticleTile (props) {
//   console.log(props.article.image,'ARTICLE TILE IMAGE');
  //   console.log(props.article.source,'ARTICLE TILE SOURCE');
  //   console.log(props.article.link,'ARTICLE TILE LINK');
  const link = props.article.link;

  const ShareClick = () => {
    console.log(props.article, 'CLICK!');
    props.setMenuState(true);
    props.setSelectedStory(props.article);
  };

  return (
    <div className="ArticleTileWrapper">
      <p className="ArticleTileSource">{props.article.source}</p>
      <a href={link} className="StoryAttribute">
        <div className="RowOne">
          <div className="TextOne">
            <h2 className="ArticleTileTitle">{props.article.title}</h2>
          </div>
          <img src={props.article.image} alt={props.article.subtitle} className="ArticleTileImage"></img>
        </div>
        {/* <p>{props.article.subtitle}</p> */}
      </a>
      <div className="RowTwo">
        <p className="ArticleTileTime">{props.article.time}</p>
        <button onClick={ShareClick} className="SocialButton">Social</button>
      </div>
    </div>
  );
}

export default ArticleTile;
