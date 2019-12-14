import { RESTDataSource } from 'apollo-datasource-rest';

export class TrafikverketApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.trafikinfo.trafikverket.se/v1.3/data.json';
  }

  async getLateTrains(fromStation: string, endStation: string) {
    let body = `<REQUEST>
    <LOGIN authenticationkey="21b22aefbd9e4423956327483dfb41d4" />
    <QUERY objecttype="TrainAnnouncement" limit="100" schemaversion="1.3">
        <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
        <INCLUDE>AdvertisedTrainIdent</INCLUDE>
        <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
        <INCLUDE>Canceled</INCLUDE>
        <INCLUDE>ScheduledDepartureDateTime</INCLUDE>
        <INCLUDE>ProductInformation</INCLUDE>
        <INCLUDE>LocationSignature</INCLUDE>
        <INCLUDE>FromLocation.LocationName</INCLUDE>
        <FILTER>
            <AND>
                <EQ name="ActivityType" value="Ankomst" />
                <EQ name="LocationSignature" value="${endStation}" />
                <EQ name="ProductInformation" value="SJ Regional" />
                <ELEMENTMATCH>
                <EQ name="FromLocation.LocationName" value="${fromStation}"/>
                </ELEMENTMATCH>
            </AND>
        </FILTER>
    </QUERY>
  </REQUEST>`;

    const response = await this.post('', body);

    console.log('response', response.RESPONSE.RESULT[0]);

    console.log(response.RESPONSE.RESULT[0].TrainAnnouncement);
    // var parsedResponse = JSON.parse(response);

    // let numOfMinLate =
    //   (new Date(trainInfo.EstimatedTimeAtLocation).getTime() -
    //     new Date(trainInfo.AdvertisedTimeAtLocation).getTime()) /
    //   60000;
    return response;
  }
}
