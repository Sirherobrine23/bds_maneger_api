module.exports.ram_free = 0
module.exports.ram_total = 0
module.exports.bds_cpu = 0
module.exports.bds_ram = 0
// -----------------------------------
const si = require("systeminformation");
function init_1(){
    si.cpu().then(data => {
        module.exports.cpu_speed = Math.trunc(data.speed)
    })
    si.mem().then(data => {
        module.exports.ram_free = Math.trunc(data.free / 1000 / 1000 / 1000)
        module.exports.ram_total = Math.trunc(data.total / 1000 / 1000 / 1000)
    })
    si.currentLoad().then(data => {
        module.exports.current_cpu = Math.trunc(data.currentLoad)
    })
}

function init_2(){
    si.processes().then(data => {
        const list = data.list
        for (let pid in list) {
            var coomand = list[pid].command
            if (coomand.includes("bedrock_server", "bedrock_server.exe", "server.jar")){
                module.exports.bds_cpu = Math.trunc(list[pid].cpu)
                module.exports.bds_ram = Math.trunc(list[pid].mem)
            } else {
                module.exports.bds_cpu = 0
                module.exports.bds_ram = 0
            }
        }
    })
}

init_1()
init_2()
setInterval(() => {
    init_1()
    init_2()
}, 3000);
