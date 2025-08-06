import { API_PATCH_ADD_TO_BAG } from "@/utils/routes/apiRoutes";
import { api } from "./baseUrl";

export const addToCart = async (bookId: number): Promise<void> => {
    console.log(`${API_PATCH_ADD_TO_BAG}/${bookId}`);
  const response = await api.patch(`${API_PATCH_ADD_TO_BAG}/${bookId}`);
  return response.data;
};
