import Bookmark from "../../models/bookmarks/Bookmark";
import Business from "../../models/businessModel";

export default interface BookmarkDaoI{
    findAllBookmarks():Promise<Bookmark[]>;

    findAllBusinessThatUserBookmarked(uid:string): Promise<Bookmark[]>;

    findAllUsersThatBookmarkedBusiness(mid: string):Promise<Bookmark[]>;


    userBookmarksBusiness(business:Business, uid:string): Promise<any>;

    userBookmarksBusinessByID(mid:string,uid:string): Promise<any>;


    userUnbookmarksBusiness(mid:string,uid:string): Promise<any>;

}