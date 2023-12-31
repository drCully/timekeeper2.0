const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT)

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.getUsers
  )
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.createUser
  )
router.route('/lookup').get(userController.lookupUser)
router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.getUser)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.updateUser
  )

module.exports = router
