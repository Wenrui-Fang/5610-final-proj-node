import Business from '../../models/businessModel';

export default interface BusinessDaoI {
    createBusiness(business: Business): Promise<Business>;

    findAllBusiness(): Promise<Business[]>;


    findBusinessByImdbID(tid: string): Promise<any>;

    findBusinessByID(tid: string): Promise<any>;

    likeBusiness(business: Business): Promise<any>;

    dislikeBusiness(business: Business): Promise<any>;

    updateBusiness(mid: string, business: Business): Promise<any>;

    deleteBusiness(mid: string): Promise<any>;

    deleteAllBusiness(): Promise<any>;

};