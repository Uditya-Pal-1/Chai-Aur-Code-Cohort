const editor = document.getElementById('editor')
const preview = document.getElementById('preview')
const clearBtn = document.getElementById('clearBtn')

marked.setOptions({
    break: true,
    Highlight: function(code, lang) {
        if(lang && hljs.getLanguage(lang)){
            return hljs.Highlight(code,{language: lang}).value;
        }
        return hljs.highlightAuto(code).value;
    }
})

const defaultMarkdown = `
# Welcome to the Markdown Previewer!
## Here is a subheading

You can write text that is **bold**, *italic*, or even ***both***.

### Lists
Unordered list:
- Apples
- Bananas
- Oranges

Ordered list:
1. First step
2. Second step
3. Third step

### Links
You can easily add links to [Google](https://www.google.com).

### Bonus: Code Blocks!

Inline code looks like this: \`const greeting = "Hello";\`

And multi-line code blocks with syntax highlighting:

\`\`\`javascript
function greetUser(name) {
    console.log("Welcome to the previewer, " + Uditya Pal + "!");
}

greetUser("Developer");
\`\`\`
`;

function renderMarkdown(){
    const rawMarkdown = editor.value;

    const html = marked.parse(rawMarkdown)
    preview.innerHTML = html;

    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block)
    })
}

editor.addEventListener('input', renderMarkdown)
clearBtn.addEventListener('click', () =>{
    if(confirm('Are you sure you want to clear the editor?')){
        editor.value = '';
        renderMarkdown();
        editor.focus();
    }
})

editor.value = defaultMarkdown.trim();
renderMarkdown();