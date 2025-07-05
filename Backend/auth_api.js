import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); 

const app = express();
app.use(cors());
const PORT =  3000;
app.get('/signed-url', async (req, res) => {
  try {
    const payload = {
      network: "public",
      expires: 30,
      date: Date.now() + 1000 * 30
    };

    const response = await fetch('https://uploads.pinata.cloud/v3/files/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    console.log(result)
    //console.log(result.errors[0].path);
    res.status(200).json({ url: result.data });
  } catch (error) {
    console.error('Error creating signed URL:', error);
    res.status(500).json({ error: 'Failed to create signed URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
