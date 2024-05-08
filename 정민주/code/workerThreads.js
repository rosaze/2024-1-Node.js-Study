const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')

if (isMainThread){
    //메인 스레드
    //얘가 먼저 생성되어서 워커 스레드를 생성하고 일을 분배해준다
    //워커 스레드가 일을 다하면 메인 스레드에서 합쳐서 최종결과를 리턴
    //일을 나눠주는것도, 나중에 합치는 것도 다 우리가 코딩해야한다.
    const threads = new Set()
    threads.add(new Worker(__filename,{
        workerData: {start:1}
    }))
    threads.add(new Worker(__filename,{
        workerData: {start:2}
    }))
    for (let worker of threads){
        //워커 스레드에서 받아오는 녀석
        worker.on('message', (value)=>{console.log('워커러부터', value)})

        //parentPort.close()를 인식하는 녀석
        worker.on('exit', ()=> {
            threads.delete(worker)   
            if (threads.size===0){
                console.log('워커 끝!')
            }
        })
    }    
} else{
    const data = workerData
    parentPort.postMessage(data.start + 100)
}
//메인이냐 워커이냐에 따라 처리방식이 다르다.