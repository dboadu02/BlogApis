export const isUser = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (userId !== id) {
    return res.status(403).json({ message: "You are not authorized" });
  }
  next();
};
