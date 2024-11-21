import express from 'express';
import { addIncentive, getAllIncentives, getIncentivesByNameAndRole } from '../controller/incentive.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const incentiveRouter = express.Router();

incentiveRouter.post('/add',  addIncentive); // Route to add an incentive
incentiveRouter.get('/getall', getAllIncentives); // Route to get all incentives
incentiveRouter.get('/getfilter', getIncentivesByNameAndRole); // Route to filter incentives by name and role

export default incentiveRouter;
