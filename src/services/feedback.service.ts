import api from "./api";

const feedbackService = {
  fetchFeedback: (params?, config?): Promise<{ data: any;}> => api.get(`/Feedbacks`, { params, ...config }),

  postFeedback: (data): Promise<{result: any;}> => api.post(`/Feedbacks`, data, {
    headers : {
      'Content-Type' : 'application/json'
    }
  }),

  putFeedback: (data): Promise<{result: any;}> => api.post(`/Feedbacks`, data, {
    headers : {
      'Content-Type' : 'application/json'
    }
  }),
};

export default feedbackService;
