import { useState, useEffect } from 'react';
import { SuccessResponse } from '../services/jokes-services';
import { storageService } from '../services/localstorage-service';

export const useJokesCache = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(
    storageService.get('__jokes')?.latestIndex ?? -1
  );

  const [cacheStatus, setCacheStatus] = useState({
    prev: false,
    next: false,
  });

  useEffect(() => {
    if (currentIndex <= 0) {
      setCacheStatus((_state) => {
        return { ..._state, prev: false };
      });
    } else {
      setCacheStatus((_state) => {
        return { ..._state, prev: true };
      });
    }

    if (currentIndex === storageService.get('__jokes')?.jokeStack.length - 1) {
      setCacheStatus((_state) => {
        return { ..._state, next: false };
      });
    } else {
      setCacheStatus((_state) => {
        return { ..._state, next: true };
      });
    }
  }, [currentIndex]);

  const cacheAJoke = (joke: SuccessResponse) => {
    let _currentJokes = storageService.get('__jokes');
    if (!_currentJokes) {
      _currentJokes = { jokeStack: [joke] };
    } else {
      _currentJokes.jokeStack.push(joke);
    }
    storageService.set('__jokes', {
      ..._currentJokes,
      latestIndex: _currentJokes.jokeStack.length - 1,
    });
    setCurrentIndex((state) => state + 1);
  };

  const getPrevCachedJoke = () => {
    const _jokeStack = storageService.get('__jokes');
    if (cacheStatus.prev) {
      const _index = currentIndex - 1;
      setCurrentIndex((state) => state - 1);
      // Keep track of current index incase of page reload.
      storageService.set('__jokes', { ..._jokeStack, latestIndex: _index });
      const result = storageService.get('__jokes').jokeStack[_index];
      return result;
    }
  };

  const getNextCachedJoke = () => {
    const _jokeStack = storageService.get('__jokes');
    if (cacheStatus.next) {
      const _index = currentIndex + 1;
      setCurrentIndex((state) => state + 1);
      // Keep track of current index incase of page reload.
      storageService.set('__jokes', { ..._jokeStack, latestIndex: _index });
      const result = storageService.get('__jokes').jokeStack[_index];
      return result;
    }
  };

  const getExactCachedJoke = () => {
    return storageService.get('__jokes').jokeStack[currentIndex];
  };

  return {
    cacheAJoke,
    getPrevCachedJoke,
    getNextCachedJoke,
    cacheStatus,
    getExactCachedJoke,
  };
};
