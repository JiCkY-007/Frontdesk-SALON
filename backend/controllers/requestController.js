import Request from "../models/request.js";
import fs from "fs";
import path from "path";
import YAML from "yaml";

export const createRequest = async (req, res) => {
    console.log(req.body, "-------------------");
    try {
      let { requestId, requestedBy, query, contact, status, updateMessage } = req.body;
  
      // Validate required fields
      if (!requestId || !requestedBy || !query || !contact) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }
  
      // Generate a unique requestId by appending a suffix if necessary
      let uniqueRequestId = requestId;
      let counter = 1;
      while (await Request.findOne({ requestId: uniqueRequestId })) {
        uniqueRequestId = `${requestId}-${counter}`;
        counter++;
      }
  
      // Create new request with unique ID
      const newRequest = await Request.create({
        requestId: uniqueRequestId,
        requestedBy,
        query,
        contact,
        status: status || "Pending",
        updateMessage: updateMessage || "",
      });
  
      res.status(201).json({
        success: true,
        message: "Request created successfully",
        data: newRequest,
      });
    } catch (error) {
      console.error("Error creating request:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  

// Get all requests with filtering/pagination
export const getAllRequests = async (req, res) => {
    try {
      // Extract query parameters
      const { status, sortBy, search } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // Build query
      const query = {};
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { requestId: { $regex: search, $options: "i" } },
          { requestedBy: { $regex: search, $options: "i" } },
          { query: { $regex: search, $options: "i" } },
        ];
      }
  
      // Sort options
      let sort = { createdAt: -1 }; // Default: newest first
      if (sortBy) {
        const [field, order] = sortBy.split(":");
        sort = { [field]: order === "desc" ? -1 : 1 };
      }
  
      // Get paginated results
      const [requests, total] = await Promise.all([
        Request.find(query).skip(skip).limit(limit).sort(sort),
        Request.countDocuments(query),
      ]);
  
      res.status(200).json({
        success: true,
        count: requests.length,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
  // Get single request by ID
  export const getRequestById = async (req, res) => {
    try {
      const request = await Request.findOne({ requestId: req.params.id }); // Changed from findById to findOne
      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }
      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { status, updateMessage } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Invalid status. Must be 'Approved' or 'Rejected'" });
  }

  try {
    const updated = await Request.findOneAndUpdate(
      { requestId: id },
      {
        status,
        updateMessage,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }
    // YAML update logic
    // ✅ YAML update logic
    // YAML update logic
    const filePath = path.resolve(
      "C:/Users/jicky/OneDrive/Desktop/AI_FrontDesk/AI-livekit/promt.yaml"
    );

    let parsedDoc;

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");

      // ✅ parseDocument to preserve structure
      parsedDoc = YAML.parseDocument(fileContent);
    } else {
      parsedDoc = new YAML.Document();
      parsedDoc.contents = {};
    }

    // Get existing `prompt` text or initialize empty
    let currentPrompt = parsedDoc.get("prompt") || "";

    // Prepare the new content to append
    const newLine = `\n\nQuestion: ${req.body.query}\nAnswer: ${req.body.updateMessage}`;

    // Append and set back
    parsedDoc.set("prompt", currentPrompt + newLine);

    // Save it back
    fs.writeFileSync(filePath, parsedDoc.toString(), "utf8");

    res.status(200).json({
      message: "Request updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 