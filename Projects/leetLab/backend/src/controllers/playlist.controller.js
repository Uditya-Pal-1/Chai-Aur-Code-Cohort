import { db } from '../libs/db.js';

const createPlayList = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        const playList = await db.playlist.create({
            data: {
                name,
                description,
                userId,
            },
        });
        res.status(200).json({
            success: true,
            message: "Playlist created successfully",
            playList,
        });
    } catch (error) {
        if(error.code === 'P2002'){
            return res.status(400).json("you already have a playlist with this name.")
        }
        console.error("Error creating playlist: ", error);
        res.status(500).json({ error: "Failed to create playlist" });
    }

};

const getPlayAllListDetails = async (req, res) => {
    try {
        const playLists = await db.playlist.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            playLists,
        })
    } catch (error) {
        console.error("Error fetching playlist", error);
        res.status(500).json({ error: "Failed to fetch playlist" });
    }
};

const getPlayListDetails = async (req, res) => {
    const { playListId } = req.params;
    try {
        const playList = await db.playlist.findFirst({
            where: { id: playListId, userId: req.user.id },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        if (!playList) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            playList,
        });
    } catch (error) {
        console.error("Error fetching playlist: ", error);
        res.status(500).json({ error: "Failed to fetch playlist" });
    }
};

const addProblemToPlayList = async (req, res) => {
    const { playListId } = req.params;
    const { problemIds } = req.body;

    try {
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ error: "Invalid or missing problemIds" });
        }
        const playlistExists = await db.playlist.findFirst({
            where: {id: playListId, userId: req.user.id}
        })
        if(!playlistExists){
            return res.status(404).json({ error: "Playlist does not exist" })
        }
        console.log(
            problemIds.map((problemId) => ({
                playListId,
                problemId,
            }))
        );

        const problemsInPlayList = await db.problemInPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                playListId: playListId,
                problemId,
            })),
            skipDuplicates: true,
        })

        res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
            problemsInPlayList,
        })

    } catch (error) {
        console.error("Error adding problems to playlist: ", error.message);
        res.status(500).json({ error: "Failed to add problems to playlist" });
    }
}

const deletePlayList = async (req, res) => {
    const { playListId } = req.params;
    try {
        const deletePlayList = await db.playlist.deleteMany({
            where: {
                id: playListId,
                userId: req.user.id
            },
        });
        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deletePlayList,
        });
    } catch (error) {
        console.error("Error deleting playlist: ", error.message);
        res.status(500).json({ error: "Failed to delete playlist" });
    }
};

const removeProblemFromPlayList = async (req, res) => {
    const { playListId } = req.params;
    const { problemIds } = req.body;

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ error: "Invalid or missing problemIds" });
        }
        const playListExists = await db.playlist.findFirst({
            where:{id:playListId, userId:req.user.id}
        });
        if(!playListExists){
            return res.status(404).json({ error: "Playlist does not exist" })
        }
        const deleteProblem = await db.problemInPlaylist.deleteMany({
            where:{
                playListId,
                problemId: {
                    in: problemIds,
                },
            },
        });
        res.status(200).json({
            success: true,
            message: "Problem removed from playlist successfully",
            deleteProblem,
        });
    } catch (error) {
        console.error("Error removing problem from playlist: ", error.message);
        res.status(500).json({ error: "Failed to remove problem from playlist" })
    }
}

export {
    createPlayList,
    getPlayAllListDetails,
    getPlayListDetails,
    addProblemToPlayList,
    deletePlayList,
    removeProblemFromPlayList
}