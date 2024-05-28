const express = require('express');
const {getAddAgent,addAgent,getUpdateAgent,updateAgent,getDeleteAgent,deleteAgent,getAgents} = require('../controllers/agentController');

const router = express.Router();

router.route('/addAgent').get(getAddAgent).post(addAgent);
router.route('/updateAgent').get(getUpdateAgent).put(updateAgent);
router.route('/deleteAgent').get(getDeleteAgent).delete(deleteAgent);
router.route('/listOfAgent').get(getAgents);

module.exports = router;