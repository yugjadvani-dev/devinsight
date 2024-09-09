---
author: Yug Jadvani
pubDatetime: 2024-09-03T03:08:50Z
title: Downloading YoutubeVideos Using a Node.js Proxy API and JavaScript
slug: downloading-youtubevideos-using-a-node-js-proxy-api-and-javascript
featured: true
draft: false
tags:
  - JavaScript
  - Nodejs
  - Webdevelopment
  - Videodownloader
description: In this tutorial, we’ll walk through the process of setting up a Node.js proxy API to download YouTube videos from a given URL and creating a front-end application to facilitate this.
image: ./images/youtube.webp
---

In this tutorial, we’ll walk through the process of setting up a Node.js proxy API to download YouTube videos from a given URL and creating a front-end application to facilitate this. By the end of this tutorial, you will have a functioning application that can download videos from the web using a simple click of a button.

## Table of contents

## Setting Up the Backend with Node.js

First, let’s set up a Node.js server that will act as a proxy to fetch the video content. We’ll use the `express` and `axios` libraries to handle the requests.

## Step 1: Install Required Packages

Ensure you have Node.js and npm installed. Then, create a new project directory and initialize
it:

```bash
mkdir video-downloader
cd video-downloader
npm init -y
```

Install `express` and `axios`:

```bash
npm install express axios
```

## Step 2: Create the Proxy API

Create a file named `app.js` and add the following code:

```javascript
const express = require("express");
const axios = require("axios");
const app = express();

app.use("/api", routes);

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching the video:", error.message);
    if (error.response) {
      console.error("Status code:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    res.status(500).send("Error fetching the video");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This script sets up an Express server with a `/proxy` an endpoint that takes a `url` query parameter and stream the video content.

## Step 3: Run the Server

Start the server with:

```bash
node app.js
```

Your backend server is now ready and running on port `3000`.

---

## Creating the Frontend with JavaScript

Next, we’ll create a simple frontend to call our proxy API and download the video.

## Step 4: Create the HTML File

Create an `index.html` file with the following content:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YouTube Video Downloader</title>
  </head>
  <body>
    <h1>Download Video</h1>
    <button id="downloadButton">Download Video</button>

    <script src="script.js"></script>
  </body>
</html>
```

This HTML file contains a button that will trigger the video download.

## Step 5: Create the JavaScript File

Create a `script.js` file with the following content:

```javascript
document.getElementById("downloadButton").addEventListener("click", () => {
  // Use your video URL here
  // This URL you get it from 'https://www.npmjs.com/package/ytdl-core'
  const videoUrl =
    "https://rr1---sn-cvh7knzz.googlevideo.com/videoplayback?expire=1717857896&ei=CBpkZqy9B8KPvcAP8te-qAs&ip=43.205.198.216&id=o-AE1u7vrl_fwalRrI55IUHiAQqo8Y-N72Rk28pPiLJLwa&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=NV&mm=31%2C26&mn=sn-cvh7knzz%2Csn-h557sn6s&ms=au%2Conr&mv=m&mvi=1&pl=15&initcwndbps=910000&bui=AbKP-1P-e_nBdcMAZar5MPrcxpZbyRoNUnUbXebxGqMKm0eTHcXToJcAvl7Hp2b4zCz0GchEm7d9XzPV&spc=UWF9fwS45t3bwtD-bLX2LX0ZFDstratoy-luCKpUtj9ybPFahVoHZ-zzwiFe&vprv=1&svpuc=1&mime=video%2Fmp4&ns=hRGFZHqMdY6QYZ5GVqnTKrkQ&rqh=1&cnr=14&ratebypass=yes&dur=674.284&lmt=1696743550715883&mt=1717835841&fvip=2&c=WEB&sefc=1&txp=5318224&n=pYc5MbiHM840Rw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAKTnDywU9bBb35hZBEghdNqIJ2ovFdlq1R79Pb0VcDD3AiEAye92mziReCSGmIWkzAH8O9XJhmfh0HjLtJUjODXCwb4%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHlkHjAwRgIhAJG1veP4CqG24FUDtJyaB4hyuTVLyLlrr4qGRtvZpeI6AiEAkMM0lVE129cQjBHYIq738SQdD2uVD4Y_ZcJr5E1dDos%3D";
  downloadVideo(videoUrl);
});

async function downloadVideo(url) {
  try {
    const response = await fetch(
      `http://localhost:3000/proxy?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = "video.mp4"; // Set the file name
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading the video:", error);
  }
}
```

This JavaScript code listens for a button click, sends the video URL to the proxy API, and handles the video download.

---

## Running the Application

1. Ensure your backend server is running.
2. Serve your HTML file. You can use a simple HTTP server, like `http-server`, or integrate it with your Express server.
3. Open the HTML file in a browser.
4. Click the “Download Video” button to download the YouTube video.

---

## Conclusion

With these steps, you now have a fully functioning application that can download YouTube videos using a Node.js proxy API and JavaScript. This setup is useful for handling cross-origin requests and managing video downloads efficiently.

Feel free to expand this application further by adding more features or improving the user interface. Happy coding!

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
