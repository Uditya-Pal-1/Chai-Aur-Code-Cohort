import 'dotenv/config'
import {OPENAIEmbeddings} from '@langchain/openai'
import {QdrantVectorStore} from '@langchain/qdrant'
import {OpenAI} from 'openai'


const client = new OpenAI();
async function chats(question = '') {
    const embeddings = new OPENAIEmbeddings({
        model:'text-embedding-gpt-5.2',
        apiKey:'',
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url:"http://localhost:6333",
            collectionName:"langchainjs-testing",
        }
    )
    const ret = vectorStore.asRetriever({k: 3})
    const result = await ret.invokek(question)

    const SYSTEM_PROMPT = `
    AI agent answer the user query based on available context from the pdf.
    Context:
    ${JSON.stringify(result)}
    `;

    const chatResult = await client.chat.completions.create({
        modet:'gpt-5.2',
             messages: [
            {
                role: 'system', content: SYSTEM_PROMPT
            },
            {
                role: 'user',
                content: question,
            },
            ],
    })
    console.log(`🤖: ${chatResult.choices[0].message.content}`)
}
chats(`what is my name and degree`);