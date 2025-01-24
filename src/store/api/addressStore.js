import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../../lib/axiosInstance";

const useAddressStore = create((set) => ({
  provinces: [],
  cities: [],
  baranggays: [],
  isFetching: false,

  handleFetchProvinces: async () => {
    console.log("FETCHING PROVINCE");
    console.count();
    set({ isFetching: true });
    try {
      const response = await axios.get(
        "https://api.lbcx.ph/v1/locations/countries/PH/provinces"
      );

      if (response && response.data) {
        const resultData = response?.data?.data.map((province) => ({
          name: province.name,
          id: province.id,
        }));
        set({ provinces: resultData }); // Replace the state directly with new data
      }
    } catch (error) {
      console.log("ERROR WHILE FETCHING PROVINCES: ", error);
    } finally {
      set({ isFetching: false });
    }
  },

  handleFetchCities: async (id) => {
    console.log("FETCHING CITIES");
    console.count();
    set({ isFetching: true });
    try {
      const response = await axios.get(
        `https://api.lbcx.ph/v1/locations/provinces/${id}/cities`
      );

      console.log(response.data);
      if (response) {
        const resultData = response.data?.data.map((city) => ({
          name: city["name"],
          id: city["id"],
        }));
        set({ cities: resultData });
      }
    } catch (error) {
      console.log("ERROR WHILE FETCHING PROVINCES: ", error);
    } finally {
      set({ isFetching: false });
    }
  },

  handleFetchBaranggays: async (id) => {
    set({ isFetching: true }); // Set fetching state to true
    set({ baranggays: [] }); // Reset barangays before fetching

    let nextPageUrl = `https://api.lbcx.ph/v1/locations/cities/${id}/district`;

    try {
      while (nextPageUrl) {
        const response = await axios.get(nextPageUrl);

        const resultData = response.data.data.map((barangay) => ({
          name: barangay.name,
          id: barangay.id,
        }));

        set((state) => ({
          baranggays: [...state.baranggays, ...resultData], // Append to the existing list
        }));

        // Update nextPageUrl if there is a next page
        nextPageUrl = response.data.next_page_url
          ? `https://api.lbcx.ph/v1${response.data.next_page_url}`
          : null;
      }
    } catch (error) {
      console.error("Error fetching barangays:", error);
    } finally {
      set({ isFetching: false }); // Reset fetching state to false
    }
  },
}));

export default useAddressStore;
