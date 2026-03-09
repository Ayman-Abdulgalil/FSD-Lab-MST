import { useState } from "react";

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
              <div className="success-icon"></div>
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
                <span className="field-icon"></span>
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
                <span className="error-msg">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon"></span>
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
                <span className="error-msg">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon"></span>
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
                <span className="error-msg">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field">
              <label className="field-label">Confirm Password</label>
              <div className="field-wrap">
                <span className="field-icon"></span>
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
                </button>
              </div>
              {touched.confirm && errors.confirm && (
                <span className="error-msg">{errors.confirm}</span>
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