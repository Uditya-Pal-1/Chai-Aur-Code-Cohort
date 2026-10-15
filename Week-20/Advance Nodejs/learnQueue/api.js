import express from 'express';
import { z } from 'zod';
import { videoProcessingQueue } from './queues/queue.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

const requestVideoPostRequestSchema = z.object({
  videoURL: z.string(),
});

app.get('/', (req, res) => {
  return res.json({ status: 'server is up and running!' });
});

app.post('/video-process', async (req, res) => {
  const validationResult = await requestVideoPostRequestSchema.safeParseAsync(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { videoURL } = validationResult.data;
  const job = await videoProcessingQueue.add(`video-${videoURL}`, {
    videoURL,
  });

  return res.json({ status: 'enqueued', jobId: job.id });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
