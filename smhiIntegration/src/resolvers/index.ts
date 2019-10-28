const resolvers = {
  Query: {
    pointForecast: async (
      _: any,
      {
        longitude,
        latitude,
        time
      }: { longitude: string; latitude: string; time: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.smhiApi.getForecast(longitude, latitude, time);
    },
    pointForecasts: async (
      _: any,
      { longitude, latitude }: { longitude: string; latitude: string },
      { dataSources }: { dataSources: any }
    ) => {
      const result = await dataSources.smhiApi.getAllForecasts(
        longitude,
        latitude
      );
      return result;
    }
  }
};

export default resolvers;
