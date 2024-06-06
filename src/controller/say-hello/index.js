import Controller from "../Controller.js";

export const hello = new Controller({
  Path: "/",
  List: (req, res) => {
    return res.json({
      message: "Hello, World!",
      status: 200,
      appName: process.env.APP_NAME,
    });
  },
});
