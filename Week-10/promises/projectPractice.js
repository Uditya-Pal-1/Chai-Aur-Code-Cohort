// Example
async function registerUser() {
  try {

    await collectData();
    validateUserEmail(); 
    await insertDb();
    
    // Non-critical tasks can run in background 
    sendEmail(); 
    sendPushNotification();
    
    return 'User registered successfully';
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Rethrow to handle in .catch()
  }
}

registerUser()
  .then((message) => console.log('Done:', message))
  .catch((err) => console.log('Something went wrong:', err)); // Fixed semicolon here
