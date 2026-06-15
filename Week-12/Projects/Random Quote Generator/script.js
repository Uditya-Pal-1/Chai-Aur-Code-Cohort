const quotes = [
  "Be the change that you wish to see in the world.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "I have not failed. I've just found 10,000 ways that won't work.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "You miss 100% of the shots you don't take.",
  "Whether you think you can or you think you can't, you're right.",
  "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
  "If you are going through hell, keep going.",
  "Life is what happens when you're busy making other plans.",
  "Do what you can, with what you have, where you are.",
  "Everything you've ever wanted is on the other side of fear.",
  "The journey of a thousand miles begins with one step.",
  "That which does not kill us makes us stronger.",
  "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
  "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
  "We become what we think about.",
  "The only way to do great work is to love what you do.",
  "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference."
]
const generateBtn = document.getElementById('generateButton')
const quoteDisplay = document.getElementById('quoteDisplay')

const tempQuotes = [...quotes]

function generateQuote(){
    if(tempQuotes.length === 0){
        quoteDisplay.innerText = 'You seen all quotes! 🏁🏁'
        return;
    }
 const randomIndex = Math.floor(Math.random() * tempQuotes.length)
 const quote = tempQuotes.splice(randomIndex,1)[0];
 quoteDisplay.innerText = quote
}

generateBtn.addEventListener('click',generateQuote)