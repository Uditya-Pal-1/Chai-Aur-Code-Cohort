import 'dotenv/config'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import {OPENAIEmbeddings} from '@langchain/openai'
import {QdrantVectorStore} from '@langchain/qdrant'
import e from 'express';

async function index() {
    const loader = new PDFLoader('./Readme.pdf');
    const docs = await loader.load();

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
    await vectorStore.addDocuments(docs)
    console.log("All Docs are Added")
}

index();