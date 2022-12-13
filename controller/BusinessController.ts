import {Request, Response, Express} from "express";
import BusinessDao from "../daos/BusinessDao";
import BusinessControllerI from "../interfaces/business/BusinessControllerI";
import Business from "../models/businessModel";

export default class BusinessController implements BusinessControllerI {

    private static businessDao: BusinessDao = BusinessDao.getInstance();
    private static businessController: BusinessControllerI | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MovieController
     */
    public static getInstance = (app: Express): BusinessController => {
        if (BusinessController.businessController === null) {
            BusinessController.businessController = new BusinessController();
            app.post("/api/business", BusinessController.businessController.createBusiness);
            app.post("/api/business/likes", BusinessController.businessController.likeBusiness);
            app.post("/api/business/dislikes", BusinessController.businessController.dislikeBusiness);

            app.get("/api/business", BusinessController.businessController.findAllBusiness);
            app.get("/api/business/:mid", BusinessController.businessController.findBusinessByID);
            app.get("/api/business/:mid", BusinessController.businessController.findBusinessByImdbID);
            app.put("/api/business/:mid", BusinessController.businessController.updateBusiness);
            app.delete("/api/business/:mid", BusinessController.businessController.deleteBusiness);
            app.delete("/api/business", BusinessController.businessController.deleteAllBusiness);
        }
        return BusinessController.businessController;
    }


    private constructor() {
    }

    findAllBusiness = (req: Request, res: Response) => {

        BusinessController.businessDao.findAllBusiness()
            .then((business: Business[]) => res.json(business));
    }

    createBusiness = (req: Request, res: Response) => {
        BusinessController.businessDao.createBusiness(req.body)
            .then((business: Business) => res.json(business))
    }

    findBusinessByID = (req: Request, res: Response) =>
        BusinessController.businessDao.findBusinessByID(req.params.mid)
            .then((business: Business) => res.json(business));

    findMovieByImdbID = (req: Request, res: Response) =>
        BusinessController.businessDao.findBusinessByImdbID(req.params.mid)
            .then((business: Business) => res.json(business));


    deleteBusiness = (req: Request, res: Response) =>
        BusinessController.businessDao.deleteBusiness(req.params.mid)
            .then((status) => res.json(status));


    updateBusiness = (req: Request, res: Response) =>
        BusinessController.businessDao.updateBusiness(req.params.mid, req.body)
            .then((status) => res.json(status));


    likeBusiness = async (req: Request, res: Response) => {
        const business = req.body;
        const actualBusiness = await BusinessController.businessDao.likeBusiness(business);
        res.json(actualBusiness)
    }

    dislikeBusiness = async (req: Request, res: Response) => {
        const business = req.body;
        const actualBusiness = await BusinessController.businessDao.dislikeBusiness(business);
        res.json(actualBusiness)
    }


    deleteAllBusiness = (req: Request, res: Response) =>
        BusinessController.businessDao.deleteAllBusiness()
            .then((status) => res.json(status));


}

