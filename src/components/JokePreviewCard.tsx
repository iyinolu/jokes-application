import React from 'react';

interface JokePreviewCardInterfaces {
  content: string;
  image?: string;
  category: string[];
  datePosted: string;
}

const JokePreviewCard: React.FC<JokePreviewCardInterfaces> = ({
  content,
  image,
  category,
  datePosted,
}) => {
  return (
    <div className="joke-card">
      <div className="joke-card-container">
        <div className="joke-card-top">
          <div>{content}</div>
          <div>{image ? <img src={image} /> : ''}</div>
        </div>
        <div className="joke-card-bottom">
          <div>{datePosted}</div>
          <div>
            {category.map((each, idx) => (
              <span key={idx}>{each}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokePreviewCard;
