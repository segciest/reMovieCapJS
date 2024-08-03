import { http } from "./config";
export const dataPickUp = {
  getData: async () => {
    let { data } = await http.get(`/`);
    return data;
  },
};
