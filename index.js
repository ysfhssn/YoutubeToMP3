const express = require("express")
const ytdl = require("ytdl-core")

const app = express() 

app.use(express.json())
app.use(express.static("public"))


app.get("/videoInfo", async (req, res) => {
  const videoURL = req.query.videoURL
  const info = await ytdl.getInfo(videoURL)
  res.status(200).json(info)
})

app.get("/download", (req, res) => {
  const {videoURL, itag, filename} = req.query
  res.setHeader("Content-Disposition", 'attachment;\ filename="' + filename + '"')
  ytdl(videoURL, {
    filter: format => format.itag == itag
  }).pipe(res)
})


app.listen(process.env.PORT || 5000)