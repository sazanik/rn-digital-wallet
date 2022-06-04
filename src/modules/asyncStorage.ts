import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);

  try {
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export const setData = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);

  try {
    if (await getData(key)) {
      // @ts-ignore
      await AsyncStorage.mergeItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllData = async () => {
  try {
    for (const key of await AsyncStorage.getAllKeys()) {
      console.log('ALL_STORAGE: ', await getData(key));
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
