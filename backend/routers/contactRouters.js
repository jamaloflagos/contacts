const express = require('express')
const router = express.Router()
const {
    getContacts,
    postContact,
    deleteContact,
    updateContact,
    getSingleContact
} = require('../controllers/contactControllers')

const requireAuth = require('../middleware/requireAuth')

// authentication token requirement middleware to protect API endpoint
router.use(requireAuth)

// get request handlers and routers
router.get('/', getContacts)

// delete request handlers and routers
router.delete('/:id', deleteContact)

// post request handlers and routes
router.post('/', postContact)

// get one doc
router.get('/:name', getSingleContact)






// patch request handler
router.patch('/:id', updateContact)



module.exports = router
