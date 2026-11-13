import 'dotenv/config'
import { OpenAI } from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
you are an ai expert in weather data.

weather data:
-Auraiya: 29 degree
-etawah: 22 degree


`

    (async () => {
        const result = await openai.chat.completions.create({
            model: 'gpt-5.2',
            messages: [
            {
                role: 'system', content: SYSTEM_PROMPT
            },
            {
                role: 'user',
                content: 'Hey There, what is the weather in Auraiya ?',
            },
            ],
        });
        console.log(`🔆: ${result.choices[0].message.content}`);
    })();