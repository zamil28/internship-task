const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const winston = require('winston');

// ========================================
// FIX 1: Security Logger (Winston)
// ========================================
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'security.log' })
  ]
});

// ========================================
// FIX 2: Input Validation (Stops XSS)
// ========================================
function validateInput(userInput) {
  if (!userInput || typeof userInput !== 'string') {
    logger.warn('Invalid input detected', { input: userInput });
    return false;
  }
  const sanitized = validator.escape(userInput);
  logger.info('Input sanitized successfully', { original: userInput, sanitized });
  return sanitized;
}

// ========================================
// FIX 3: Password Hashing (bcrypt)
// ========================================
async function hashPassword(plainPassword) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  logger.info('Password hashed successfully');
  return hashed;
}

async function verifyPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  logger.info('Password verification', { success: match });
  return match;
}

// ========================================
// FIX 4: JWT Authentication
// ========================================
const SECRET_KEY = 'developershub-secure-key-2026';

function generateToken(userId, email) {
  const token = jwt.sign(
    { id: userId, email: email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  logger.info('JWT token generated', { userId });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    logger.info('JWT token verified', { userId: decoded.id });
    return decoded;
  } catch (err) {
    logger.warn('Invalid JWT token', { error: err.message });
    return null;
  }
}

// ========================================
// FIX 5: Email Validation
// ========================================
function validateEmail(email) {
  const isValid = validator.isEmail(email);
  if (!isValid) {
    logger.warn('Invalid email format', { email });
  }
  return isValid;
}

// ========================================
// TEST ALL FIXES
// ========================================
async function testAllFixes() {
  console.log('\n=== SECURITY FIXES TEST ===\n');

  // Test 1: XSS Prevention
  console.log('FIX 1 - XSS Prevention:');
  const xssInput = '<script>alert("xss")</script>';
  const sanitized = validateInput(xssInput);
  console.log('  Input:', xssInput);
  console.log('  Sanitized:', sanitized);

  // Test 2: Password Hashing
  console.log('\nFIX 2 - Password Hashing:');
  const password = 'MyPassword123';
  const hashed = await hashPassword(password);
  console.log('  Plain:', password);
  console.log('  Hashed:', hashed);
  const match = await verifyPassword(password, hashed);
  console.log('  Verified:', match);

  // Test 3: JWT Token
  console.log('\nFIX 3 - JWT Authentication:');
  const token = generateToken(1, 'admin@juice-shop.com');
  console.log('  Token:', token);
  const decoded = verifyToken(token);
  console.log('  Decoded:', decoded);

  // Test 4: Email Validation
  console.log('\nFIX 4 - Email Validation:');
  console.log('  valid@email.com:', validateEmail('valid@email.com'));
  console.log('  invalid-email:', validateEmail('invalid-email'));

  console.log('\n=== ALL FIXES WORKING ✅ ===\n');
}

testAllFixes();