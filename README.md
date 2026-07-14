# 🔐 Cybersecurity Internship Task — DevelopersHub Corporation

![Cybersecurity](https://img.shields.io/badge/Cybersecurity-Internship-blue)
![OWASP](https://img.shields.io/badge/OWASP-Juice%20Shop-red)
![Node.js](https://img.shields.io/badge/Node.js-v24.17.0-green)
![Python](https://img.shields.io/badge/Python-3.12.10-yellow)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

## 👨‍💻 Intern Information
| Field | Details |
|---|---|
| **Name** | Zamil |
| **Organization** | DevelopersHub Corporation |
| **Track** | Cybersecurity |
| **Application Tested** | OWASP Juice Shop v20.1.1 |
| **Duration** | 6 Weeks |
| **Status** | ✅ Complete |

---

## 📁 Repository Structure

```
internship-task/
├── 📄 README.md
├── 📋 Week1_Report.docx
├── 📋 Week2_Security_Fixes_Report.docx
├── 📋 Week3_Advanced_Testing_Report.docx
├── 📋 Week4_Threat_Detection_Report.docx
├── 📋 Week5_Ethical_Hacking_Report.docx
├── 📋 Week6_Final_Security_Audit_Report.docx
├── 🔧 security-fixes.js
├── 🔧 week4-security.js
├── 🔧 week5-security.js
├── 🔧 week6-security.js
├── 📝 security.log
└── 📝 week6-audit.log
```

---

## 📅 Week 1 — Security Assessment ✅

**Goal:** Identify security vulnerabilities in the OWASP Juice Shop application.

### 🔍 Vulnerabilities Found (12 Total)
| # | Vulnerability | Severity | Location | Method |
|---|---|---|---|---|
| 1 | DOM-Based XSS | 🔴 HIGH | Search Bar | Manual Testing |
| 2 | SQL Injection (Auth Bypass) | 🔴 CRITICAL | Login Page | Manual Testing |
| 3 | SQL Injection | 🔴 HIGH | Multiple | OWASP ZAP |
| 4 | Missing CSP Headers | 🟡 MEDIUM | All Pages | OWASP ZAP |
| 5 | Missing Anti-Clickjacking Header | 🟡 MEDIUM | All Pages | OWASP ZAP |
| 6 | Cross-Domain Misconfiguration | 🟡 MEDIUM | All Pages | OWASP ZAP |
| 7 | Session ID in URL | 🟡 MEDIUM | Auth Flow | OWASP ZAP |
| 8 | Private IP Disclosure | 🟢 LOW | HTTP Responses | OWASP ZAP |
| 9 | Timestamp Disclosure | 🟢 LOW | HTTP Responses | OWASP ZAP |
| 10 | X-Content-Type-Options Missing | 🟢 LOW | All Pages | OWASP ZAP |

### 🛠️ Tools Used
- **OWASP ZAP v2.17.0** — Automated vulnerability scanner
- **Browser DevTools** — Manual XSS and SQL injection testing
- **Node.js v24.17.0** — Application runtime

---

## 📅 Week 2 — Security Fixes & Hardening ✅

**Goal:** Implement security fixes for all identified vulnerabilities.

### 🔧 Fixes Implemented
| # | Fix | Library | Vulnerability Fixed | Status |
|---|---|---|---|---|
| 1 | Input Sanitization | `validator` | XSS — Cross-Site Scripting | ✅ Done |
| 2 | Password Hashing | `bcrypt` | Weak Password Storage | ✅ Done |
| 3 | JWT Authentication | `jsonwebtoken` | Insecure Session Management | ✅ Done |
| 4 | HTTP Security Headers | `helmet` | Missing Security Headers | ✅ Done |
| 5 | Security Logging | `winston` | No Audit Trail | ✅ Done |

### ✅ Test Results
```
=== SECURITY FIXES TEST ===
FIX 1 - XSS Prevention:     ✅ PASS
FIX 2 - Password Hashing:   ✅ PASS
FIX 3 - JWT Authentication: ✅ PASS
FIX 4 - Email Validation:   ✅ PASS
=== ALL FIXES WORKING ✅ ===
```

---

## 📅 Week 3 — Advanced Testing & Reporting ✅

**Goal:** Perform network-level penetration testing and set up security logging.

### 🔍 Nmap Scan Results
| Port | Service | Risk | Recommendation |
|---|---|---|---|
| 135/tcp | Windows RPC | MEDIUM | Restrict via firewall |
| 445/tcp | SMB File Sharing | HIGH | Disable if not needed |
| 8000/tcp | Apache httpd 2.4.54 | MEDIUM | Update Apache version |
| 8080/tcp | HTTP Proxy | LOW | Disable if unused |
| 16992/tcp | Intel AMT | MEDIUM | Restrict network access |

### 🛠️ Tools Used
- **Nmap v7.99** — Network port scanning
- **Winston** — Security event logging
- **OWASP ZAP** — Final automated scan

---

## 📅 Week 4 — Advanced Threat Detection & API Security ✅

**Goal:** Implement real-time threat detection and harden API endpoints.

### 🔧 Security Controls Implemented
| # | Control | Library | Protection |
|---|---|---|---|
| 1 | Rate Limiting | `express-rate-limit` | 5 login attempts per 15 min |
| 2 | CORS Configuration | `cors` | Restricted to localhost:3000 |
| 3 | Content Security Policy | `helmet` | Block inline scripts & frames |
| 4 | Failed Login Monitoring | `winston` | Alert after 3 failed attempts |
| 5 | API Rate Limiting | `express-rate-limit` | 100 requests per minute |

### ✅ Test Results
```
=== WEEK 4 SECURITY FIXES TEST ===
FIX 1 - Rate Limiting:           ✅ PASS
FIX 2 - CORS Configuration:      ✅ PASS
FIX 3 - Content Security Policy: ✅ PASS
FIX 4 - Failed Login Monitor:    ✅ PASS — ALERT triggered at attempt 3
=== ALL WEEK 4 FIXES CONFIGURED ✅ ===
```

---

## 📅 Week 5 — Ethical Hacking & Exploiting Vulnerabilities ✅

**Goal:** Use ethical hacking tools and implement fixes for SQLi and CSRF.

### 🔍 SQLMap Findings
| Field | Details |
|---|---|
| Tool | SQLMap v1.10.7 |
| Target | http://localhost:3000/rest/user/login |
| Vulnerable Parameter | JSON email field (POST) |
| Injection Type | Boolean-based blind SQL injection |
| Database | SQLite |
| Total Requests | 608 HTTP requests tested |

### 🔧 Security Fixes
| # | Fix | Method | Result |
|---|---|---|---|
| 1 | SQL Injection Prevention | Parameterized Queries | ✅ Injection blocked |
| 2 | CSRF Protection | Token validation | ✅ Fake tokens blocked |
| 3 | Input Sanitization | Custom function | ✅ SQL payloads stripped |

### ✅ Test Results
```
=== WEEK 5 ETHICAL HACKING & SECURITY FIXES ===
FIX 1 - SQL Injection Prevention: ✅ PASS
FIX 2 - CSRF Protection:          ✅ PASS — CSRF attack BLOCKED
FIX 3 - Input Sanitization:       ✅ PASS — All payloads sanitized
=== ALL WEEK 5 FIXES WORKING ✅ ===
```

---

## 📅 Week 6 — Advanced Security Audits & Final Report ✅

**Goal:** Conduct final security audits and verify all security measures.

### 🔍 OWASP ZAP — Week 1 vs Week 6 Comparison
| Alert | Week 1 | Week 6 | Status |
|---|---|---|---|
| SQL Injection | ✅ Found | ❌ Not Found | ✅ Fixed |
| Missing Anti-Clickjacking | ✅ Found | ❌ Not Found | ✅ Fixed |
| X-Content-Type-Options | ✅ Found | ❌ Not Found | ✅ Fixed |
| Session ID in URL | ✅ Found | ❌ Not Found | ✅ Fixed |
| CSP Header Not Set | ✅ Found | ✅ Still Present | ⚠️ Partial |
| **Total Alerts** | **10** | **5** | **50% Reduction** |

### 🔍 OWASP Top 10 Compliance
| ID | Vulnerability | Status |
|---|---|---|
| A01 | Broken Access Control | 🔍 MONITORED |
| A02 | Cryptographic Failures | ✅ FIXED |
| A03 | Injection | ✅ FIXED |
| A04 | Insecure Design | 🔍 MONITORED |
| A05 | Security Misconfiguration | ✅ FIXED |
| A06 | Vulnerable Components | 🔍 MONITORED |
| A07 | Auth & Session Failures | ✅ FIXED |
| A08 | Software & Data Integrity | 🔍 MONITORED |
| A09 | Security Logging Failures | ✅ FIXED |
| A10 | Server-Side Request Forgery | 🔍 MONITORED |

### 🔍 Final Penetration Test — All Attacks Blocked
```
✅ XSS via Search Bar:        BLOCKED
✅ SQL Injection via Login:   BLOCKED
✅ Brute Force Login:         BLOCKED
✅ CSRF Attack:               BLOCKED
✅ Missing Security Headers:  FIXED
✅ Clickjacking:              BLOCKED
✅ Sensitive Data Exposure:   FIXED
✅ Cross-Domain Access:       BLOCKED

=== SECURITY AUDIT COMPLETE ✅ ===
=== APPLICATION IS SECURED ✅ ===
```

---

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/zamil28/internship-task.git

# Clone Juice Shop
git clone https://github.com/juice-shop/juice-shop.git
cd juice-shop

# Install dependencies
npm install

# Start the application
npm start

# Open in browser
# http://localhost:3000

# Run security fixes (Week 2)
node security-fixes.js

# Run Week 4 security
node week4-security.js

# Run Week 5 security
node week5-security.js

# Run Week 6 audit
node week6-security.js
```

---

## 🛠️ All Tools Used

| Tool | Version | Purpose | Week |
|---|---|---|---|
| OWASP Juice Shop | v20.1.1 | Target vulnerable application | 1-6 |
| OWASP ZAP | v2.17.0 | Automated vulnerability scanner | 1, 6 |
| Nmap | v7.99 | Network port scanner | 3 |
| SQLMap | v1.10.7 | SQL injection testing | 5 |
| Nikto | v2.x | Web server scanner | 6 |
| Node.js | v24.17.0 | Runtime environment | 1-6 |
| Python | v3.12.10 | SQLMap runtime | 5 |
| Perl | v5.42.2 | Nikto runtime | 6 |
| Git | v2.54.0 | Version control | 1-6 |

---

## 📚 Security Libraries Used

```bash
npm install validator bcrypt jsonwebtoken helmet winston express-rate-limit cors csurf cookie-parser express-slow-down
```

| Library | Purpose |
|---|---|
| `validator` | Input sanitization — prevents XSS |
| `bcrypt` | Password hashing |
| `jsonwebtoken` | JWT authentication |
| `helmet` | HTTP security headers |
| `winston` | Security event logging |
| `express-rate-limit` | Rate limiting — prevents brute force |
| `cors` | Cross-origin resource sharing control |
| `csurf` | CSRF token protection |

---

## 📚 Resources
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SQLMap](https://sqlmap.org/)
- [Nmap](https://nmap.org/)

---
*DevelopersHub Corporation Cybersecurity Internship — 2026* 🔐
