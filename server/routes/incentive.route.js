import express from 'express';
import { addIncentive, getAllIncentives, getIncentivesByNameAndRole, getIncentivesInDateRange, updateIncentive } from '../controller/incentive.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const incentiveRouter = express.Router();

incentiveRouter.post('/add', authMiddleware,  addIncentive); // Route to add an incentive
incentiveRouter.get('/getall', getAllIncentives); // Route to get all incentives
incentiveRouter.post('/getfilter', authMiddleware, getIncentivesByNameAndRole); // Route to filter incentives by name and role
incentiveRouter.post('/update', updateIncentive); 
incentiveRouter.post('/datefilter', getIncentivesInDateRange);

export default incentiveRouter;
