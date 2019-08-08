import { Router } from 'express';

const router = Router();
const getVideos = async req => {
  return await req.context.models.Video.find().select({
    _id: 0,
    id: 1,
    title: 1,
    played: 1,
  });
};

router.get('/', async (req, res) => {
  const videos = await getVideos(req);

  return res.send(videos);
});

router.get('/:id', async (req, res) => {
  const video = await req.context.models.Video.findById(
    req.params.id,
  );
  return res.send(video);
});

router.post('/', async (req, res) => {
  const video = await req.context.models.Video.create({
    id: req.body.id,
    title: req.body.title,
    played: req.body.played,
  });

  return res.send(video);
});

router.delete('/:id', async (req, res) => {
  const video = await req.context.models.Video.find({
    id: req.params.id,
  }).remove();

  const videos = await getVideos(req);

  return res.send(videos);
});

export default router;
