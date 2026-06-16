const limit = 200;

const textInput = document.getElementById('textInput')
const charCount = document.getElementById('charCount')
const warningMessage = document.getElementById('warningMessage')
const repeatedWords = document.getElementById('repeatedWords')

textInput.addEventListener('input', function () {

    const charCountValue = textInput.value.length
    charCount.innerText = `${charCountValue}/${limit} characters`

    if (charCountValue === limit) {
        charCount.style.color = 'yellow'
        warningMessage.innerText = ''
    } else if (charCountValue > limit) {
        charCount.style.color = 'red'
        warningMessage.innerText = `💀 Character Limit Exceded! `
    }
    else {
        charCount.style.color = 'green'
        warningMessage.innerText = ''
    }

    repeatedWords.innerHTML = ''

    const words = textInput.value.toLowerCase().match(/\b[a-z0-9]+\b/g)
    if(words){
        const counter = {}
        words.forEach(word => {
            if(counter[word]){
                counter[word] += 1;
            }else{
                counter[word] = 1;
            }
        })
        
        const repeatedWord = Object.keys(counter).filter(word => counter[word]>1);
        if(repeatedWord.length > 0){
            let htmlToInsert = '<strong> Repeated:</strong><br>'
            repeatedWord.forEach(word => {
                htmlToInsert += `<span class='word-badge'>${word} (${counter[word]})</span>`
            })
            repeatedWords.innerHTML = htmlToInsert;
        }
    }
})