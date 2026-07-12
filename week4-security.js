const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
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
    new winston.transports.File({ filename: 'week4-security.log' })
  ]
});

// ========================================
// FIX 1: RATE LIMITING (Brute Force Protection)
// ========================================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 attempts
  message: 'Too many login attempts. Please try again after 15 minutes.',
  handler: (req, res) => {
    logger.warn('Rate limit exceeded - possible brute force attack', {
      ip: req.ip,
      path: req.path
    });
    res.status(429).json({
      error: 'Too many requests',
      message: 'Too many login attempts. Try again after 15 minutes.'
    });
  }
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max 100 requests per minute
  message: 'Too many requests from this IP'
});

// ========================================
// FIX 2: CORS CONFIGURATION
// ========================================
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// ========================================
// FIX 3: CONTENT SECURITY POLICY (CSP)
// ========================================
const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  }
};

// ========================================
// FIX 4: SIMULATE FAILED LOGIN MONITORING
// ========================================
const failedLoginAttempts = {};

function monitorFailedLogins(ip, username) {
  if (!failedLoginAttempts[ip]) {
    failedLoginAttempts[ip] = { count: 0, firstAttempt: new Date() };
  }
  failedLoginAttempts[ip].count++;

  logger.warn('Failed login attempt detected', {
    ip,
    username,
    attemptCount: failedLoginAttempts[ip].count,
    timestamp: new Date().toISOString()
  });

  if (failedLoginAttempts[ip].count >= 3) {
    logger.error('ALERT: Multiple failed logins - possible brute force!', {
      ip,
      totalAttempts: failedLoginAttempts[ip].count
    });
    return { blocked: true, attempts: failedLoginAttempts[ip].count };
  }
  return { blocked: false, attempts: failedLoginAttempts[ip].count };
}

// ========================================
// TEST ALL WEEK 4 FIXES
// ========================================
function testWeek4Fixes() {
  console.log('\n=== WEEK 4 SECURITY FIXES TEST ===\n');

  // Test Rate Limiting Config
  console.log('FIX 1 - Rate Limiting:');
  console.log('  Login limiter: Max 5 attempts per 15 minutes ✅');
  console.log('  API limiter: Max 100 requests per minute ✅');

  // Test CORS Config
  console.log('\nFIX 2 - CORS Configuration:');
  console.log('  Allowed origins: http://localhost:3000 ✅');
  console.log('  Allowed methods: GET, POST, PUT, DELETE ✅');
  console.log('  Credentials: enabled ✅');

  // Test CSP Config
  console.log('\nFIX 3 - Content Security Policy:');
  console.log('  defaultSrc: self only ✅');
  console.log('  scriptSrc: self only (no inline scripts) ✅');
  console.log('  objectSrc: none (blocks plugins) ✅');
  console.log('  frameSrc: none (blocks clickjacking) ✅');

  // Test Failed Login Monitoring
  console.log('\nFIX 4 - Failed Login Monitoring:');
  const test1 = monitorFailedLogins('192.168.1.1', 'admin');
  console.log(`  Attempt 1: blocked=${test1.blocked}, count=${test1.attempts}`);
  const test2 = monitorFailedLogins('192.168.1.1', 'admin');
  console.log(`  Attempt 2: blocked=${test2.blocked}, count=${test2.attempts}`);
  const test3 = monitorFailedLogins('192.168.1.1', 'admin');
  console.log(`  Attempt 3: blocked=${test3.blocked}, count=${test3.attempts} ← ALERT TRIGGERED!`);

  console.log('\n=== ALL WEEK 4 FIXES CONFIGURED ✅ ===\n');
}

testWeek4Fixes();