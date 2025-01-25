import { addToWaitlist, getWaitlistEntries, removeFromWaitlist, getWaitlistStats } from '../services/prisma.js';

export const handleAddToWaitlist = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({
      success: false,
      error: 'Email and role are required',
    });
  }

  const result = await addToWaitlist({ email, role });
  
  if (!result.success) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
};

export const handleGetWaitlist = async (_req, res) => {
  const result = await getWaitlistEntries();
  
  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
};

export const handleDeleteWaitlistEntry = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'ID is required',
    });
  }
  const result = await removeFromWaitlist(id);
  
  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
};

export const handleGetWaitlistStats = async (_req, res) => {
  const result = await getWaitlistStats();
  
  if (!result.success) {
    return res.status(500).json(result);
  }

  res.json(result);
};
