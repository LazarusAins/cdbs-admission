import { useEffect, useState } from "react"
import { axiosInstance } from "../lib/axiosInstance"
import axios from "axios"

const useFetchProvince = () => {
  const [provinces, setProvinces] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchProvince = async () => {
    console.log("FETCHING PROVINCE")
    console.count()
    setIsFetching(true)
    try{
      const response = await axios.get("https://api.lbcx.ph/v1/locations/countries/PH/provinces")

      if (response && response.data) {
        const resultData = response?.data?.data.map((province) => ({
          name: province.name,
          id: province.id,
        }));
        setProvinces(resultData); // Replace the state directly with new data
      }
    }catch (error){
      console.log("ERROR WHILE FETCHING PROVINCES: ", error)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {

      if(provinces.length <= 0){
        handleFetchProvince()
      }

  },[])

  return [provinces, isFetching]
}

export default useFetchProvince




// export const useFetchBaranggay = (id) => {
//   const [baranggays, setBaranggays] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);

//   const fetchBaranggays = async () => {
//     setIsFetching(true);
//     setBaranggays([]);
//     let nextPageUrl = `https://api.lbcx.ph/v1/locations/cities/${id}/district`;

//     try {
//       while (nextPageUrl) {
//         const response = await axiosInstance.get(nextPageUrl);
//         const resultData = response.data.data.map((barangay) => ({
//           name: barangay.name,
//           id: barangay.id,
//         }));
//         setBaranggays((prev) => [...prev, ...resultData]);
//         nextPageUrl = response.data.next_page_url 
//           ? `https://api.lbcx.ph/v1${response.data.next_page_url}` 
//           : null;
//       }
//     } catch (error) {
//       console.error("Error fetching barangays:", error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchBaranggays();
//     }
//   }, [id]);

//   return [baranggays, isFetching];
// };