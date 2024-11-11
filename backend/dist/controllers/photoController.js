"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotoById = getPhotoById;
exports.getScoresByPhotoId = getScoresByPhotoId;
const photoServices = __importStar(require("../services/photoServices"));
async function getPhotoById(req, res) {
    const photoId = parseInt(req.params.photoId, 10);
    const photo = await photoServices.getPhotoById(photoId);
    if (!photo) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Photo found successfully', photo });
}
async function getScoresByPhotoId(req, res) {
    const photoId = parseInt(req.params.photoId, 10);
    const scoreData = await photoServices.getPhotoWithScoresById(photoId);
    if (!scoreData) {
        return res.status(404).json({ message: 'Score data not found' });
    }
    res.status(200).json({ message: 'Score data found successfully', scoreData });
}
