import 'dotenv/config'
import {OpenAI} from 'openai'

const openai = new OpenAI();

(async() => {
    const result = openai.chat.completions.create({
        model:'gpt-4.1', //token size 1M
        messages: [{
            role: 'user',
            content:'Hey There',
        },
    ],
    });
    console.log(`🔆: ${result.choices[0].messages.content}`);
})();