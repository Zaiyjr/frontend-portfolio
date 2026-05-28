import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 ">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-2">ຕິດຕໍ່ຂ້ອຍ</h2>
        <p className="text-slate-600 dark:text-slate-400">ສົນໃຈຮ່ວມງານ, ສອບຖາມຂໍ້ມູນ ຫຼື ຢາກແລກປ່ຽນຄວາມຮູ້ ສາມາດຕິດຕໍ່ຜ່ານຊ່ອງທາງດ້ານລຸ່ມນີ້.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-sm dark:bg-slate-900/40 dark:border-slate-800/80">
            <FontAwesomeIcon icon={faEnvelope} className="text-emerald-500 mt-1 text-lg dark:text-emerald-400" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
              <a href="mailto:zaiy.dev@gmail.com" className="text-slate-800 hover:text-emerald-500 transition-colors break-all dark:text-slate-200 dark:hover:text-emerald-400">zaiy.dev@gmail.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-sm dark:bg-slate-900/40 dark:border-slate-800/80">
            <FontAwesomeIcon icon={faPhone} className="text-emerald-500 mt-1 text-lg dark:text-emerald-400" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone&WA</p>
              <p className="text-slate-800 dark:text-slate-200">+856 20 55006901</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-sm dark:bg-slate-900/40 dark:border-slate-800/80">
            <FontAwesomeIcon icon={faLocationDot} className="text-emerald-500 mt-1 text-lg dark:text-emerald-400" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Location</p>
              <p className="text-slate-800 dark:text-slate-200">ນະຄອນຫຼວງວຽງຈັນ</p>
            </div>
          </div>
      </div>
    </div>
  );
}
