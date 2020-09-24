
const request = require('request')
let Files = {}
let videos = {
    files: Files,
    count() {
        return Files.length
    },
}
request.get({ url: 'https://api.streamtape.com/file/listfolder?login=bdec87c583f1acf16949&key=AloGmk4eerTvmQ', json: true }, (err, { body }) => {

    Files = body.result.files
    console.log(Files);

})

module.exports = Files.length