const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleShortURLRedirect } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/:shortId', handleShortURLRedirect)

module.exports = router;