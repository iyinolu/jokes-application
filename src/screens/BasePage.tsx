import React, { useState, useEffect, useCallback } from 'react';
import BaseLayout from '../components/Layout';
import Header from '../components/Header';
import JokePreviewCard from '../components/JokePreviewCard';
import jokesServices from '../services/jokes-services';
import { SuccessResponse } from '../services/jokes-services';
import CustomTextField from '../components/TextField';
import { toAbsoluteUrl } from '../utils';
import { useJokesCache } from '../hooks/useJokesCache';
import { storageService } from '../services/localstorage-service';
import SelectField from '../components/SelectField';
import { JokeOptions } from '../components/SelectField';

function SPA() {
  const [currentJoke, setCurrentJoke] = useState<SuccessResponse>({
    categories: [],
    date: '',
    id: '',
    image: '',
    joke: '',
  });
  const [jokeCategories, setJokeCategories] = useState<JokeOptions[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const {
    cacheAJoke,
    getPrevCachedJoke,
    getNextCachedJoke,
    cacheStatus,
    getExactCachedJoke,
    resetCache,
  } = useJokesCache();

  useEffect(() => {
    if (selectedCategory) {
      loadRandomJoke();
    }
  }, [selectedCategory]);

  const loadRandomJoke = useCallback(() => {
    jokesServices
      .getRandomJoke(selectedCategory)
      .then((res) => {
        setCurrentJoke(res);
        cacheAJoke(res);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        // TODO: Log & handle error
      });
  }, [selectedCategory]);

  const lookupCategories = useCallback(() => {
    jokesServices
      .getJokeCategories()
      .then((res) => {
        const _options = res.categories.map((option) => {
          return {
            value: option,
            label: `${option[0].toUpperCase()}${option.slice(1)}`,
          };
        });
        setJokeCategories(_options);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        // TODO: Log & handle error
      });
  }, []);

  useEffect(() => {
    lookupCategories();
    storageService.get('__jokes')?.latestIndex &&
    storageService.get('__jokes')?.jokeStack
      ? setCurrentJoke(getExactCachedJoke())
      : loadRandomJoke();
  }, []);

  const onNext = () => {
    cacheStatus.next ? setCurrentJoke(getNextCachedJoke()) : loadRandomJoke();
  };

  const onPrev = () => {
    cacheStatus.prev && setCurrentJoke(getPrevCachedJoke());
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e?.target?.value ?? undefined);
    resetCache();
  };

  return (
    <BaseLayout>
      <React.Fragment>
        <Header />
        <main className="main">
          <div className="app-toolbar">
            <div className="app-toolbar-right">
              <CustomTextField
                placeholder="Seach for a Joke"
                type="text"
                disabled={false}
              />
            </div>
            <div className="app-toolbar-left">
              <SelectField
                placeholder="Choose Joke Category"
                options={jokeCategories}
                onChange={onChangeCategory}
              />
            </div>
          </div>
          <JokePreviewCard
            category={currentJoke?.categories}
            content={currentJoke.joke}
            datePosted={currentJoke.date}
            image={currentJoke.image}
          />
          <div className="app-controls">
            <button
              onClick={onPrev}
              type="button"
              className="jokes-nav-btn prev"
            >
              <img src={toAbsoluteUrl('/assets/arrow-left-copy-2.png')} />
              Prev
            </button>
            <button
              onClick={onNext}
              type="button"
              className="jokes-nav-btn next"
            >
              Next
              <img src={toAbsoluteUrl('/assets/arrow-left-copy.png')} />
            </button>
          </div>
        </main>
      </React.Fragment>
    </BaseLayout>
  );
}

export default React.memo(SPA);
