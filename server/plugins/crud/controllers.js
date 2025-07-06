exports.createCRUDController = (Model, searchableFields = []) => ({
    // Create
    create: async (req, res) => {
      try {
        const data = await Model.create(req.body);
        res.status(201).json({ success: true, message: "Created successfully", data });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
  
    // Get All with filter, search, pagination, sort
    getAll: async (req, res) => {
      try {
        const { page = 1, limit = 10, search, sort, ...filters } = req.query;
  
        let query = Model.find(filters);
  
        // Apply text search
        if (search && searchableFields.length > 0) {
          const searchRegex = new RegExp(search, 'i');
          query = query.find({
            $or: searchableFields.map(field => ({ [field]: searchRegex })),
          });
        }
  
        // Apply sort
        if (sort) query = query.sort(sort);
  
        // Pagination
        const total = await Model.countDocuments(query);
        const data = await query.skip((page - 1) * limit).limit(Number(limit));
  
        res.json({ success: true, message: "Fetched successfully", data, total });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
  
    // Get One
    getOne: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, message: "Fetched successfully", data: item });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
  
    // Update
    update: async (req, res) => {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, message: "Updated successfully", data: item });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
  
    // Delete
    remove: async (req, res) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, message: "Deleted successfully" });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    }
  });
  