/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import Business from "../models/BusinessModel";
import BusinessModel from "../mongoose/business/BusinessModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;

    }

    private constructor() {
    }

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find();

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents with specific tuit from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllUsersThatBookmarkedBusiness = async (mid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({business: mid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents with specific user from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBusinessThatUserBookmarked = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid}).populate("business")
            .exec();

    userBookmarksBusinessByID = async (mid: string, uid: string): Promise<any> =>
        BookmarkModel.create({business: mid, bookmarkedBy: uid});

     userBookmarksBusiness = async(business: Business, uid: string) => {
        let bookmark = {};
        const existBusiness = await BusinessModel.findOne({imdbID: business.imdbID});
        if (existBusiness) {
            bookmark = await BookmarkModel.create({business: business._id, bookmarkedBy: uid});
        } else {
            const actualBusiness = await BusinessModel.create({business})
            bookmark = await BookmarkModel.create({business: actualBusiness._id, bookmarkedBy: uid});
        }
        return bookmark;
    }

    userUnbookmarksBusiness = async (mid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({business: mid, bookmarkedBy: uid});

    findUserBookmarksBusiness = async (uid: string, mid: string): Promise<any> =>
        BookmarkModel.findOne({bookmarkedBy: uid, business: mid});


}

