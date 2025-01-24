import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const useFetchCities = ({id}) => {
  const [cities, setCities] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchCities = async () => {
    console.log("FETCHING CITIES")
    console.count()
    setIsFetching(true)
    try{
      const response = await axios.get(`https://api.lbcx.ph/v1/locations/provinces/${id}/cities`)

      console.log(response.data)
      if(response) {
        const resultData = response.data?.data.map((city) => ({
          name: city["name"],
          id: city["id"],
        }));
        setCities(() => [...resultData]);
      }
    }catch (error){
      console.log("ERROR WHILE FETCHING PROVINCES: ", error)
    } finally {
      setIsFetching(false)
    }
  }

  const refetchCities = useCallback(() => {
    handleFetchCities()
  }, [id])

  useEffect(() => {
    if(cities.length <= 0){
      handleFetchCities()
    }
  },[id])

  return [cities, isFetching, refetchCities]
}


export default useFetchCities