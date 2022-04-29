import gapi from "gapi";

export default function loadYoutubeVideosData() {
  // youtube data api
  const channelId = "UCw7YSj6huoUGSedV8eYD5PA";
  const apiKey = "AIzaSyCefZBw1f_0WAi9SmBjzP4C8NxqWAkF2zM";

  return loadClient({
    gapiInstance: gapi,
    apiKey,
    cb: () => {
      console.log("loaded client");
    },
  }).then(() =>
    getData({
      gapiInstance: gapi,
      channelId: channelId,
    })
  );
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
  cb,
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
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
