import { useState, useEffect } from 'react';
import { 
  TextField, 
  TextareaField,
  SelectField, 
  ComboboxField,
  MultiSelectField,
  CheckboxField,
  RadioGroupField,
  SwitchField,
  CalendarField,
  ToggleField,
  NumberField,
  PhoneField,
  CurrencyField,
  SearchField,
  InputOtpField,
  ProgressField,
  TimeField,
  DatetimeField,
  ColorPickerField,
  UploadField,
  type UploadFieldItem
} from '@caeher/react-form-tokns';
import { 
  Mail, 
  User, 
  Layout, 
  Briefcase, 
  Bell, 
  Code,
  Sun,
  Moon,
  Hash,
  DollarSign,
  Calendar,
  Palette,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    // Identity & Contact
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
    bio: 'Experienced fullstack developer with a passion for clean UI.',
    
    // Selection & Options
    role: 'developer',
    country: 'us',
    skills: ['react', 'typescript'],
    status: 'online',
    
    // Data & Configuration
    age: 28,
    budget: 5000,
    searchQuery: '',
    completion: 75,
    verificationCode: '123456',
    
    // Dates & Times
    birthDate: '1995-05-15',
    startTime: '09:00',
    deadline: '2026-12-31T23:59',
    
    // Media & Preferences
    themeColor: '#06b6d4',
    newsletter: true,
    notifications: false,
    publicProfile: true,
    attachments: [] as UploadFieldItem[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Handle different event structures
    const name = e.target?.name;
    const value = e.target?.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target?.value;
    
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCustomChange = (name: string, value: unknown) => {
    setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const sectionClass = `rounded-3xl border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'} p-6 shadow-xl ${isDark ? 'shadow-black/20' : 'shadow-slate-200/50'} backdrop-blur-xl sm:p-8 space-y-6`;
  const sectionTitleClass = `text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2 mb-6`;

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'} px-4 py-12 sm:px-6 sm:py-20 font-sans selection:bg-cyan-500/30`}>
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-wider">
              Component Showcase
            </div>
            <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl ${isDark ? 'bg-gradient-to-b from-white to-slate-400' : 'bg-gradient-to-b from-slate-900 to-slate-600'} bg-clip-text text-transparent`}>
              Form Maker Suite
            </h1>
            <p className={`max-w-2xl text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every field you need to build high-performance, accessible forms. 
              Prop-driven, token-aware, and built for modern React.
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
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Identity & Contact */}
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>
                <User size={20} className="text-cyan-500" />
                Identity & Contact
              </h2>
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
              <div className="grid gap-6 sm:grid-cols-2">
                <PhoneField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className="space-y-1">
                  <label className="text-sm font-medium">Verification</label>
                  <InputOtpField
                    name="verificationCode"
                    length={6}
                    value={formData.verificationCode}
                    onChange={(e) => handleCustomChange('verificationCode', e.target.value)}
                  />
                </div>
              </div>
              <TextareaField
                label="Biographical Note"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </section>

            {/* Selection & Options */}
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>
                <Layout size={20} className="text-purple-500" />
                Selection & Options
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
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
                <ComboboxField
                  label="Primary Location"
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleCustomChange('country', e.target.value)}
                  options={[
                    { label: 'United States', value: 'us' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'Germany', value: 'de' },
                    { label: 'Spain', value: 'es' },
                    { label: 'France', value: 'fr' }
                  ]}
                />
              </div>
              <MultiSelectField
                label="Technical Skills"
                name="skills"
                value={formData.skills}
                onChange={(e) => handleCustomChange('skills', e.target.value)}
                options={[
                  { label: 'React', value: 'react', icon: Code },
                  { label: 'TypeScript', value: 'typescript', icon: Shield },
                  { label: 'Tailwind CSS', value: 'tailwind', icon: Layout },
                  { label: 'Node.js', value: 'node', icon: Activity },
                  { label: 'Python', value: 'python', icon: Code }
                ]}
              />
              <RadioGroupField
                label="Availability Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { label: 'Online', value: 'online' },
                  { label: 'Away', value: 'away' },
                  { label: 'Do Not Disturb', value: 'dnd' }
                ]}
              />
            </section>

            {/* Data & Configuration */}
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>
                <Activity size={20} className="text-emerald-500" />
                Data & Configuration
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <NumberField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleCustomChange('age', e.target.value)}
                  icon={Hash}
                  min={18}
                  max={100}
                />
                <CurrencyField
                  label="Monthly Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => handleCustomChange('budget', e.target.value)}
                  icon={DollarSign}
                  currency="USD"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <SearchField
                  label="Search Components"
                  name="searchQuery"
                  value={formData.searchQuery}
                  onChange={handleChange}
                  placeholder="Search..."
                />
                <ProgressField
                  label="Profile Completion"
                  name="completion"
                  value={formData.completion}
                  onChange={(e) => handleCustomChange('completion', Number(e.target.value))}
                  showValue
                />
              </div>
            </section>

            {/* Dates & Times */}
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>
                <Calendar size={20} className="text-amber-500" />
                Dates & Times
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <CalendarField
                  label="Birth Date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                <TimeField
                  label="Preferred Start Time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <DatetimeField
                label="Project Deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </section>

            {/* Media & Preferences */}
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>
                <Palette size={20} className="text-rose-500" />
                Media & Preferences
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <ColorPickerField
                  label="Theme Accent Color"
                  name="themeColor"
                  value={formData.themeColor}
                  onChange={(e) => handleCustomChange('themeColor', e.target.value)}
                />
                <ToggleField
                  label="Public Profile"
                  name="publicProfile"
                  value={formData.publicProfile}
                  onChange={(e) => handleCustomChange('publicProfile', e.target.value)}
                />
              </div>
              <div className="pt-4 space-y-4">
                <SwitchField
                  inline
                  label="Subscribe to weekly newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleCustomChange('newsletter', e.target.checked)}
                  icon={Mail}
                />
                <SwitchField
                  inline
                  label="Enable push notifications"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={(e) => handleCustomChange('notifications', e.target.checked)}
                  icon={Bell}
                />
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                <CheckboxField
                  label="I agree to the terms and conditions"
                  name="terms"
                  onChange={handleChange}
                />
              </div>
              <UploadField
                label="Portfolio Attachments"
                name="attachments"
                multiple
                value={formData.attachments}
                onChange={(e) => handleCustomChange('attachments', e.target.value)}
                hint="Upload PDF or Images (Max 5MB)"
              />
            </section>
          </div>

          {/* State Preview Sidebar */}
          <div className="lg:col-span-4">
            <div className={`sticky top-8 rounded-3xl border ${isDark ? 'border-cyan-500/20 bg-slate-900/50' : 'border-cyan-500/20 bg-cyan-500/[0.02]'} p-6 backdrop-blur-md`}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Live Data Preview
              </h3>
              <pre className="text-[12px] font-mono leading-relaxed text-slate-300 overflow-x-auto max-h-[600px] custom-scrollbar">
                {JSON.stringify(formData, null, 2)}
              </pre>
              <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>All fields are reactive</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <AlertCircle size={14} className="text-amber-500" />
                    <span>Unsaved changes will persist in session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

