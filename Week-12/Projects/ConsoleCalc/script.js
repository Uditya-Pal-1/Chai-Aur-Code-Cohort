const inputValue = document.getElementById('inputValue')
const result = document.querySelector('.result')

inputValue.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){

        const expression = inputValue.value
        result.innerText = "E:/Hacker?/Terminal/User/Output:- Processing..."

        setTimeout(function(){
        try{
            const ans = eval(inputValue.value)

            if(ans !== undefined && !isNaN(ans)){
                typerWriter(`E:/Hacker?/Terminal/User/Output>  ${ans}`)
            }
            else{
                typerWriter(`/Invalid Syntax in Value Refresh! TerminalCalc.`)
            }
        }
        catch{
            typerWriter(`/INPUT.Error.TerminalCalc.`)
        }
        },500)
    }
})

function typerWriter(text){
    result.innerText=''
    let index = 0;
    const typing = setInterval(function(){
        if(index < text.length){
            result.innerText += text.charAt(index)
            index ++;
        }else {
            clearInterval(typing)
        }
    },30)
}