let timeout;

function startTest(){

  console.log("Started!")
  const startTime = Date.now();
  let totalTime = 0;

  const round = () => {
    timeout = setTimeout(() => {

      totalTime += 1000;
      let elapsedTime = Date.now() - startTime;
      console.log("total drift", elapsedTime - totalTime)
      round()
  }, 1000);

}
  round()
}

function stopTest() {

  clearTimeout(timeout);
}
