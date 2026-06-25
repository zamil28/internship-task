# 🔐 Cybersecurity Internship Task — DevelopersHub Corporation

![Cybersecurity](https://img.shields.io/badge/Cybersecurity-Internship-blue)
![OWASP](https://img.shields.io/badge/OWASP-Juice%20Shop-red)
![Node.js](https://img.shields.io/badge/Node.js-v24.17.0-green)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

## 👨‍💻 Intern Information
| Field | Details |
|---|---|
| **Name** | Zamil |
| **Organization** | DevelopersHub Corporation |
| **Track** | Cybersecurity |
| **Application Tested** | OWASP Juice Shop v20.1.1 |

---

## 📅 Week 1 — Security Assessment ✅

### 🔍 Vulnerabilities Found
| # | Vulnerability | Severity | Location |
|---|---|---|---|
| 1 | DOM-Based XSS | 🔴 HIGH | Search Bar |
| 2 | SQL Injection (Auth Bypass) | 🔴 CRITICAL | Login Page |
| 3 | Missing CSP Headers | 🟡 MEDIUM | All Pages |
| 4 | Missing Anti-Clickjacking Header | 🟡 MEDIUM | All Pages |
| 5 | Cross-Domain Misconfiguration | 🟡 MEDIUM | All Pages |
| 6 | Session ID in URL | 🟡 MEDIUM | Auth Flow |
| 7 | Private IP Disclosure | 🟢 LOW | HTTP Responses |
| 8 | Timestamp Disclosure | 🟢 LOW | HTTP Responses |
| 9 | X-Content-Type-Options Missing | 🟢 LOW | All Pages |
| 10 | Modern Web Application Info | ℹ️ INFO | All Pages |

### 🛠️ Tools Used
- **OWASP ZAP v2.17.0** — Automated vulnerability scanner
- **Browser DevTools** — Manual XSS and SQL injection testing
- **Node.js v24.17.0** — Application runtime

### 📄 Report
- `Week1_Report.docx` — Full security assessment report with screenshots

---

## 📅 Week 2 — Security Fixes & Hardening ✅

### 🔧 Fixes Implemented
| # | Fix | Library | Vulnerability Fixed |
|---|---|---|---|
| 1 | Input Sanitization | `validator` | XSS — Cross-Site Scripting |
| 2 | Password Hashing | `bcrypt` | Weak Password Storage |
| 3 | JWT Authentication | `jsonwebtoken` | Insecure Session Management |
| 4 | HTTP Security Headers | `helmet` | Missing Security Headers |
| 5 | Security Logging | `winston` | No Audit Trail |

### ✅ Test Results
```
=== SECURITY FIXES TEST ===

FIX 1 - XSS Prevention:     ✅ PASS — Input sanitized successfully
FIX 2 - Password Hashing:   ✅ PASS — bcrypt hash verified
FIX 3 - JWT Authentication: ✅ PASS — Token generated & decoded
FIX 4 - Email Validation:   ✅ PASS — Valid/invalid emails detected

=== ALL FIXES WORKING ✅ ===
```

### 📄 Files
- `security-fixes.js` — All security fixes implementation
- `Week2_Security_Fixes_Report.docx` — Full report with screenshots

---

## 📅 Week 3 — Advanced Testing & Reporting 🔄

> Coming soon...
- Penetration testing with Nmap
- Final comprehensive report

---

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/zamil28/internship-task.git

# Go to juice-shop directory
cd juice-shop

# Install dependencies
npm install

# Start the application
npm start

# Open in browser
http://localhost:3000

# Run security fixes
node security-fixes.js
```

---

## 📚 Resources
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---
*DevelopersHub Corporation Cybersecurity Internship — 2026*
