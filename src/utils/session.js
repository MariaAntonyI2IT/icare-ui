export const setSession = (key,value) => {
  sessionStorage.setItem(key,value);
}

export const getSession = (key) => {
  return sessionStorage.getItem(key);
}


export const deleteSession = (key) => {
  sessionStorage.removeItem(key);
}

export const clearSession = () => {
  sessionStorage.clear();
}

