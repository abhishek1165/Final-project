exports.createComplaint = async (req, res) => {
  try {
    const { userName, issue, priority } = req.body;

    
    if (!userName || !issue) {
      return res.status(400).json({ message: 'Both userName and issue are required' });
    }

    const complaint = new Complaint({ userName, issue, priority });
    await complaint.save();
    res.status(201).json(complaint);

  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: 'Failed to log complaint', error: err.message });
  }
};
