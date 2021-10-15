document.querySelector("#download-btn").addEventListener("click", async () => {
  const video = document.querySelector("#video-link").value
  if (video.length === 0) {
    return
  }

  try {
    document.querySelector(".loader").classList.add("show")
    const data = await (await fetch("/videoInfo?videoURL=" + video)).json()
    // console.log(data)
    document.querySelector(".loader").classList.remove("show")

    const audios = data.formats.filter(obj => obj.mimeType.includes("audio/webm"))
    const filename = data.videoDetails.title.replace(/\s{1,}/, "-") + ".mp3"
    const itag = audios[0].itag

    notify(`"${filename} will be downloaded automatically.`)
    document.querySelector("#download-frame").src = `/download?videoURL=${video}&itag=${itag}&filename=${filename}`
  } catch (error) {
    document.querySelector(".loader").classList.remove("show")
    alert("Something went wrong. Please try again.")
  } finally {
    document.querySelector("#video-link").value = ""
  }
})

const notify = (msg) => {
  const notif = document.createElement("div")
  notif.classList.add("notification")
  notif.textContent = msg
  document.body.appendChild(notif)
  setTimeout(() => {
    notif.classList.add("show")
  }, 100)
  setTimeout(() => {
    notif.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notif)
    }, 300)
  }, 4000)
  
}