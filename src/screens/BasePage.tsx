import React, { useState, useEffect, useCallback } from 'react';
import BaseLayout from '../components/Layout';
import Header from '../components/Header';
import JokePreviewCard from '../components/JokePreviewCard';
import jokesServices from '../services/jokes-services';
import { SuccessResponse } from '../services/jokes-services';

function SPA() {
  const [currentJoke, setCurrentJoke] = useState<SuccessResponse>({
    categories: [],
    date: '',
    id: '',
    image: '',
    joke: '',
  });

  const loadRandomJoke = useCallback(() => {
    jokesServices
      .getRandomJoke()
      .then((res) => {
        setCurrentJoke(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadRandomJoke();
  }, [loadRandomJoke]);

  return (
    <BaseLayout>
      <React.Fragment>
        <Header />
        <main className="main">
          <JokePreviewCard
            category={currentJoke.categories}
            content={currentJoke.joke}
            datePosted={currentJoke.date}
            image={currentJoke.image}
          />
        </main>
      </React.Fragment>
    </BaseLayout>
  );
}

export default SPA;
