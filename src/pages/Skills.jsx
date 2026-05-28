import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { getSkills } from '../api/api';

const groupSkills = (skills) => {
  if (!Array.isArray(skills)) return [];

  if (skills.some((skill) => Array.isArray(skill.items))) {
    return skills.map((skill) => ({
      category: skill.category_name || skill.category || skill.tool || 'Skills',
      items: skill.items || [],
    }));
  }

  const groups = skills.reduce((acc, skill) => {
    const category = skill.category || skill.tool || 'Skills';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return Object.entries(groups).map(([category, items]) => ({ category, items }));
};

export default function Skills() {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getSkills()
      .then(data => {
        if (!isMounted) return;
        setSkillGroups(groupSkills(data));
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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">ທັກສະຄວາມສາມາດ</h2>
        <p className="text-slate-600 dark:text-slate-400">ເຄື່ອງມື ແລະ ເຕັກໂນໂລຊີທີ່ຂ້ອຍໃຊ້ໃນການພັດທະນາຊອບແວຣ໌.</p>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          ກຳລັງໂຫຼດຂໍ້ມູນ...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && skillGroups.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          ຍັງບໍ່ມີຂໍ້ມູນທັກສະໃນ backend.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((cat, idx) => (
          <div key={`${cat.category}-${idx}`} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm dark:bg-slate-900/50 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
               <FontAwesomeIcon icon={faLaptopCode} className="text-emerald-500" />
               <h3 className="text-lg font-bold">{cat.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill, i) => (
                <span 
                  key={skill.id ?? `${skill.name}-${i}`} 
                  className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:border-emerald-500/40 transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
