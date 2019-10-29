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
      const result = await dataSources.smhiApi.getAllForecasts(
        longitude,
        latitude
      );
      return result;
    }
  }
};

export default resolvers;
