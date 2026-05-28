import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const languages = [
    'JavaScript',
    'TypeScript',    
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16 lg:py-20 min-h-[calc(100vh-10rem)]">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit animate-pulse dark:text-emerald-400">
          🟢 Available for Internships & Projects
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          ສະບາຍດີ, ຂ້າພະເຈົ້າແມ່ນ <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed dark:text-slate-400">
          ຂ້າພະເຈົ້າ ເປັນນັກພັດທະນາຊັອບແວ Full-Stack ທີ່ມັກໃນສາຍງານການພັດທະນາລະບົບ ບໍ່ວ່າຈະເປັນ Website, Application ມັກແກ້ໄຂບັນຫາຕ່າງໆ.
          ການ Coding ເປັນສິ່ງທີ່ເຮັດໃຫ້ ຂ້າພະເຈົ້າ enjoy&happy ຕອນທີ່ສາມາດແກ້ໄຂຂໍ້ຜິດພາດຂອງ code ໄດ້. ດັ່ງນັ້ນ, ຂ້າພະເຈົ້າ ຫວັງວ່າ ໃນອານາຄົດ ເຮົາຈະຊ່ວຍກັນຊຸກຍູ້ການພັດທະນາເຕັກໂນໂລຊີບ້ານເຮົາໃຫ້ທັນສະໄໝ.
  
        </p>
           
           <h1 className="font-bold  text-3xl text-emerald-600">Technologies Used:</h1>

        <div className="pt-2">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Programming Languages & Frameworks</p>
          </div>
          <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
            <div className="flex min-w-max gap-2">
              {languages.map((language) => (
                <span
                  key={language}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>

        

        
        <div className="flex flex-wrap gap-4 pt-4">
          <Link 
            to="/projects" 
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            ເບິ່ງຜົນງານໂປເຈັກ
            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/contact" 
            className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-6 py-3 rounded-xl transition-all duration-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800"
          >
            ຕິດຕໍ່ງານ
          </Link>
        </div>

        <div className="flex gap-5 pt-8 text-slate-500 text-xl dark:text-slate-500">
          <a href="#" className="hover:text-emerald-400 transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
          <a href="#" className="hover:text-emerald-400 transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="#" className="hover:text-emerald-400 transition-colors"><FontAwesomeIcon icon={faFileLines} /></a>
        </div>
     
      </div>
      <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
        <img 
          src="/assets/images/my-pic.JPG" 
          alt="My Pic" 
          className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200 dark:ring-slate-800"
        />
      </div>
      </div>
    </div>
  );
}
