import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGO_URI = process.env.MONGO_URI;

console.log('🔍 MongoDB Connection Diagnostics\n');
console.log('📋 Configuration:');
console.log('- MONGO_URI exists:', !!MONGO_URI);
console.log('- URI starts with:', MONGO_URI ? MONGO_URI.substring(0, 20) + '...' : 'N/A');
console.log('- URI length:', MONGO_URI ? MONGO_URI.length : 0);

async function testConnection() {
    try {
        console.log('\n⏳ Attempting to connect to MongoDB...');
        console.log('⏰ Start time:', new Date().toISOString());

        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log('\n✅ MongoDB Connected Successfully!');
        console.log('📍 Host:', conn.connection.host);
        console.log('📦 Database:', conn.connection.name);
        console.log('🔌 Connection state:', conn.connection.readyState);
        console.log('⏰ Connected at:', new Date().toISOString());

        await mongoose.connection.close();
        console.log('\n✅ Connection closed gracefully');

    } catch (error) {
        console.log('\n❌ MongoDB Connection Failed!');
        console.log('\n🔍 Error Details:');
        console.log('- Error Name:', error.name);
        console.log('- Error Message:', error.message);

        if (error.message.includes('ENOTFOUND')) {
            console.log('\n⚠️ Issue: DNS/Network Error');
            console.log('Possible causes:');
            console.log('1. No internet connection');
            console.log('2. MongoDB cluster hostname is incorrect');
            console.log('3. Firewall blocking the connection');
        } else if (error.message.includes('authentication failed')) {
            console.log('\n⚠️ Issue: Authentication Error');
            console.log('Possible causes:');
            console.log('1. Incorrect username or password');
            console.log('2. User does not have access to the database');
            console.log('3. IP address not whitelisted in MongoDB Atlas');
        } else if (error.message.includes('timeout')) {
            console.log('\n⚠️ Issue: Connection Timeout');
            console.log('Possible causes:');
            console.log('1. MongoDB Atlas not accessible');
            console.log('2. Network/firewall blocking connection');
            console.log('3. IP address not whitelisted');
        } else if (error.message.includes('bad auth')) {
            console.log('\n⚠️ Issue: Invalid Credentials');
            console.log('Check your MongoDB Atlas:');
            console.log('1. Username and password are correct');
            console.log('2. Password has no special characters that need URL encoding');
            console.log('3. User has proper database permissions');
        }

        console.log('\n📝 Troubleshooting Steps:');
        console.log('1. Check MongoDB Atlas (https://cloud.mongodb.com)');
        console.log('2. Verify your cluster is running');
        console.log('3. Check Network Access - Whitelist your IP (or use 0.0.0.0/0 for testing)');
        console.log('4. Check Database Access - Verify user credentials');
        console.log('5. Test internet connection');

        process.exit(1);
    }
}

testConnection();
