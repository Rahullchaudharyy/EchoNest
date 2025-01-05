import multer from "multer";
import path from 'path'
import fs from 'fs'

const createDirIfNotExist = (dir) => {
  // Use path.resolve to get the absolute path from the root of the project
  const uploadDir = path.resolve("public", dir); // Ensure this resolves from the root
  if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadPath = "uploads/images"; // Relative path inside public folder
      createDirIfNotExist(uploadPath); // Ensure directory exists
      cb(null, path.resolve("public", uploadPath)); // Correctly resolve to the absolute path
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
})


