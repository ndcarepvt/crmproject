import { Incentive } from "../models/incentive.model.js";


// Add a new incentive
export const addIncentive = async (req, res) => {
  try {
    const { name, role, invoiceId, commission, billAmount, userId, invoiceCurrency, createdDate, patientId, courierCharge, packingCharges, } = req.body;
    console.log("run", name, role, invoiceId, commission, billAmount, userId, courierCharge);

    // Validate required fields

    if (!name || !role || !invoiceId || !commission || !billAmount || !patientId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existIncentive = await Incentive.findOne({ invoiceId })

    if (existIncentive) {
      return res.json({ success: false, message: 'Invoice already add to another coordinator' });
    }

    const getDate = () => { 
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const day = String(date.getDate()).padStart(2, "0");
    
      return `${year}-${month}-${day}`;
    };
    

    const getReadableDate = (refineDate) => {
      const date = new Date(refineDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const day = String(date.getDate()).padStart(2, "0");
    
      return `${year}-${month}-${day}`;
    };
    

    const readableCreatedDate = getReadableDate(createdDate)
    const readableDate = getDate()
 

    // Create a new incentive
    const incentive = new Incentive({
      name,
      role,
      userId,
      invoiceId,
      patientId,
      commission,
      billAmount,
      courierCharge,
      invoiceCurrency,
      packingCharges,
      createdDate: readableCreatedDate,
      status: 'pending',
      date: readableDate
    });

    // Save to the database
    const savedIncentive = await incentive.save();
    res.status(201).json({ success: true, message: 'Incentive added successfully', data: savedIncentive });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add incentive', error: error.message });
  }
};

// Get all incentives
export const getAllIncentives = async (req, res) => {

  try {
    const incentives = await Incentive.find();
    res.status(200).json({ success: true, message: 'Incentives retrieved successfully', data: incentives });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve incentives', error: error.message });
  }
};

// Get incentives filtered by name and role
export const getIncentivesByNameAndRole = async (req, res) => {
  console.log("run");

  try {
    const { userId } = req.body;
    // const saleIncentive = []

    const incentives = await Incentive.find({ userId });

    res.status(200).json({ success: true, message: 'Filtered incentives retrieved successfully', data: incentives });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve filtered incentives', error: error.message });
  }
};


export const updateIncentive = async (req, res) => {
  const { receivedAmount, commissionAmount, invoiceId, status, bankCharges, supportCharges, patientId, courierCharge, packingCharges } = req.body;
  console.log("run");

  try {

    const incentive = await Incentive.findOne({ invoiceId, patientId })

    incentive.status = status;
    incentive.receivedAmount = receivedAmount;
    incentive.commissionAmount = commissionAmount;
    incentive.bankCharges = bankCharges;
    incentive.supportCharges = supportCharges;
    incentive.courierCharge = courierCharge;
    incentive.packingCharges = packingCharges;

    await incentive.save();
    return res.json({ success: true, message: "Incentive updated" })

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" })
  }

}


export const getIncentivesInDateRange = async(req, res)  => {

  const {startDateValue, endDateValue} = req.body;

  try {

      // Convert dates to ISODate format
      const start = new Date(startDateValue);
      const end = new Date(endDateValue);

      // Fetch records within the date range
      const incentives = await Incentive.find({
          date: {
              $gte: startDateValue,
              $lte: endDateValue
          }
      });
      console.log(incentives);
      

      return res.json({success:true, message:"Incentive Recieved", data:incentives});
      
    } catch (error) {
      console.error("Error fetching incentives:", error);
      return res.json({success:true,  message:"Error"});
  }
}

