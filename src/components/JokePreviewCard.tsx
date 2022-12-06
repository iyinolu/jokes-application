import React from 'react';
interface JokePreviewCardInterfaces {
  content: string;
  image?: string;
  category: string[];
  datePosted: string;
}

const JokePreviewCard: React.FC<JokePreviewCardInterfaces> = ({
  content,
  category,
  datePosted,
}) => {
  return (
    <div className="joke-card">
      <div className="joke-card-container">
        <div className="joke-card-top">
          <div className="joke-card-content">{content}</div>
        </div>
        <div className="joke-card-bottom">
          <div>{datePosted}</div>
          <div>
            {category.length ? (
              category.map((each, idx) => (
                <div className="category-tag" key={idx}>
                  <p>{`${each[0].toUpperCase()}${each.slice(1)}`}</p>
                </div>
              ))
            ) : (
              <div className="category-tag">
                <p>Uncategorized</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokePreviewCard;
