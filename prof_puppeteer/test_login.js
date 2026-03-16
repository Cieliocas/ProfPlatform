const fetch = require('node-fetch');
(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: 'banca@uespi.br', password: '123'})
        });
        const data = await response.json();
        console.log("Local Login Status:", response.status, data.success ? "Success" : "Failed");
    } catch(e) { console.log(e); }
})();
