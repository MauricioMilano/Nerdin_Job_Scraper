const wait = async (time)=> await new Promise(r => setTimeout(r, time));

module.exports = {
    wait
}