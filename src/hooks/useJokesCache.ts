import { useState, useEffect } from 'react';
import { SuccessResponse } from '../services/jokes-services';
import { storageService } from '../services/localstorage-service';

export const useJokesCache = () => {
  const [storageState, setStorageState] = useState(
    storageService.get('__jokes')
  );

  const [currentIndex, setCurrentIndex] = useState<number>(
    storageService.get('__jokes')?.latestIndex ?? -1
  );

  const [cacheStatus, setCacheStatus] = useState({
    prev: false,
    next: false,
  });

  useEffect(() => {
    if (currentIndex === -1) {
      setCacheStatus({ next: false, prev: false });
      return;
    }
    if (currentIndex <= 0) {
      setCacheStatus((_state) => {
        return { ..._state, prev: false };
      });
    } else {
      setCacheStatus((_state) => {
        return { ..._state, prev: true };
      });
    }

    if (currentIndex === storageState?.jokeStack?.length - 1) {
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
    const _data = {
      ..._currentJokes,
      latestIndex: _currentJokes.jokeStack.length - 1,
    };
    setStorageState(_data);
    storageService.set('__jokes', _data);
    setCurrentIndex((state) => state + 1);
  };

  const getPrevCachedJoke = () => {
    if (cacheStatus.prev) {
      const _index = currentIndex - 1;
      setCurrentIndex((state) => state - 1);
      return updateStorage(_index);
    }
  };

  const getNextCachedJoke = () => {
    if (cacheStatus.next) {
      const _index = currentIndex + 1;
      setCurrentIndex((state) => state + 1);
      return updateStorage(_index);
    }
  };

  const updateStorage = (latestIndex: number) => {
    const _data = { ...storageState, latestIndex: latestIndex };
    setStorageState(_data);
    storageService.set('__jokes', _data);
    const result = storageState.jokeStack[latestIndex];
    return result;
  };

  const getExactCachedJoke = () => {
    return storageState.jokeStack && storageState.jokeStack[currentIndex];
  };

  const resetCache = () => {
    setCacheStatus({ next: false, prev: false });
    setCurrentIndex(-1);
    storageService.removeData('__jokes');
  };

  return {
    cacheAJoke,
    getPrevCachedJoke,
    getNextCachedJoke,
    cacheStatus,
    getExactCachedJoke,
    resetCache,
  };
};
