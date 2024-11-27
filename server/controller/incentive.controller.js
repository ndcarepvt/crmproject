import { Incentive } from "../models/incentive.model.js";


// Add a new incentive
export const addIncentive = async (req, res) => {
  try {
    const { name, role, invoiceId, commission, billAmount, userId, invoiceCurrency, createdDate } = req.body;
    console.log("run", name, role, invoiceId, commission,billAmount, userId);
  
    // Validate required fields
    console.log(invoiceCurrency);
    
    if (!name || !role || !invoiceId || !commission || !billAmount ) {
      return res.status(400).json({ success:false, message: 'All fields are required' });
    }

    const existIncentive = await Incentive.findOne({invoiceId})

    if(existIncentive){
      return res.json({ success:false, message: 'Invoice already add to another coordinator' });
    }

    const getDate = () => {
      const date = new Date();
      const readableDate = date.toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return readableDate;
    };

    console.log(createdDate);
    
    const getReadableDate = (refineDate) => {
      console.log(refineDate);
      
      const date = new Date(refineDate);
      const readableDate = date.toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      console.log(readableDate);
      
      return readableDate;
    };


    const readableCreatedDate = getReadableDate(createdDate)
    const readableDate = getDate()

    // Create a new incentive
    const incentive = new Incentive({
      name,
      role,
      userId,
      invoiceId,
      commission,
      invoiceCurrency,
      billAmount,
      createdDate:readableCreatedDate,
      status : 'pending',
      date:readableDate
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
    const { userId } = req.body;
    // const saleIncentive = []
    
    const incentives = await Incentive.find({userId});

    console.log(incentives);
    

    res.status(200).json({ message: 'Filtered incentives retrieved successfully', data: incentives });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve filtered incentives', error: error.message });
  }
};


export const updateIncentive = async (req, res) => {
  const {receivedAmount, commissionAmount, invoiceId, status} = req.body;
  console.log("run");
  console.log(receivedAmount);
  
  try {

    const incentive = await Incentive.findOne({invoiceId})

    incentive.status = status;
    incentive.receivedAmount = receivedAmount;
    incentive.commissionAmount = commissionAmount;

    console.log(incentive);
    

    await incentive.save();

    return res.json({success:true, message:"Incentive updated"})
    
  } catch (error) {
    console.log(error);
    return res.json({success:false, message:"Error"})
  }

}