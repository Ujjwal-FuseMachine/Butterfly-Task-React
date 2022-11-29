import api from "./api";

const questionService = {
  fetchQuestions: (params?, config?): Promise<{ data: any;}> => api.get(`/Questions`, { params, ...config }),
};

export default questionService;
