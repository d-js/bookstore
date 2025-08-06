import { ProfileStore } from "@/types/types";
import { create } from "zustand";
// TODO 
export const useProfileStore = create<ProfileStore>((set) => ({
  profileData: undefined,
  setProfileData: (currentProfile) => set({ profileData: currentProfile }),
}));
