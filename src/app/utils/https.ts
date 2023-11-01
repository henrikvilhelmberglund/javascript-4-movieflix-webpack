// import { state } from './state';

// export const fetchData = async (endpoint: string, page = 1, criteria: string | undefined = undefined) => {
//   const API_KEY = state.api.key;
//   const API_URL = state.api.baseUrl;

//   let response;
//   if (criteria) {
//     response = await fetch(`${API_URL}${endpoint}?query=${criteria}&api_key=${API_KEY}&language=sv-SE&page=${page}`);
//   } else {
//     response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=sv-SE&page=${page}`);
//   }

//   const data = await response.json();
//   return data;
// };
