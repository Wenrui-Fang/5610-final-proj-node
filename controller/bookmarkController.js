import * as bookmarkDao from '../daos/bookmarkDao.js';

const findAllBookmarkByUser = async(req,res) => {
    const bookmarks = await bookmarkDao.findAllBookmarkByUser(req.params.uid);
    bookmarks.map( bookmark => {
        bookmark = bookmarkService.getBusinessDetail();
    })

    res.json(bookmarks);
}

const userBookmarkBusiness = async(req,res) => {
    const bookmark = await bookmarkDao.userBookmarkBusiness(req.params.uid, req.params.bid);
    res.json(bookmark);
}

const userUnbookmarkBusiness = async(req,res) => {
    const status = await bookmarkDao.userUnbookmarkBusiness(req.params.uid, req.params.bid);
    res.json(status);
}

const BookmarkController = (app) => {
    app.get("/api/users/:uid/bookmarks", findAllBookmarkByUser);
    app.post("/api/users/:uid/bookmarks/:bid", userBookmarkBusiness);
    app.delete('/api/users/:uid/bookmarks/:bid', userUnbookmarkBusiness);
}