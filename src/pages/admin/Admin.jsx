import { useMemo, useState } from 'react';
import { createProject, createSkill } from '../../api/api';

const Field = ({ label, hint, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
    {hint ? <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{hint}</span> : null}
    <input
      {...props}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
    />
  </label>
);

const TextArea = ({ label, hint, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
    {hint ? <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{hint}</span> : null}
    <textarea
      {...props}
      className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
    />
  </label>
);

export default function Admin() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem('portfolio-admin-key') || '');
  const [tab, setTab] = useState('project');
  const [status, setStatus] = useState({ type: '', message: '' });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    demo: '',
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    tool: '',
  });

  const canSubmit = useMemo(() => adminKey.trim().length > 0, [adminKey]);

  const saveKey = (value) => {
    setAdminKey(value);
    localStorage.setItem('portfolio-admin-key', value);
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      await createProject({
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        tech: projectForm.tech.trim(),
        github: projectForm.github.trim(),
        demo: projectForm.demo.trim(),
      });
      setStatus({ type: 'success', message: 'ເພີ່ມ Project ສຳເລັດ' });
      setProjectForm({ title: '', description: '', tech: '', github: '', demo: '' });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Create project failed';
      setStatus({ type: 'error', message });
    }
  };

  const submitSkill = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      await createSkill({
        name: skillForm.name.trim(),
        tool: skillForm.tool.trim(),
      });
      setStatus({ type: 'success', message: 'ເພີ່ມ Skill ສຳເລັດ' });
      setSkillForm({ name: '', tool: '' });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Create skill failed';
      setStatus({ type: 'error', message });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Admin</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          ໜ້ານີ້ບໍ່ມີປຸ່ມໃນ Navbar (ເຂົ້າດ້ວຍ URL ເອງ: <span className="font-mono">/admin</span>).
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mb-6">
          <Field
            label="Admin Key"
            hint="ໃສ່ key ທີ່ຕັ້ງໄວ້ໃນ backend (.env: ADMIN_KEY)"
            value={adminKey}
            onChange={(e) => saveKey(e.target.value)}
            placeholder="your-admin-key"
          />
        </div>

        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('project')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'project'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            ເພີ່ມ Project
          </button>
          <button
            type="button"
            onClick={() => setTab('skill')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'skill'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            ເພີ່ມ Skill
          </button>
        </div>

        {status.message ? (
          <div
            className={`mb-6 rounded-xl border p-4 text-sm ${
              status.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-200'
                : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-200'
            }`}
          >
            {status.message}
          </div>
        ) : null}

        {tab === 'project' ? (
          <form onSubmit={submitProject} className="space-y-5">
            <Field
              label="Title"
              value={projectForm.title}
              onChange={(e) => setProjectForm((s) => ({ ...s, title: e.target.value }))}
              placeholder="Project title"
              required
              disabled={!canSubmit}
            />
            <TextArea
              label="Description"
              value={projectForm.description}
              onChange={(e) => setProjectForm((s) => ({ ...s, description: e.target.value }))}
              placeholder="Short description"
              disabled={!canSubmit}
            />
            <Field
              label="Tech (comma separated)"
              value={projectForm.tech}
              onChange={(e) => setProjectForm((s) => ({ ...s, tech: e.target.value }))}
              placeholder="React, Node.js, Prisma"
              disabled={!canSubmit}
            />
            <Field
              label="GitHub URL"
              value={projectForm.github}
              onChange={(e) => setProjectForm((s) => ({ ...s, github: e.target.value }))}
              placeholder="https://github.com/..."
              disabled={!canSubmit}
            />
            <Field
              label="Demo URL"
              value={projectForm.demo}
              onChange={(e) => setProjectForm((s) => ({ ...s, demo: e.target.value }))}
              placeholder="https://..."
              disabled={!canSubmit}
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-opacity disabled:opacity-50"
            >
              ເພີ່ມ Project
            </button>
          </form>
        ) : (
          <form onSubmit={submitSkill} className="space-y-5">
            <Field
              label="Name"
              value={skillForm.name}
              onChange={(e) => setSkillForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="e.g. Frontend"
              required
              disabled={!canSubmit}
            />
            <Field
              label="Tool"
              value={skillForm.tool}
              onChange={(e) => setSkillForm((s) => ({ ...s, tool: e.target.value }))}
              placeholder="e.g. React"
              required
              disabled={!canSubmit}
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-opacity disabled:opacity-50"
            >
              ເພີ່ມ Skill
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

