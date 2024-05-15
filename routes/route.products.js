// Create an express router 
import express from "express";
const router = express.Router();
import { findAll, findOne, addOne, updateOne, removeOne } from "../controllers/controller.products";

// create the actual routes (get, post, put, delete)
router.get("/:id?", async (req, res, next ) => {
    try {
        //look for an id on the endpoint
        const { id } = req.params;
        
        let result;
        if (id){
            //Get the one product using the id
            result = await findOne(id);
        } else {
            // get all the products
            result = await findAll();
        }
        res.json(result);
    } catch (err){
        next(err);
    }
});

router.post("/", async (req, res, next) => {
  try {
    const incomingData = req.body;
    
    if (incomingData) {
        //try to add the incomingData into the database
        const result = await addOne(incomingData);
        res.json(results);
    } else {
        //if there is no incomingData - then i cant add any new info
        res.json({ msg: "Error Posting: No incoming data"});
    }
    
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    //grab the id from the incoming request parameters
        const { id } = req.params;
        const incomingData = req.body;
    
        if (id && incomingData) {
        //try to update the DB with the provided info
        const result = await updateOne(id, incomingData);
        res.json(result);
    } else {
        //let the client know that we are missing information to perform the update
        res.json({ msg: "Missing id and/or date to update"});
    }
    
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if(id) {
        //try to delete the row at the provided id
        const result = await removeOne(id);
        res.json(result);
    } else {
        // let the client know that we cant remove something without the id
        res.json({ msg: "Error Deleting: Cannot remove row without id"});
    }

  } catch (err) {
    next(err);
  }
});


// export that router
export default router;