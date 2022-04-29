import "./libs/gapi/api.js";

export default function loadYoutubeVideosData(cb) {
  // youtube data api
  const channelId = "UCw7YSj6huoUGSedV8eYD5PA";
  const apiKey = "AIzaSyCq_Qdkd843-yeW2c2AxGhaUQa8w9g4Dlg";

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
