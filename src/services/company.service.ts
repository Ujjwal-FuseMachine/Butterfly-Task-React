import api from "./api";

const companyService = {
  fetchCompany: (params?, config?): Promise<{ data: any;}> => api.get(`/Companies`, { params, ...config }),
};

export default companyService;
