# Playwright MCP Security Testing Enhancements

**Labels**: `enhancement`, `security`, `automation`, `high-priority`

## Overview

We have Playwright MCP configured but it's currently underutilized. This issue tracks enhancements to make Playwright a core part of our security testing workflow alongside httpx, naabu, and other tools.

## Current State

✅ **Configured**: Playwright MCP server is set up in `.mcp.json`
✅ **Available**: Tetsuo can invoke Playwright via natural language
✅ **Capabilities**: Full browser automation, multi-browser support, device emulation

❌ **No structured workflows**: Manual ad-hoc usage only
❌ **No security-specific patterns**: Generic browser automation
❌ **No integration**: Not connected with other security tools

## Core Capabilities Available

**Browser Automation**:
- Multi-browser: Chrome, Firefox, WebKit, Edge
- Device emulation (mobile, tablet, desktop)
- Headless and headed modes
- Screenshots, PDFs, video recording

**Security Testing Use Cases**:
- XSS payload validation
- Authentication flow testing
- CSRF token verification
- API endpoint discovery via network monitoring
- Cookie security flag checking
- Client-side vulnerability detection
- Session management testing

**Data Extraction**:
- DOM content scraping
- JavaScript file analysis
- Network request interception
- Console log capture
- Cookie/storage extraction

---

## Enhancement Ideas

### 1. Create Playwright Security Skill

**Goal**: Document security testing patterns and workflows

**Contents**:
```
skills/playwright-security/
├── SKILL.md                    # Quick reference
├── patterns/
│   ├── xss-testing.md         # XSS validation patterns
│   ├── auth-testing.md        # Login and session testing
│   ├── csrf-validation.md     # CSRF token checking
│   ├── api-discovery.md       # API endpoint enumeration
│   └── cookie-analysis.md     # Cookie security checks
└── examples/
    ├── login-flow.md          # Example login testing
    └── api-extraction.md      # Example API discovery
```

**Activation Triggers**:
- "Test this login page"
- "Validate XSS on this input"
- "Check CSRF protection"
- "Discover API endpoints"

**Priority**: High
**Effort**: Medium (4-6 hours)

---

### 2. Build Security Testing Commands

**Goal**: Create slash commands for common Playwright workflows

#### `/playwright-scan <url>`
**Description**: Automated security checks on a target URL

**What it does**:
- Navigate to URL
- Check for HTTPS/security headers
- Validate cookie flags (Secure, HttpOnly, SameSite)
- Search for hardcoded credentials in JavaScript
- Map API endpoints from network traffic
- Check for common vulnerabilities (XSS, open redirects)
- Generate summary report

**Priority**: High
**Effort**: High (8-10 hours)

---

#### `/test-xss <url> <field>`
**Description**: Test XSS vulnerabilities on specific input fields

**What it does**:
- Navigate to URL
- Inject common XSS payloads into specified field
- Check if payload executes or is sanitized
- Test different contexts (HTML, JavaScript, attribute)
- Capture screenshots of results
- Document findings with evidence

**Priority**: Medium
**Effort**: Medium (4-6 hours)

---

#### `/extract-apis <url>`
**Description**: Discover and document API endpoints

**What it does**:
- Navigate to URL and authenticate if needed
- Monitor all network requests (XHR, Fetch, WebSocket)
- Extract unique API endpoints
- Capture request/response examples
- Document authentication methods (Bearer, cookies, headers)
- Export to structured format (JSON/Markdown)

**Priority**: Medium
**Effort**: Medium (3-5 hours)

---

#### `/test-auth <url>`
**Description**: Comprehensive authentication security testing

**What it does**:
- Test login with valid/invalid credentials
- Check for rate limiting on failed attempts
- Validate session token security
- Test logout functionality
- Check for session fixation vulnerabilities
- Verify password reset flow security
- Document authentication mechanisms

**Priority**: High
**Effort**: High (6-8 hours)

---

#### `/check-csrf <url>`
**Description**: Validate CSRF protection on forms

**What it does**:
- Navigate to URL and find all forms
- Check for CSRF tokens in forms
- Test if forms work without tokens
- Validate token uniqueness per session
- Check SameSite cookie attributes
- Generate compliance report

**Priority**: Medium
**Effort**: Low (2-3 hours)

---

### 3. Tool Integration Workflows

**Goal**: Chain Playwright with other security tools

#### Reconnaissance Pipeline
```
httpx (tech detection) → naabu (port scan) → Playwright (browser validation)
```

**Workflow**:
1. httpx MCP identifies web technologies
2. naabu MCP finds open web ports
3. Playwright validates services in browser
4. Extract client-side information
5. Generate comprehensive recon report

**Priority**: High
**Effort**: Medium (5-7 hours)

---

#### Vulnerability Research Chain
```
research skill (CVE lookup) → Playwright (PoC validation)
```

**Workflow**:
1. Research skill finds relevant CVEs
2. Playwright loads PoC code
3. Test vulnerability in target environment
4. Capture evidence (screenshots, logs)
5. Document exploitability

**Priority**: Medium
**Effort**: Medium (4-6 hours)

---

#### Automated Reporting
```
Playwright (findings) → WORK skill templates → Generate report
```

**Workflow**:
1. Playwright captures security issues
2. Extract evidence and details
3. Map to OWASP/MITRE frameworks
4. Populate report templates from WORK skill
5. Generate formatted security report

**Priority**: High
**Effort**: High (8-10 hours)

---

### 4. Security-Specific Playbooks

**Goal**: Document and automate common testing scenarios

**Playbooks to Create**:

1. **Login Security Assessment**
   - Credential testing
   - Session management
   - MFA validation
   - Rate limiting checks

2. **Client-Side Injection Testing**
   - XSS (reflected, stored, DOM-based)
   - HTML injection
   - JavaScript injection
   - Template injection

3. **Session Security Validation**
   - Cookie flags and attributes
   - Session fixation testing
   - Session timeout verification
   - Concurrent session handling

4. **API Security Discovery**
   - Endpoint enumeration
   - Authentication method identification
   - Token extraction and analysis
   - GraphQL/REST API mapping

5. **Access Control Testing**
   - Unauthorized access attempts
   - Horizontal/vertical privilege escalation
   - Direct object reference testing
   - Role-based access validation

**Priority**: Medium
**Effort**: High (10-12 hours for all)

---

## Implementation Phases

### Phase 1: Foundation (Quick Wins)
- [ ] Create Playwright security skill with basic patterns
- [ ] Build `/check-csrf` command
- [ ] Build `/extract-apis` command
- [ ] Document common usage examples

**Timeline**: 1-2 days
**Value**: Immediate usability improvements

---

### Phase 2: Core Workflows (High Impact)
- [ ] Build `/playwright-scan` command
- [ ] Build `/test-auth` command
- [ ] Create reconnaissance pipeline integration
- [ ] Develop XSS testing workflow

**Timeline**: 3-5 days
**Value**: Major security testing capabilities

---

### Phase 3: Advanced Features (Long-term)
- [ ] Build all security playbooks
- [ ] Create vulnerability research chain
- [ ] Develop automated reporting integration
- [ ] Build `/test-xss` advanced command

**Timeline**: 1-2 weeks
**Value**: Comprehensive testing automation

---

## Success Metrics

**Adoption**:
- [ ] Playwright used in 50%+ of web app assessments
- [ ] At least 3 custom commands created and actively used
- [ ] Integration with 2+ other security tools

**Efficiency**:
- [ ] Reduce time for common tests by 50%
- [ ] Automate repetitive browser testing tasks
- [ ] Generate structured reports automatically

**Coverage**:
- [ ] All OWASP Top 10 testable via Playwright
- [ ] Common CVE validation automated
- [ ] Client-side security checks standardized

---

## Examples & Use Cases

### Example 1: Login Security Testing
```
User: "Test the login security at https://example.com/login"

Tetsuo (using Playwright):
1. Navigate to login page
2. Test with common credentials (admin/admin, test/test)
3. Inject SQL injection payloads
4. Check for rate limiting (attempt 20+ failed logins)
5. Validate session cookie security flags
6. Test password reset flow for vulnerabilities
7. Generate security assessment report
```

### Example 2: XSS Discovery
```
User: "Check for XSS vulnerabilities on the search form"

Tetsuo (using Playwright):
1. Navigate to search page
2. Inject payloads: <script>alert(1)</script>, "><script>alert(1)</script>, etc.
3. Test different encoding bypasses
4. Capture screenshots showing execution or sanitization
5. Document vulnerable parameters
6. Map to OWASP A03:2021 - Injection
```

### Example 3: API Endpoint Discovery
```
User: "Map all API endpoints used by this dashboard"

Tetsuo (using Playwright):
1. Navigate to dashboard and authenticate
2. Monitor network traffic as pages load
3. Extract all XHR/Fetch requests
4. Document endpoints, methods, parameters
5. Capture authentication headers/tokens
6. Export to structured JSON for further testing
```

---

## Technical Considerations

**Browser Selection**:
- Default to Chrome for most testing
- Use Firefox for Gecko-specific issues
- Use WebKit for Apple platform testing

**Performance**:
- Headless mode for speed
- Headed mode for visual debugging
- Video recording for evidence

**Security**:
- Isolated browser contexts per test
- Proper credential handling
- Safe payload testing (authorized only)

**Error Handling**:
- Graceful failures on blocked requests
- Timeout handling for slow pages
- Proper cleanup of browser instances

---

## Related Tools & Integration Points

**Current Stack**:
- httpx MCP: Tech stack detection
- naabu MCP: Port scanning
- fabric skill: Threat modeling patterns
- ffuf skill: Web fuzzing guidance
- research skill: CVE and vulnerability research

**Future Integrations**:
- Burp Suite: Send findings to Burp for deeper analysis
- Nuclei: Validate discovered endpoints with Nuclei templates
- Custom MCP servers: Netflix-specific security tools

---

## References

- [Playwright MCP Documentation](https://github.com/microsoft/playwright-mcp)
- [Playwright Security Testing Guide](https://playwright.dev/docs/intro)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [MITRE ATT&CK: Initial Access](https://attack.mitre.org/tactics/TA0001/)
