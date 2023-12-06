import mongoose from "mongoose";
import inventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";

//CREATE INVENTORY
export const createinventoryController = async (req, res, next) => {
  try {
    //validation
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if(inventoryType === "in" && user.role !== "Donor"){
    //     throw new Error("Not a donor account")
    // }
    // if(inventoryType === "out" && user.role !== "Hospital"){
    //     throw new Error("Not a hospital account")
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //CALCULATE BLOOD QUANTITY
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //Calculate Out Blood Quantity
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      //In and Out Calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      //Quantity Validation
      if (availableQuantityOfBloodGroup < requestedQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}(ML) of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;

    }
    else{
        req.body.donor = user?._id
    }

    //save record
    const inventory = new inventoryModel(req.body)
    await inventory.save()
    return res.status(200).send({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log("Error");
    res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

// Get Inventory based on organization
export const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Inventory Found",
      inventory,
    });
  } catch (error) {
    console.log("Error");
    res.status(404).send({
      success: false,
      message: "Error in getInventory API",
      error,
    });
  }
};
