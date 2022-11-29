import api from "./api";

const satisfactionService = {
  fetchSatisfaction: (selectedSatisfaction, params?, config?): Promise<{ data: any;}> => api.get(`/Satisfactions/${selectedSatisfaction}`, { params, ...config }),

  postSatisfaction: (data): Promise<{result: any;}> => api.post(`/Satisfactions`, data, {
    headers : {
      'Content-Type' : 'application/json'
    }
  }),

  putSatisfaction: (id, data): Promise<{result: any;}> => api.put(`/Satisfactions/${id}`, data, {
    headers : {
      'Content-Type' : 'application/json'
    }
  }),
};

export default satisfactionService;
