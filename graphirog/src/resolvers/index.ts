const resolvers = {
  Query: {
    dailyForecasts: async (
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
