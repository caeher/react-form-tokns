import { useState, type ChangeEvent } from 'react';
import {
  Mail,
  User,
  Lock,
  Search,
  MessageSquare,
  Globe,
  Bell,
  CheckCircle,
  Layout,
  Code,
  Palette,
  Briefcase,
  Bold,
  Italic,
  Underline,
  Type,
  Layers
} from 'lucide-react';
import {
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  RadioGroupField,
  SwitchField,
  CalendarField,
  ToggleField,
  NumberField,
  InputOtpField,
  ProgressField,
  TimeField,
  DatetimeField,
  ColorPickerField
} from './components/forms';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    description: '',
    role: 'developer',
    terms: false,
    notifications: 'email',
    darkMode: true,
    birthDate: '1995-05-15', // Standard date
    appointment: '2024-07-10 15:30:00', // DB Format
    inlineSwitch: true,
    // New components
    formatting: ['bold'] as (string | number)[],
    quantity: 5,
    otp: '',
    progress: 65,
    startTime: '09:00',
    meeting: '2024-07-15 14:00',
    accentColor: '#06b6d4'
  });

  type AppChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    | {
      target: {
        name: string;
        value: string | number | (string | number)[];
        type?: string;
        checked?: boolean;
      };
      persist: () => void;
    };

  const handleChange = (e: AppChangeEvent) => {
    const t = e.target;
    if (t && 'type' in t && t.type === 'checkbox' && 'checked' in t) {
      setFormData((prev) => ({
        ...prev,
        [t.name]: t.checked
      }));
      return;
    }
    const { name, value } = t;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-50">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Header Section */}
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
            React Form Tonks
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
            Design System Evolution
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-400">
            Enhanced accessible form components with inline layouts, flexible date parsing, and deep Lucide icon integration.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {/* Default State Preview */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur flex flex-col h-full">
            <div className="mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Layout size={20} className="text-cyan-400" />
                <h2 className="text-xl font-semibold">Standard & Icon Integration</h2>
              </div>
              <p className="text-sm text-slate-400">Components with icons and standard vertical layout.</p>
            </div>

            <form className="space-y-6 flex-1" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="antigravity_dev"
                  icon={User}
                  hint="Unique identifier."
                />
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  icon={Mail}
                  iconPosition="right"
                />
              </div>

              <CalendarField
                label="Date of Birth"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                hint="We use this to verify your age."
              />

              <SelectField
                label="Organization Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={[
                  { label: 'Fullstack Developer', value: 'developer', icon: Code },
                  { label: 'UI/UX Designer', value: 'designer', icon: Palette },
                  { label: 'Project Manager', value: 'pm', icon: Briefcase },
                  { label: 'System Admin', value: 'admin', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }
                ]}
                hint="Choose your primary professional title."
              />

              <TextareaField
                label="Message / Bio"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write something about your experience..."
                icon={MessageSquare}
              />

              <div className="pt-4 border-t border-white/10">
                <RadioGroupField
                  label="Security Permissions"
                  name="notifications"
                  value={formData.notifications}
                  onChange={handleChange}
                  icon={Lock}
                  options={[
                    { label: 'Read-only access (Recommended)', value: 'email' },
                    { label: 'Read and Write access', value: 'push' },
                    { label: 'Full Administrative access', value: 'none' }
                  ]}
                />
              </div>

              <div className="grid gap-6 pt-4 border-t border-white/10 sm:grid-cols-2">
                <SwitchField
                  label="Dark Mode"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={(e) => handleSwitchChange('darkMode', e.target.checked)}
                  icon={Bell}
                />
                <CheckboxField
                  label="Agree to terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  icon={CheckCircle}
                  hint="Required for account activation."
                />
              </div>
            </form>
          </section>

          <div className="space-y-8">
            {/* New Components Preview */}
            <section className="rounded-3xl border border-white/10 bg-indigo-500/[0.03] p-8 shadow-2xl shadow-slate-950/40 backdrop-blur border-indigo-500/20">
              <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Layers size={20} className="text-indigo-400" />
                  <h2 className="text-xl font-semibold">Specialized Fields</h2>
                </div>
                <p className="text-sm text-slate-400">Advanced interaction and data types.</p>
              </div>

              <div className="space-y-6">
                <ToggleField
                  name="formatting"
                  value={formData.formatting}
                  onChange={handleChange}
                  multiple
                  options={[
                    { value: 'bold', icon: Bold, hint: 'Make text bold' },
                    { value: 'italic', icon: Italic, hint: 'Make text italic' },
                    { value: 'underline', icon: Underline, hint: 'Underline text' },
                    { value: 'strike', icon: Type, hint: 'Strikethrough' },
                  ]}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <NumberField
                    label="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min={1}
                    max={100}
                    hint="Units in stock."
                  />
                  <ColorPickerField
                    label="Accent Color"
                    name="accentColor"
                    value={formData.accentColor}
                    onChange={handleChange}
                    format="hex"
                  />
                </div>

                <InputOtpField
                  label="Verification Code"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  length={6}
                  hint="Enter the 6-digit code sent to your phone."
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <TimeField
                    label="Start Time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    use24Hour={false}
                  />
                  <DatetimeField
                    label="Project Meeting"
                    name="meeting"
                    value={formData.meeting}
                    onChange={handleChange}
                  />
                </div>

                <ProgressField
                  label="Setup Completion"
                  value={formData.progress}
                  variant="striped"
                  color="cyan"
                  hint="Finalizing environment..."
                />
              </div>
            </section>

            {/* Inline Layout Preview */}
            <section className="rounded-3xl border border-white/10 bg-cyan-500/[0.03] p-8 shadow-2xl shadow-slate-950/40 backdrop-blur border-cyan-500/20">
              <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Layout size={20} className="text-cyan-400" />
                  <h2 className="text-xl font-semibold">Inline Layouts</h2>
                </div>
                <p className="text-sm text-slate-400">Horizontal alignment for compact forms.</p>
              </div>

              <div className="space-y-6">
                <TextField
                  inline
                  label="Search Project"
                  placeholder="Type to search..."
                  icon={Search}
                />

                <CalendarField
                  inline
                  label="Appointment"
                  name="appointment"
                  value={formData.appointment}
                  onChange={handleChange}
                  hint="Formatted from DB string."
                />

                <SelectField
                  inline
                  label="Region"
                  options={[
                    { label: 'North America', value: 'na', icon: Globe },
                    { label: 'Europe', value: 'eu', icon: Globe },
                    { label: 'Asia Pacific', value: 'ap', icon: Globe }
                  ]}
                />

                <SwitchField
                  inline
                  label="Beta Access"
                  checked={formData.inlineSwitch}
                  onChange={(e) => handleSwitchChange('inlineSwitch', e.target.checked)}
                />
              </div>
            </section>

            {/* Error State Preview */}
            <section className="rounded-3xl border border-white/10 bg-red-500/[0.03] p-8 shadow-2xl shadow-slate-950/40 backdrop-blur border-red-500/20">
              <div className="mb-8 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold text-red-400">Error States</h2>
                <p className="text-sm text-slate-400">Visual feedback for validation failures.</p>
              </div>

              <div className="space-y-6">
                <TextField
                  label="Email"
                  defaultValue="invalid-format"
                  error="This email address is not properly formatted."
                  icon={Mail}
                />

                <InputOtpField
                  label="OTP"
                  error="Invalid or expired code."
                  length={4}
                />

                <NumberField
                  label="Stock"
                  error="Cannot exceed limit."
                  value={150}
                  max={100}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
