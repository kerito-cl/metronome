
function Timer(callback, timeInterval, options) {
  this.timeInterval = timeInterval;

  this.start = () => {
    this.expected = Date.now() + this.timeInterval
    this.timeout = null
    console.log("started!")
    
    if (options.immediate) {
      callback();
    }
  
    this.timeout = setTimeout(this.round, this.timeInterval);
  }

  this.stop = () => {

    clearTimeout(this.timeout)
    

  }

  this.round = () => {
    let drift = Date.now() - this.expected
    callback();
    this.expected += this.timeInterval
    console.log(drift)
    console.log(this.timeInterval - drift)
    this.timeout = setTimeout(this.round, this.timeInterval - drift)
  }
}


//const myTimer = new Timer(() => {console.log("it ran!")}, 1000)

//function start(){

 // myTimer.start()

//}


//function stop() {

  //myTimer.stop()
//}

export default Timer;
