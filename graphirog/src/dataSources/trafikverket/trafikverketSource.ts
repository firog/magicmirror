import { RESTDataSource } from 'apollo-datasource-rest';

export class TrafikverketApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.trafikinfo.trafikverket.se/v1.3/data.json';
  }

  token = '21b22aefbd9e4423956327483dfb41d4';

  mapLocation = location => {
    switch (location) {
      case 'Cst':
        return 'Stockholm';
      case 'U':
        return 'Uppsala';
    }
  };

  formatTime = time => {
    const date = new Date(time);
    let hours = date.getUTCHours() + 1;
    let minutes = date.getUTCMinutes();

    let hourString;
    let minuteString;

    if (hours < 10) {
      hourString = '0' + hours.toString();
    } else {
      hourString = hours.toString();
    }

    if (minutes < 10) {
      minuteString = '0' + minutes.toString();
    } else {
      minuteString = minutes.toString();
    }

    return hourString + ':' + minuteString;
  };

  async getTrainAnnouncments(station: string) {
    let body = `
    <REQUEST>
      <LOGIN authenticationkey="${this.token}" />
      <QUERY objecttype="TrainMessage" schemaversion="1.3">
        <FILTER>
              <EQ name="AffectedLocation" value="${station}" />
        </FILTER>
        <INCLUDE>StartDateTime</INCLUDE>
        <INCLUDE>LastUpdateDateTime</INCLUDE>
        <INCLUDE>ExternalDescription</INCLUDE>
        <INCLUDE>ReasonCodeText</INCLUDE>
      </QUERY>
    </REQUEST>
    `;

    const response = await this.post('', body);

    console.log(response.RESPONSE.RESULT);

    const trainAnnouncments = response.RESPONSE.RESULT[0].TrainMessage;

    const trainAnnouncmentsMapped = trainAnnouncments.map(announcement => {
      return {
        reasonCodeText: announcement.ReasonCodeText,
        startDateTime: announcement.StartDateTime,
        lastUpdatedDateTime: announcement.LastUpdateDateTime,
        description: announcement.ExternalDescription
      };
    });

    return trainAnnouncmentsMapped;
  }

  async getLateTrains(fromStation: string, endStation: string) {
    let body = `
    <REQUEST>
    <LOGIN authenticationkey="${this.token}" />
    <QUERY objecttype="TrainAnnouncement" limit="4" schemaversion="1.3" orderby="AdvertisedTimeAtLocation">
            <FILTER>
                  <AND>
                        <EQ name="ActivityType" value="Avgang" />
                        <EQ name="LocationSignature" value="${fromStation}" />
                        <EQ name="ToLocation.LocationName" value="${endStation}"/>
                        <EQ name="ProductInformation" value="SJ Regional"/>
                        <OR>
                              <AND>
                                    <GT name="AdvertisedTimeAtLocation" value="$dateadd(-00:15:00)" />
                                    <LT name="AdvertisedTimeAtLocation" value="$dateadd(14:00:00)" />
                              </AND>
                              <AND>
                                    <LT name="AdvertisedTimeAtLocation" value="$dateadd(00:30:00)" />
                                    <GT name="EstimatedTimeAtLocation" value="$dateadd(-00:15:00)" />
                              </AND>
                        </OR>
                  </AND>
            </FILTER>
            <INCLUDE>AdvertisedTrainIdent</INCLUDE>
            <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
            <INCLUDE>TrackAtLocation</INCLUDE>
            <INCLUDE>ToLocation</INCLUDE>
            <INCLUDE>ProductInformation</INCLUDE>
            <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
            <INCLUDE>LocationSignature</INCLUDE>
            <INCLUDE>Deviation</INCLUDE>
      </QUERY>
</REQUEST>`;

    const response = await this.post('', body);

    const trainAnnouncments = response.RESPONSE.RESULT[0].TrainAnnouncement;

    const trainAnnouncmentsMapped = trainAnnouncments.map(train => {
      return {
        departureStation: this.mapLocation(train.LocationSignature),
        departureTime: this.formatTime(train.AdvertisedTimeAtLocation),
        arrivalStation: this.mapLocation(train.ToLocation[0].LocationName),
        trainNumber: train.AdvertisedTrainIdent,
        productInfo: train.ProductInformation[0],
        nonStop: train.Deviation ? true : false,
        track: train.TrackAtLocation
      };
    });

    return trainAnnouncmentsMapped;
  }
}
