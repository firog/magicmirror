import React from 'react'
import WeatherContainer from '../containers/WeatherContainer'
import TrainInfoContainer from '../containers/TrainInfoContainer'
import TrainAnnouncmentsContainer from '../containers/TrainAnnouncmentsContainer'
import TodayInfoContainer from '../containers/TodayInfoContainer'

export default function MainContainer({ client }) {
  return (
    <>
      <TodayInfoContainer client={client} />
      <WeatherContainer client={client} />
      <TrainInfoContainer client={client} />
      <TrainAnnouncmentsContainer client={client} />
    </>
  )
}
