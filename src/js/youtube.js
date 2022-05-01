import "./libs/gapi/api.js";

export default function loadYoutubeData(cb) {
  // youtube data api
  const channelId = "UCw7YSj6huoUGSedV8eYD5PA";
  const apiKey = "AIzaSyB-lHbD9pU6pH5aLMv1BqlgSJIKCBmFq9k";

  /**
   * https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22channelId%22%3A%22UCw7YSj6huoUGSedV8eYD5PA%22%2C%22maxResults%22%3A12%2C%22order%22%3A%22date%22%7D
   */
  // it finallyy works..
  gapi.load("client", () => {
    loadClient({
      gapiInstance: gapi,
      apiKey: apiKey,
      cb: () => {
        console.log("loaded client");
      },
    })
      .then(() =>
        getData({
          gapiInstance: gapi,
          channelId: channelId,
        })
      )
      .then((response) => cb(response));
  });
}

function loadClient({ gapiInstance, apiKey, cb }) {
  gapiInstance.client.setApiKey(apiKey);
  return gapiInstance.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(cb, function (err) {
      console.error("Error loading GAPI client for API", err);
    });
}

function getData({
  gapiInstance,
  channelId = "Cw7YSj6huoUGSedV8eYD5PA",
  maxResults = 12,
  order = "date",
  cb = () => {},
}) {
  return gapiInstance.client.youtube.search
    .list({
      part: ["snippet"],
      channelId,
      maxResults,
      order,
    })
    .then(
      function (response) {
        console.log("Response", response);
        cb(response);
        return response;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
