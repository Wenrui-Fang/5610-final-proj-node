import Business from "../models/businessModel";
import BusinessDaoI from "../interfaces/business/BusinessDaoI";
import BusinessModel from "../mongoose/business/BusinessModel";

export default class BusinessDao implements BusinessDaoI {

    private static businessDao: BusinessDao | null = null;

    public static getInstance = (): BusinessDao => {
        if (BusinessDao.businessDao === null) {
            BusinessDao.businessDao = new BusinessDao();
        }
        return BusinessDao.businessDao;
    }

    private constructor() {
    }

    createBusiness = async (business: Business): Promise<Business> =>
        BusinessModel.create(business);

    findAllBusiness = async (): Promise<Business[]> =>
        BusinessModel.find().exec();

    findBusinessByID = async (mid: string): Promise<any> =>
        BusinessModel.findOne({_id: mid});

    findBusinessByImdbID = async (mid: string): Promise<any> =>
        BusinessModel.findOne({imdbID: mid});

    likeBusiness = async (business: Business) => {
        let actualBusiness = {};
        const existBusiness = await BusinessModel.findOne({imdbID: business.imdbID});
        if(existBusiness) {
            // @ts-ignore
            const status = await BusinessModel.updateOne({imdbID: business.imdbID}, {$set: {likes: existBusiness.likes + 1}})
            // @ts-ignore
            actualBusiness = {...existBusiness, likes: existBusiness.likes + 1}
        } else {
            actualBusiness = await BusinessModel.create({
                ...business,
                likes: 1,
                dislikes: 0
            })
        }
        return actualBusiness;
    }

    dislikeBusiness = async (business: Business) => {
        let actualBusiness = {};
        const existBusiness = await BusinessModel.findOne({imdbID: business.imdbID});
        if(existBusiness) {
            // @ts-ignore
            const status = await BusinessModel.updateOne({imdbID: business.imdbID}, {$set: {likes: existBusiness.likes + 1}})
            // @ts-ignore
            actualBusiness = {...existBusiness, likes: existBusiness.dislikes + 1}
        } else {
            actualBusiness = await BusinessModel.create({
                ...business,
                likes: 0,
                dislikes: 1
            })
        }
        return actualBusiness;
    }

    updateBusiness = async (mid: string, business: Business): Promise<any> =>
        BusinessModel.updateOne({_id: mid}, {$set: business});

    deleteBusiness = async (mid: string): Promise<any> =>
        BusinessModel.deleteOne({_id: mid});

    deleteAllBusiness = async (): Promise<any> =>
        BusinessModel.deleteMany();

}








