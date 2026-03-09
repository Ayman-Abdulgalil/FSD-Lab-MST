import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .reg-root {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .reg-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    top: -150px;
    right: -100px;
    pointer-events: none;
  }

  .reg-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%);
    bottom: -100px;
    left: -50px;
    pointer-events: none;
  }

  .reg-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 24px;
    padding: 3rem;
    width: 100%;
    max-width: 460px;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reg-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 100px;
    padding: 4px 14px;
    font-size: 11px;
    font-weight: 500;
    color: #818cf8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .reg-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    box-shadow: 0 0 6px #6366f1;
  }

  .reg-title {
    font-size: 2rem;
    font-weight: 700;
    color: #f1f5f9;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    letter-spacing: -0.03em;
  }

  .reg-subtitle {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .reg-form { display: flex; flex-direction: column; gap: 1.25rem; }

  .field { display: flex; flex-direction: column; gap: 6px; }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
  }

  .field-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon {
    position: absolute;
    left: 14px;
    color: #475569;
    pointer-events: none;
    transition: color 0.2s;
    display: flex;
  }

  .field-input {
    width: 100%;
    background: #0d0d14;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 12px 42px 12px 42px;
    font-size: 0.9rem;
    color: #e2e8f0;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field-input::placeholder { color: #334155; }

  .field-input:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  .field-input:focus + .field-icon-right ~ .field-icon,
  .field-wrap:focus-within .field-icon { color: #6366f1; }

  .field-input.has-error {
    border-color: rgba(239,68,68,0.5);
    box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
  }

  .field-input.is-valid {
    border-color: rgba(34,197,94,0.4);
  }

  .toggle-btn {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    color: #475569;
    cursor: pointer;
    padding: 0;
    display: flex;
    transition: color 0.2s;
  }

  .toggle-btn:hover { color: #94a3b8; }

  .error-msg {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #f87171;
    font-family: 'JetBrains Mono', monospace;
    animation: errIn 0.2s ease both;
  }

  @keyframes errIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 2px;
  }

  .strength-segment {
    height: 3px;
    flex: 1;
    border-radius: 99px;
    background: rgba(255,255,255,0.06);
    transition: background 0.3s;
  }

  .strength-segment.active-weak   { background: #ef4444; }
  .strength-segment.active-fair   { background: #f59e0b; }
  .strength-segment.active-good   { background: #6366f1; }
  .strength-segment.active-strong { background: #22c55e; }

  .strength-label {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    margin-top: 4px;
  }
  .label-weak   { color: #ef4444; }
  .label-fair   { color: #f59e0b; }
  .label-good   { color: #6366f1; }
  .label-strong { color: #22c55e; }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 0.5rem 0;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(99,102,241,0.35);
    margin-top: 0.5rem;
  }

  .submit-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(99,102,241,0.45);
  }

  .submit-btn:active { transform: translateY(0); }

  .submit-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .signin-link {
    text-align: center;
    font-size: 13px;
    color: #475569;
    margin-top: 1.25rem;
  }

  .signin-link a {
    color: #818cf8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .signin-link a:hover { color: #a5b4fc; text-decoration: underline; }

  .success-overlay {
    position: absolute;
    inset: 0;
    background: #13131a;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    animation: fadeIn 0.4s ease both;
  }

  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

  .success-icon {
    width: 64px;
    height: 64px;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #22c55e;
  }

  .success-title { font-size: 1.5rem; font-weight: 700; color: #f1f5f9; }
  .success-sub   { font-size: 0.875rem; color: #64748b; text-align: center; }
`;

// ── tiny SVG icons ──────────────────────────────────────────────
const IconUser    = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const IconMail    = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>;
const IconLock    = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconEye     = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconAlert   = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconCheck   = () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;

// ── helpers ─────────────────────────────────────────────────────
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const getStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 6)  s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
};

const strengthMeta = [
  { label: "Weak",   cls: "weak"   },
  { label: "Fair",   cls: "fair"   },
  { label: "Good",   cls: "good"   },
  { label: "Strong", cls: "strong" },
];

// ── component ───────────────────────────────────────────────────
export default function RegistrationForm() {
  const [fields, setFields] = useState({ name:"", email:"", password:"", confirm:"" });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name:     !fields.name.trim()             ? "Name is required" : "",
    email:    !fields.email                   ? "Email is required"
            : !validateEmail(fields.email)    ? "Enter a valid email address" : "",
    password: !fields.password                ? "Password is required"
            : fields.password.length < 6      ? "Password must be at least 6 characters" : "",
    confirm:  !fields.confirm                 ? "Please confirm your password"
            : fields.confirm !== fields.password ? "Passwords do not match" : "",
  };

  const isFormValid = Object.values(errors).every(e => !e);
  const strength    = getStrength(fields.password);

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));
  const blur = (k) => ()  => setTouched(t => ({ ...t, [k]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name:true, email:true, password:true, confirm:true });
    if (isFormValid) setSubmitted(true);
  };

  const inputClass = (k) =>
    "field-input" +
    (touched[k] && errors[k] ? " has-error" : "") +
    (touched[k] && !errors[k] && fields[k] ? " is-valid" : "");

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        <div className="reg-card">

          {submitted && (
            <div className="success-overlay">
              <div className="success-icon"><IconCheck /></div>
              <p className="success-title">You're all set!</p>
              <p className="success-sub">Account created successfully.<br/>Welcome aboard.</p>
            </div>
          )}

          <div className="reg-badge">New Account</div>
          <h1 className="reg-title">Create your<br/>account</h1>
          <p className="reg-subtitle">Join thousands already using our platform.</p>

          <form className="reg-form" onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="field">
              <label className="field-label">Full Name</label>
              <div className="field-wrap">
                <span className="field-icon"><IconUser /></span>
                <input
                  className={inputClass("name")}
                  type="text"
                  placeholder="Jane Doe"
                  value={fields.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  autoComplete="name"
                />
              </div>
              {touched.name && errors.name && (
                <span className="error-msg"><IconAlert />{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon"><IconMail /></span>
                <input
                  className={inputClass("email")}
                  type="email"
                  placeholder="jane@example.com"
                  value={fields.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  autoComplete="email"
                />
              </div>
              {touched.email && errors.email && (
                <span className="error-msg"><IconAlert />{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon"><IconLock /></span>
                <input
                  className={inputClass("password")}
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={fields.password}
                  onChange={set("password")}
                  onBlur={blur("password")}
                  autoComplete="new-password"
                />
                <button type="button" className="toggle-btn" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
              {fields.password && (
                <>
                  <div className="strength-bar">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`strength-segment ${i <= strength ? `active-${strengthMeta[strength-1].cls}` : ""}`} />
                    ))}
                  </div>
                  <span className={`strength-label label-${strengthMeta[Math.max(strength-1,0)].cls}`}>
                    {strength > 0 ? `${strengthMeta[strength-1].label} password` : ""}
                  </span>
                </>
              )}
              {touched.password && errors.password && (
                <span className="error-msg"><IconAlert />{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field">
              <label className="field-label">Confirm Password</label>
              <div className="field-wrap">
                <span className="field-icon"><IconLock /></span>
                <input
                  className={inputClass("confirm")}
                  type={showCf ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={fields.confirm}
                  onChange={set("confirm")}
                  onBlur={blur("confirm")}
                  autoComplete="new-password"
                />
                <button type="button" className="toggle-btn" onClick={() => setShowCf(v => !v)}>
                  {showCf ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
              {touched.confirm && errors.confirm && (
                <span className="error-msg"><IconAlert />{errors.confirm}</span>
              )}
            </div>

            <div className="divider" />

            <button className="submit-btn" type="submit">
              Create Account →
            </button>
          </form>

          <p className="signin-link">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}