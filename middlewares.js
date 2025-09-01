//* upload images
const BASE_UPLOAD_DIR = path.resolve('/var/www/html/images');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subFolder = req.query.folder || '';
        const uploadPath = path.join(BASE_UPLOAD_DIR, subFolder);
        if (!fs.existsSync(uploadPath)) { fs.mkdirSync(uploadPath, { recursive: true }); }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});
// example for image middleware using
// server.post('/file-upload', upload.array('image', 10), ((req, res) => { this.FileUpload(req, res); }));
