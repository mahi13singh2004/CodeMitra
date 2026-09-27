import http from 'http';

const API_HOST = 'localhost';
const API_PORT = 5000;

const testData = {
    title: "Cache Test Problem",
    description: "Testing cache functionality",
    language: "javascript",
    code: "console.log('test');"
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

async function testCache() {
    console.log('🧪 Testing Redis Cache Functionality...\n');

    try {
        console.log('📞 First API call (should be Cache MISS):');
        console.log('⏰ Request Time:', new Date().toISOString());
        const start1 = Date.now();

        const response1 = await makeRequest('/api/ai/hint', 'POST', testData);
        const time1 = Date.now() - start1;

        console.log('✅ Response 1:', response1.data);
        console.log('⚡ Response Time:', time1 + 'ms');
        console.log('📋 Status:', response1.status);

        console.log('\n⏳ Waiting 2 seconds before second call...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('📞 Second API call (should be Cache HIT):');
        console.log('⏰ Request Time:', new Date().toISOString());
        const start2 = Date.now();

        const response2 = await makeRequest('/api/ai/hint', 'POST', testData);
        const time2 = Date.now() - start2;

        console.log('✅ Response 2:', response2.data);
        console.log('⚡ Response Time:', time2 + 'ms');
        console.log('📋 Status:', response2.status);

        console.log('\n📊 Cache Analysis:');
        console.log('🔍 Same response content?', JSON.stringify(response1.data) === JSON.stringify(response2.data));
        console.log('⚡ Significant speed difference?', time1 > (time2 * 2));
        console.log('📈 First call time:', time1 + 'ms');
        console.log('📈 Second call time:', time2 + 'ms');

        if (time2 < 50) {
            console.log('✅ Fast response suggests cache HIT');
        } else if (time1 > (time2 * 2)) {
            console.log('✅ Significant speed improvement suggests cache HIT');
        } else {
            console.log('⚠️ No significant speed improvement - cache might not be working');
        }

    } catch (error) {
        console.log('❌ Cache test failed:', error.message);
    }

    console.log('\n📝 Check your backend terminal for cache logs:');
    console.log('   - "Cache hit" or "Cache miss - Calling Gemini API"');
}

testCache().catch(console.error);
