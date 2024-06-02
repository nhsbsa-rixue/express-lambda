import Controller from "../controller.js";

export const hello = new Controller({
  Path: "/",
  Get: (req, res) => {
    return res.json({
      message: "Hello, World!",
      status: 200,
      appName: process.env.APP_NAME,
    });
  },
});
