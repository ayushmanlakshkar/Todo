import { Request, Response, NextFunction } from "express";

const validateTaskAttributes = (req: Request, res: Response, next: NextFunction) => {
  const { priority, deadline, title, description,status } = req.body;

  if (!priority) {
    req.body.priority = "Medium";
    }

  if (!deadline || isNaN(Date.parse(deadline))) {
    return res.status(400).json({ error: "A valid deadline date is required." });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required and must be a non-empty string." });
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({ error: "Description is required and must be a non-empty string." });
  }

  if(!status){
    req.body.status = "To Do";
  }

  // Proceed to the next middleware or route handler
  next();
};

export default validateTaskAttributes;
