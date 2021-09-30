let upload = document.getElementById('file')
let textarea = document.querySelector('textarea')
upload.addEventListener('change', readFileAsString)

function readFileAsString() {
    let files = this.files
    if (files.length === 0) {
        console.log('No file is selected')
        return
    }

    let render = new FileReader()
    render.onload = (event) => {
        let str = event.target.result.toString()
        let arr = str.split('\n')
        let string = ""
        for(line of arr){
            string += line
        }
        textarea.value = string
    }
    render.readAsText(files[0])
}