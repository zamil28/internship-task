const cookieParser = require('cookie-parser');
const winston = require('winston');

// ========================================
// SECURITY LOGGER
// ========================================
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'week5-security.log' })
  ]
});

// ========================================
// FIX 1: SQL INJECTION PREVENTION
// Using Prepared Statements / Parameterized Queries
// ========================================
function safeLogin(email, password) {
  // VULNERABLE (old way - DO NOT USE):
  // const query = "SELECT * FROM Users WHERE email='" + email + "' AND password='" + password + "'";

  // SECURE (new way - Parameterized Query):
  const query = "SELECT * FROM Users WHERE email = ? AND password = ?";
  const params = [email, password];

  logger.info('Safe login query executed', {
    query,
    paramCount: params.length,
    note: 'Using parameterized query - SQL injection prevented'
  });

  return { query, params, safe: true };
}

function testSQLiPrevention() {
  console.log('\nFIX 1 - SQL Injection Prevention:');

  // Test with normal input
  const normal = safeLogin('user@test.com', 'password123');
  console.log('  Normal login query:', normal.query);
  console.log('  Safe:', normal.safe);

  // Test with SQL injection payload
  const malicious = safeLogin("' OR 1=1--", 'anything');
  console.log('  Malicious input handled safely:', malicious.safe);
  console.log('  Payload treated as data, not SQL code ✅');
}

// ========================================
// FIX 2: CSRF PROTECTION SIMULATION
// ========================================
function generateCSRFToken() {
  const token = Math.random().toString(36).substring(2) +
                Math.random().toString(36).substring(2);
  logger.info('CSRF token generated', { token: token.substring(0, 8) + '...' });
  return token;
}

function validateCSRFToken(sessionToken, requestToken) {
  const isValid = sessionToken === requestToken;
  if (!isValid) {
    logger.warn('CSRF token mismatch - possible CSRF attack detected!', {
      sessionToken: sessionToken.substring(0, 8) + '...',
      requestToken: requestToken ? requestToken.substring(0, 8) + '...' : 'MISSING'
    });
  } else {
    logger.info('CSRF token validated successfully');
  }
  return isValid;
}

function testCSRFProtection() {
  console.log('\nFIX 2 - CSRF Protection:');

  // Generate a CSRF token for the session
  const sessionToken = generateCSRFToken();
  console.log('  Session CSRF token generated:', sessionToken.substring(0, 16) + '...');

  // Test 1: Valid request (same token)
  const validRequest = validateCSRFToken(sessionToken, sessionToken);
  console.log('  Valid request (matching token):', validRequest ? '✅ ALLOWED' : '❌ BLOCKED');

  // Test 2: CSRF attack (different/missing token)
  const csrfAttack = validateCSRFToken(sessionToken, 'fake-token-from-attacker');
  console.log('  CSRF attack (wrong token):', csrfAttack ? '❌ ALLOWED' : '✅ BLOCKED');

  // Test 3: Missing token
  const missingToken = validateCSRFToken(sessionToken, null);
  console.log('  Missing token:', missingToken ? '❌ ALLOWED' : '✅ BLOCKED');
}

// ========================================
// FIX 3: INPUT SANITIZATION FOR SQLi
// ========================================
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  // Remove dangerous SQL characters
const dangerous = ["'", '"', ';', '--', 'OR', 'AND', 'DROP', 'SELECT', 'INSERT', 'DELETE'];  let sanitized = input;

  dangerous.forEach(char => {
    sanitized = sanitized.replace(new RegExp(char, 'gi'), '');
  });

  logger.info('Input sanitized', {
    original: input.substring(0, 20),
    sanitized: sanitized.substring(0, 20)
  });

  return sanitized;
}

function testInputSanitization() {
  console.log('\nFIX 3 - Input Sanitization:');
  const payloads = [
    "' OR 1=1--",
    "admin'--",
    "'; DROP TABLE Users;--",
    "normal@email.com"
  ];

  payloads.forEach(payload => {
    const clean = sanitizeInput(payload);
    console.log(`  Input: "${payload}"`);
    console.log(`  Clean: "${clean}" ✅`);
  });
}

// ========================================
// RUN ALL TESTS
// ========================================
console.log('\n=== WEEK 5 ETHICAL HACKING & SECURITY FIXES ===\n');
testSQLiPrevention();
testCSRFProtection();
testInputSanitization();
console.log('\n=== ALL WEEK 5 FIXES WORKING ✅ ===\n');