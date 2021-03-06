const VideoRoom = require('../room').VideoRoom;

module.exports = {
    populate,
    create,
    queueVideo,
    deleteFromQueue,
    updateLoadedVideo
}

const videoRooms = [];

function populate(req, res) {
    const room = videoRooms.find(({ roomId }) => roomId === req.params.id);
    if (room) {
        res.json(room);
    } else {
        res.status(400).json('Something went wrong.');
    }
}

function create(req, res) {
    try {
        const room = new VideoRoom(req.body.name);
        videoRooms.push(room);
        res.json(room);
    } catch (err) {
        res.status(400).json('Something went wrong.');
    }
}

function queueVideo(req, res) {
    try {
        const room = videoRooms.find(({ roomId }) => roomId === req.params.id);
        room.queue.push(req.body);
        res.json(room);
    } catch (err) {
        res.status(400).json('Something went wrong.');
    }
}

function deleteFromQueue(req, res) {
    try {
        const room = videoRooms.find(({ roomId }) => roomId === req.params.id);
        room.queue.splice([req.body.idx], 1);
        res.json(room)
    } catch (err) {
        res.status(400).json('Something went wrong.');
    }
}

function updateLoadedVideo(req, res) {
    try {
        const room = videoRooms.find(({ roomId }) => roomId === req.params.id);
        room.selectedVideo = req.body;
        room.loadedVideo = req.body;
        res.json(room);
    } catch (err) {
        res.status(400).json('Something went wrong.');
    }
}