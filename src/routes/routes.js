// src/routes/nftRoutes.js

const express = require('express');
const router = express.Router();
const { mintNFT, getNFT } = require('../services/suiService');

/**
 * [POST] /api/nft/mint
 * body: { name, description, url }
 */
router.post('/mint', async (req, res) => {
  const { name, description, url } = req.body;
  try {
    const mintResult = await mintNFT(name, description, url);
    // 트랜잭션 결과에서 ObjectId를 추출할 수도 있음
    res.json({
      success: true,
      result: mintResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * [GET] /api/nft/:objectId
 * NFT ObjectID로 조회
 */
router.get('/:objectId', async (req, res) => {
  const { objectId } = req.params;
  try {
    const nftData = await getNFT(objectId);
    res.json({
      success: true,
      data: nftData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
