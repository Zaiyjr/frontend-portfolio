import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { getProjects } from '../api/api';

const normalizeTechStack = (tech) => {
  if (Array.isArray(tech)) return tech;
  if (!tech) return [];

  try {
    const parsed = JSON.parse(tech);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return tech.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return String(tech).split(',').map((item) => item.trim()).filter(Boolean);
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((data) => {
        if (!isMounted) return;
        setProjects(data);
        setError('');
      })
      // 🔄 ປ່ຽນຢູ່ບ່ອນ catch ຂອງ useEffect:
.catch((err) => {
  console.error('Failed to load projects', err);
  if (isMounted) {
    setProjects([]);
    // 💡 ປ່ຽນຂໍ້ຄວາມໃຫ້ເໝາະສົມກັບເວັບທີ່ຢູ່ບົນ Cloud
    setError('ບໍ່ສາມາດເຊື່ອມຕໍ່ກັບ Server ໄດ້ໃນຂະນະນີ້. ກະລຸນາລໍຖ້າ 1 ນາທີ ແລ້ວລອງ Refresh ໜ້າເວັບຄືນໃໝ່ (Server ກຳລັງເລີ່ມຕັ້ງຄ່າບູດເຄື່ອງ).');
  }
})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">ຜົນງານໂປເຈັກ</h2>
        <p className="text-slate-600 dark:text-slate-400">Projects ທີ່ຂ້າພະເຈົ້າເຄີຍເຮັດ</p>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          ກຳລັງໂຫຼດຂໍ້ມູນໂປເຈັກ...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          ຍັງບໍ່ມີຂໍ້ມູນໂປເຈັກໃນ backend.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div key={proj.id ?? idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:bg-slate-900 dark:border-slate-800/60 dark:hover:border-slate-700">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <FontAwesomeIcon icon={faLayerGroup} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{proj.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed dark:text-slate-400">{proj.description || 'No description'}</p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {normalizeTechStack(proj.tech).map((t, i) => (
                  <span key={`${t}-${i}`} className="text-xs bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300">{t}</span>
                ))}
              </div>
              
              <div className="flex gap-4 border-t border-slate-200 pt-4 text-sm dark:border-slate-800/60">
                <a href={proj.github || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-slate-950 transition-colors dark:text-slate-400 dark:hover:text-slate-100">
                  <FontAwesomeIcon icon={faGithub} /> Code
                </a>
                <a href={proj.demo || '#'}  target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-500 transition-colors ml-auto dark:text-emerald-400 dark:hover:text-emerald-300">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" /> ເຂົ້າເບິ່ງ
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
