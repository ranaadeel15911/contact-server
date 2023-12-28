const express = require('express')
const { getAllContacts, addContacts, editContacts, deleteContacts, getSingleContact } = require('../controllers/contact')
const upload = require('../middlewares/multer')
const router = express.Router()

router.get('/',getAllContacts)
router.post('/add',upload.single('image'),addContacts)
router.put('/:id',upload.single('image'),editContacts)
router.delete('/:id',deleteContacts)
router.get('/:id',getSingleContact)

module.exports = router