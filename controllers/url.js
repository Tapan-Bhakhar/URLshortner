const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortURL (req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: ' url is required' });

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render('home', { 
        id: shortID });
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne( { shortId } )
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

async function handleShortURLRedirect (req, res) {
    const shortId = req.params.shortId; // Ensure this matches the route parameter
    try {
        console.log('Received request for shortId:', shortId); // Debugging log
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                }
            },
            { new: true } // Ensure the returned document is the updated one
        );
        console.log('Entry found and updated:', entry); // Debugging log

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error finding and updating URL:', error); // Log the error details
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleShortURLRedirect
}