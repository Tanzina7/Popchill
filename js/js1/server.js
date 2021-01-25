/**
 * 
 * importing express framework and File System
 */

const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
/**setting up server */
app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
app.get("/video", stream);
/**
 * In this function, we first calculate where is the seek button situated at,
 * then we fixed how much data we want to send as a partial response to the request made from the client
 * then we calculate how much of video time equals to 1MB to data which we should parse from our video file
 * and finally we pipe the videoStream into response
 * 
 * @param {Object} req This is the req send from the client to the server
 * @param {Object} res This is the response variable which we will modify to serve our client
 */
 function stream (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "bigbuck.mp4";
  const videoSize = fs.statSync("bigbuck.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
}