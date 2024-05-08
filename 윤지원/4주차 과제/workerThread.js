const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  //mainthreads
  const worker = new Worker(__filename);
  worker.on("message", (value) => console.log("워커로부터", value)); //매개변수
  worker.on("exit", () => console.log("워커 끝"));
  worker.postMessage("ping");
} else {
  //worker threads
  parentPort.on("message", (value) => {
    console.log("부모로부터", value);
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
