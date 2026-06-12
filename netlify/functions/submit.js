exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: 'Server configuration error' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid request body' };
  }

  const { firstName, lastName, email, phone, address } = body;

  if (!firstName || !lastName || !email || !phone || !address) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const payload = {
    source: 'Storied Homes Walking Tour Sign-Up',
    type: 'Registration',
    person: {
      firstName,
      lastName,
      emails:    [{ value: email,    type: 'home'   }],
      phones:    [{ value: phone,    type: 'mobile' }],
      addresses: [{ street: address, type: 'home'   }],
      tags: ['Walking Tour', 'Newsletter', 'Storied Homes']
    }
  };

  const credentials = Buffer.from(apiKey + ':').toString('base64');

  const fubResponse = await fetch('https://api.followupboss.com/v1/events', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + credentials,
      'X-System':      'Storied Homes Walking Tour Form',
      'X-System-Key':  'storied-homes-walking-tour-2025'
    },
    body: JSON.stringify(payload)
  });

  if (fubResponse.ok) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } else {
    const errText = await fubResponse.text();
    console.error('FUB error:', fubResponse.status, errText);
    return { statusCode: 502, body: errText };
  }
};
