import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { RootRouter } from './src/screens/RootRouter';
import { ActionsTypes } from './src/constants/ActionsTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { getAllData, getData } from './src/modules/asyncStorage';
import { mainReducer } from './src/reducers/mainReducer';
import { AppContext, initialState } from './src/modules/context';
import { StorageKeys } from './src/constants/StorageKeys';

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData(StorageKeys.STATE).then(data => {
      setLoading(false);
      dispatch({ type: ActionsTypes.SET_STATE, payload: data });
    });
  }, []);

  useEffect(() => {
    getAllData();
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GestureHandlerRootView style={styles.root}>
        {!isLoading && <RootRouter />}
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
