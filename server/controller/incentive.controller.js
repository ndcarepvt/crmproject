import { Incentive } from "../models/incentive.model.js";


// Add a new incentive
export const addIncentive = async (req, res) => {
  try {
    const { name, role, invoiceId, commission, billAmount, recievedAmount, status } = req.body;
    console.log("run");

  
    // Validate required fields
    if (!name || !role || !invoiceId || !commission || !billAmount ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new incentive
    const incentive = new Incentive({
      name,
      role,
      invoiceId,
      commission,
      billAmount,
      status : 'pending',
    });

    // Save to the database
    const savedIncentive = await incentive.save();
    res.status(201).json({ message: 'Incentive added successfully', data: savedIncentive });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add incentive', error: error.message });
  }
};

// Get all incentives
export const getAllIncentives = async (req, res) => {

  try {
    const incentives = await Incentive.find();
    res.status(200).json({ message: 'Incentives retrieved successfully', data: incentives });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve incentives', error: error.message });
  }
};

// Get incentives filtered by name and role
export const getIncentivesByNameAndRole = async (req, res) => {
  console.log("run");
  
  try {
    const { name, role } = req.query;

    // Build the query object dynamically
    const query = {};
    if (name) query.name = name;
    if (role) query.role = role;

    const incentives = await Incentive.find(query);
    res.status(200).json({ message: 'Filtered incentives retrieved successfully', data: incentives });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve filtered incentives', error: error.message });
  }
};
