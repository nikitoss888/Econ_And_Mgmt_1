const { Router } = require('express');
const BriefController = require('../controllers/BriefController');
const auth = require('../middleware/AuthMiddleware');

const router = Router();

router.post('/', BriefController.create);
router.get('/', auth, BriefController.getAll);
router.get('/:id', auth, BriefController.getOne);
router.delete('/:id', auth, BriefController.delete);

module.exports = router;