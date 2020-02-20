import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import WeatherTable from "../components/WeatherTable"

const uppsalaLong = "17.6389"
const uppsalaLat = "59.8586"

const WEATHER_REPORTS = gql`
  {
    dailyForecasts(longitude: "17.6389", latitude: "59.8586") {
      day
      weekDay
      hours {
        longitude
        latitude
        temperature
        windSpeed
        time
        precipitationCategory
        weatherSymbol
      }
    }
  }
`

export default function WeatherContainer() {
  const { loading, error, data } = useQuery(WEATHER_REPORTS, {
    pollInterval: 1000 * 60 * 30
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return <WeatherTable data={data} />
}
