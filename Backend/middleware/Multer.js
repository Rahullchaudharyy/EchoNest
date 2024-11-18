import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/All Data/EchoNest(Blog)/Backend")
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname + "EchoNest")
  }
})

export const upload = multer({
  storage,
})


