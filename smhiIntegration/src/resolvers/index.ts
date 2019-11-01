const resolvers = {
  Query: {
    pointForecast: async (
      _: any,
      {
        longitude,
        latitude,
        hour
      }: { longitude: string; latitude: string; hour: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.smhiApi.getForecast(longitude, latitude, hour);
    },
    pointForecasts: async (
      _: any,
      {
        longitude,
        latitude
      }: { longitude: string; latitude: string; hour: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.smhiApi.getAllForecasts(longitude, latitude);
    },
    lateTrains: async (
      _: any,
      { fromStation, endStation }: { fromStation: string; endStation: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.trafikverketApi.getLateTrains(
        fromStation,
        endStation
      );
    }
  }
};

export default resolvers;
