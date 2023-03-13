const authMiddleware = (handler) => (req, res) => {
  if (typeof window !== "undefined") {
    if (localStorage.user !== undefined) {
      res.writeHead(302, { Location: "/login" });
      res.end();
      return;
    }
  }

  return handler(req, res);
};

export default authMiddleware;
