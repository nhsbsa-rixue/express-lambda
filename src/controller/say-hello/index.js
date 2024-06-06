import controller from "../controller.js";

export const hello = new controller({
  Path: "/",
  List: (req, res) => {
    return res.json({
      message: "Hello, World!",
      status: 200,
      appName: process.env.APP_NAME,
    });
  },
});
