import express from "express";
import {
  subscribe,
  unsubscribe,
  sendNewsletter,
  getSubscriberCount,
} from "../controllers/newsletterController.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/unsubscribe", unsubscribe);
router.post("/send", sendNewsletter);
router.get("/count", getSubscriberCount);

export default router;
