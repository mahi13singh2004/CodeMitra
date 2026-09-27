import http from 'http';

const API_HOST = 'localhost';
const API_PORT = 5000;

const testData = {
    title: "Two Sum Problem",
    description: "Find two numbers that add up to target",
    language: "javascript",
    code: `function twoSum(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`
};

function makeRequest(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const postData = data ? JSON.stringify(data) : null;

        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    });
}

async function testAPI() {
    console.log('🚀 Starting API Tests...\n');

    try {
        console.log('📊 Testing Health Endpoint...');
        const healthResponse = await makeRequest('/api/health');
        console.log('✅ Health Check:', healthResponse.data);
        console.log('📋 Status Code:', healthResponse.status);
    } catch (error) {
        console.log('❌ Health Check Failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('🔥 ERROR: Server is not running on localhost:5000');
            console.log('🔧 Run: cd backend && npm run dev');
            return;
        }
    }

    try {
        console.log('\n🧠 Testing AI Hint Endpoint...');
        const hintResponse = await makeRequest('/api/ai/hint', 'POST', testData);
        console.log('✅ Hint Response:', hintResponse.data);
        console.log('📋 Status Code:', hintResponse.status);
    } catch (error) {
        console.log('❌ Hint Failed:', error.message);
    }

    try {
        console.log('\n🐛 Testing AI Debug Endpoint...');
        const debugResponse = await makeRequest('/api/ai/debug', 'POST', testData);
        console.log('✅ Debug Response:', debugResponse.data);
        console.log('📋 Status Code:', debugResponse.status);
    } catch (error) {
        console.log('❌ Debug Failed:', error.message);
    }

    try {
        console.log('\n💡 Testing AI Explain Endpoint...');
        const explainResponse = await makeRequest('/api/ai/explain', 'POST', testData);
        console.log('✅ Explain Response:', explainResponse.data);
        console.log('📋 Status Code:', explainResponse.status);
    } catch (error) {
        console.log('❌ Explain Failed:', error.message);
    }

    try {
        console.log('\n⚠️ Testing Validation (Missing Fields)...');
        const invalidResponse = await makeRequest('/api/ai/hint', 'POST', { title: "Test" });
        if (invalidResponse.status === 400) {
            console.log('✅ Validation Working:', invalidResponse.data);
        } else {
            console.log('❌ Should have failed validation:', invalidResponse.data);
        }
        console.log('📋 Status Code:', invalidResponse.status);
    } catch (error) {
        console.log('❌ Unexpected validation error:', error.message);
    }

    console.log('\n🏁 API Tests Completed!');
}

testAPI().catch(console.error);
