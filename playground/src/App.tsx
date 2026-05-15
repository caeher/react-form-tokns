import { useState } from 'react';
import { 
  TextField, 
  SelectField, 
  CalendarField, 
  SwitchField, 
  PhoneField,
  CheckboxField
} from '@caeher/react-form-tokns';
import { 
  Mail, 
  User, 
  Layout, 
  Briefcase, 
  Bell, 
  Code,
  Sun,
  Moon
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'developer',
    birthDate: '1995-05-15',
    phone: '',
    newsletter: true,
    notifications: false,
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'} px-4 py-12 sm:px-6 sm:py-20 font-sans selection:bg-cyan-500/30`}>
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-wider">
              Interactive Playground
            </div>
            <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl ${isDark ? 'bg-gradient-to-b from-white to-slate-400' : 'bg-gradient-to-b from-slate-900 to-slate-600'} bg-clip-text text-transparent`}>
              Form Maker Preview
            </h1>
            <p className={`max-w-2xl text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Experiment with our premium accessible components in real-time. 
              All fields are controlled and follow industrial-grade design tokens.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-2xl border transition-all ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                : 'bg-black/5 border-black/10 text-slate-900 hover:bg-black/10'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Playground Form */}
          <div className="lg:col-span-7">
            <section className={`rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'} p-6 shadow-2xl ${isDark ? 'shadow-black/50' : 'shadow-slate-200'} backdrop-blur-xl sm:p-8`}>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    icon={User}
                    hint="Enter your legal name"
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    icon={Mail}
                  />
                </div>

                <SelectField
                  label="Professional Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    { label: 'Fullstack Developer', value: 'developer', icon: Code },
                    { label: 'Product Designer', value: 'designer', icon: Layout },
                    { label: 'Project Manager', value: 'pm', icon: Briefcase }
                  ]}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <CalendarField
                    label="Birth Date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  <PhoneField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <SwitchField
                    inline
                    label="Subscribe to newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => handleSwitchChange('newsletter', e.target.checked)}
                    icon={Mail}
                  />
                  <SwitchField
                    inline
                    label="Enable push notifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={(e) => handleSwitchChange('notifications', e.target.checked)}
                    icon={Bell}
                  />
                </div>

                <div className="pt-6 border-t border-white/5">
                  <CheckboxField
                    label="I agree to the terms and conditions"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </section>
          </div>

          {/* State Preview */}
          <div className="lg:col-span-5">
            <div className={`sticky top-8 rounded-3xl border ${isDark ? 'border-cyan-500/20 bg-slate-900/50' : 'border-cyan-500/20 bg-cyan-500/[0.02]'} p-6 backdrop-blur-md`}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Live Data Preview
              </h3>
              <pre className="text-[13px] font-mono leading-relaxed text-slate-300 overflow-x-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
              <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>
                  Change values in the form to see the state update automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
