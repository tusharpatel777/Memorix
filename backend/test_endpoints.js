const verifyBackend = async () => {
    const baseUrl = 'http://localhost:5000/api';
    let token;
    let userId;
    let memoryId;

    console.log('--- Starting Backend Verification ---');

    // 1. Register User
    try {
        console.log('\nTesting Registration...');
        const registerRes = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            })
        });

        if (!registerRes.ok) {
            const err = await registerRes.json();
            throw new Error(`Registration failed: ${JSON.stringify(err)}`);
        }

        const userData = await registerRes.json();
        console.log('✅ Registration Successful');
        token = userData.token;
        userId = userData._id;
    } catch (error) {
        console.error('❌ Registration Failed:', error.message);
        process.exit(1);
    }

    // 2. Login User (Optional since we got token, but good to test)
    // Skipping for brevity, relying on token from register

    // 3. Create Memory
    try {
        console.log('\nTesting Create Memory...');
        const memoryRes = await fetch(`${baseUrl}/memories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Memory',
                description: 'This is a test memory description.',
                media: [], // Testing without file upload for now as fetch multipart is complex without FormData in node
                tags: 'test, memory',
                mood: 'happy',
                isFavorite: 'true'
            })
        });

        if (!memoryRes.ok) {
            const err = await memoryRes.json();
            throw new Error(`Create Memory failed: ${JSON.stringify(err)}`);
        }

        const memoryData = await memoryRes.json();
        console.log('✅ Create Memory Successful');
        memoryId = memoryData._id;
    } catch (error) {
        console.error('❌ Create Memory Failed:', error.message);
    }

    // 4. Get Memories
    try {
        console.log('\nTesting Get Memories...');
        const getRes = await fetch(`${baseUrl}/memories`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!getRes.ok) throw new Error('Get Memories failed');

        const memories = await getRes.json();
        console.log(`✅ Get Memories Successful. Count: ${memories.length}`);
    } catch (error) {
        console.error('❌ Get Memories Failed:', error.message);
    }

    console.log('\n--- Verification Complete ---');
};

verifyBackend();
