const socket = io("https://arduino-web-socket.onrender.com");

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
socket.on('data',(data)=>{
  console.log(data)
  alert()
})
socket.on("connect", () => {
  console.log("Connected to server");
})

const readData = (event) => {

  document.querySelector("#gamma").innerHTML = Math.round(event.gamma)
  document.querySelector("#beta").innerHTML = Math.round(event.beta)
  document.querySelector("#alpha").innerHTML = Math.round(event.alpha)

  socket.emit("data", {
    XRotation: Math.round(event.gamma),
    YRotation: Math.round(event.beta), 
    ZRotation:  Math.round(event.alpha)
  });

}

window.addEventListener('deviceorientation', throttle(readData, 100), true);




