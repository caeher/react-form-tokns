import { useState } from 'react';
import { 
  TextField, 
  SelectField, 
  CalendarField, 
  SwitchField, 
  PhoneField,
  Mail,
  User,
  Layout,
  Briefcase,
  Bell,
  Code
} from './components/forms';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'developer',
    birthDate: '1995-05-15',
    phone: '',
    newsletter: true,
    notifications: false
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-50 sm:px-6 sm:py-20 font-sans selection:bg-cyan-500/30">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-wider">
            Interactive Playground
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Form Maker Preview
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Experiment with our premium accessible components in real-time. 
            All fields are controlled and follow industrial-grade design tokens.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Playground Form */}
          <div className="lg:col-span-7">
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
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
              </form>
            </section>
          </div>

          {/* State Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.02] p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Live Data Preview
              </h3>
              <pre className="text-[13px] font-mono leading-relaxed text-slate-300 overflow-x-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-slate-500 italic">
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
