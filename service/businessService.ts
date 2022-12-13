
import Business from "../models/businessModel";
import BookmarkDao from "../daos/BookmarkDao";

export default class BusinessService {
    public static businessService: BusinessService | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    public static getInstance = (): BusinessService => {
        if(BusinessService.businessService===null){
            BusinessService.businessService = new BusinessService();
        }
        return BusinessService.businessService;
    }

    private constructor() {
    }

    public getBusinessForBookmarkByUser = async (uid:any, business:Business[]): Promise<any[]> =>{
        let findBookmarksPromises: any[] = []

        business.forEach((business:any)=>{
            let findBookmarksPromise = BusinessService.bookmarkDao.findUserBookmarksBusiness(uid,business._id);

            findBookmarksPromises.push(findBookmarksPromise);

        })

        const bookmarkBusiness = await Promise.all(findBookmarksPromises);

        const bookmarkBusinessIds = bookmarkBusiness.map((t)=>{
            if(t){
                return t.business.toString();
            }
        })

        const getBusiness = business.map((t:any)=>{
            let newM = t.toObject();

            if(bookmarkBusinessIds.indexOf(t._id.toString())>=0){
                newM = {...newM, bookmarkedByMe: true};
            }
            return newM;
        })
        return getBusiness;
    }

}