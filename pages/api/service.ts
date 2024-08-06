import type { NextApiRequest, NextApiResponse } from 'next';

const url = 'https://groupy.id/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method == 'POST') {
      
      const cookieValue = process.env.NEXT_PUBLIC_COOKIE;

    if (!cookieValue) {
      return res.status(400).json({ error: 'COOKIE value is undefined' });
    }

    // Perform the POST request to the external API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieValue,
      },
      body: JSON.stringify({}), // Add any required body data here
    });
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'HTTP error! status' });
    }

    // Check the Content-Type header
    const contentType = response.headers.get('Content-Type');
    
    // If the content type is JSON, parse it
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      // Return the data as a JSON response
      return res.status(200).json(data);
    } else {
      // Handle non-JSON response (e.g., plain text)
      const textData = await response.text();
      return res.status(500).json({ error: 'Unexpected response format' });
    }
    } else {
      res.redirect('/');
      return;
  }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
