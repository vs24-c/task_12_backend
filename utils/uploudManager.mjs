import multer, { memoryStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + file.originalname);
//   },
// })
const storage = memoryStorage()
// const upload = multer({storage: storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => { 
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Not an image! Please upload an image.'), false)
    }
  }
})

export default upload;