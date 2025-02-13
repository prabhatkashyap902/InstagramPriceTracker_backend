require("dotenv").config();
const axios = require("axios");

const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const IMAGE_URL = process.env.IMAGE_URL;
const CAPTION = "Hello, this is my first nodejs upload!";

console.log("INSTAGRAM_USER_ID:", INSTAGRAM_USER_ID);
console.log("ACCESS_TOKEN:", ACCESS_TOKEN);
async function uploadToInstagram() {
    try {
        // Step 1: Upload media (image) to Instagram
        const mediaResponse = await axios.post(`https://graph.instagram.com/v18.0/${INSTAGRAM_USER_ID}/media`, {
            image_url: IMAGE_URL,
            caption: CAPTION,
            access_token: ACCESS_TOKEN,
        });

        console.log("Media uploaded:", mediaResponse.data);

        const creationId = mediaResponse.data.id;
        console.log(creationId)

        // Step 2: Publish the media
        const publishResponse = await axios.post(`https://graph.instagram.com/v18.0/${INSTAGRAM_USER_ID}/media_publish`, {
            creation_id: creationId,
            access_token: ACCESS_TOKEN,
        });

        console.log("Media published:", publishResponse.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

uploadToInstagram();
