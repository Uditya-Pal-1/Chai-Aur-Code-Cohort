import express from 'express';
import { z } from 'zod';
import { videoProcessingQueue } from './queues/queue.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requestVideoPostRequestSchema = z.object({
  videoURL: z.string().url(),
});

app.get('/', (req, res) => {
  return res.json({ status: 'server is up and running!' });
});

const parseVideoRequest = (req) => ({
  ...req.query,
  ...req.body,
});

app.all('/video-process', async (req, res) => {
  const validationResult = await requestVideoPostRequestSchema.safeParseAsync(
    parseVideoRequest(req)
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.issues });
  }

  const { videoURL } = validationResult.data;
  const job = await videoProcessingQueue.add(`video-${videoURL}`, {
    videoURL,
  });

  return res.json({ status: 'enqueued', jobId: job.id, videoURL });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
