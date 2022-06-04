import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { RootRouter } from './src/screens/RootRouter';
import { ActionsTypes } from './src/constants/ActionsTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { getData } from './src/modules/asyncStorage';
import { mainReducer } from './src/reducers/mainReducer';
import { AppContext, initialState } from './src/modules/context';
import { StorageKeys } from './src/constants/StorageKeys';
import { Loader } from './src/components/Loader';
import { State } from './src/models/State';

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData(StorageKeys.STATE).then((data: State) => {
      if (!data?.activeScreen) {
        dispatch({
          type: ActionsTypes.SET_STATE,
          payload: { ...data, activeScreen: 'Home' },
        });
      } else {
        dispatch({ type: ActionsTypes.SET_STATE, payload: data });
      }
    });
  }, []);

  useEffect(() => {
    if (state?.activeScreen) {
      setLoading(false);
    }
  }, [state?.activeScreen]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GestureHandlerRootView style={styles.root}>
        {isLoading ? <Loader /> : <RootRouter />}
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
