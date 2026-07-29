const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("authorText");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const tweetBtn = document.getElementById("tweetBtn");
const exportBtn = document.getElementById("exportBtn");
const bodyBg = document.getElementById("bodyBg");
const quoteCard = document.querySelector(".quote-card");

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

async function fetchQuote() {
    try {
        quoteText.innerText = 'Loading quote...'
        authorText.innerText = ""
        changeBackground();

        const response = await fetch(API_URL)
        const result = await response.json();

        if (result.success && result.data) {
            quoteText.innerText = `${result.data.content}`
            authorText.innerText = `${result.data.author}`
        } else {
            throw new Error("Invalid API response structure")
        }

    } catch (error) {
        console.error("Error fetching quote:", error)
        quoteText.innerText = 'Oops! Could not fetch a quote right now.'
        authorText.innerText = ""
    }
}

function changeBackground() {
    const randomUrl = `https://picsum.photos/1920/1080?random=${new Date().getTime()}`;
    bodyBg.style.backgroundImage = `url('${randomUrl}')`
}

newQuoteBtn.addEventListener('click', fetchQuote);

copyBtn.addEventListener('click', () => {
    const textToCopy = `${quoteText.innerText} ${authorText.innerText}`
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = '✅ Copied!!'

        setTimeout(() => {
            copyBtn.innerText = originalText;
        }, 2000)
    })
})

tweetBtn.addEventListener("click", () => {
    const tweetText = `${quoteText.innerText} Author is ${authorText.innerText}`
    const tweetUrl = `https://www.x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, '_blank')
})

exportBtn.addEventListener("click", () => {
    const originalText = exportBtn.innerText;
    exportBtn.innerText = '⌛ Saving...'

    html2canvas(quoteCard, { backgroundColor: null, scale: 2 }).then(canvas => {

        const imageUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')

        downloadLink.href = imageUrl;
        downloadLink.download = 'Quote-of-the-day.png'
        downloadLink.click();

        exportBtn.innerText = originalText
    });
})

fetchQuote();