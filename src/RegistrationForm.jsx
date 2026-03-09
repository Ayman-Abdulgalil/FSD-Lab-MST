import { useState } from "react";

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