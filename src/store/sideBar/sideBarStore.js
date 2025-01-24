import { create } from "zustand";



const useSideBarStore = create(
  (set) => ({
    showSideBar: false,
    setShowSideBar: (state) => set({showSideBar: state})
  })
)
export default useSideBarStore