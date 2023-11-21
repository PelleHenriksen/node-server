import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + ".jpg");
  },
});

export const upload = multer({ storage: storage });
