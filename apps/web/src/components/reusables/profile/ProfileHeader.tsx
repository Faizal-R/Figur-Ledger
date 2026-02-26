"use client";
import { User as UserIcon, Mail, Phone, Calendar, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { IUser as User } from '@/types/user-account';
import { formatDate } from '@/utils/formats';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { theme: t, mode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-6 md:p-8 border mb-8",
        t.card.base,
        t.radius.md
      )}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={cn(
            "w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center border-2 border-slate-200 dark:border-white/10",
            mode === 'dark' ? "bg-white/5 text-[#c1ff72]" : "bg-slate-100 text-slate-900"
          )}>
            <UserIcon size={40} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm text-white">
             <BadgeCheck size={16} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <ShieldCheck size={12} className="text-green-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Verified Account</span>
                 </div>
              </div>
              <h1 className={cn("text-3xl md:text-4xl font-bold tracking-tight", t.text.heading)}>
                {user.personalInfo.firstName} {user.personalInfo.lastName}
              </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {[
               { icon: Mail, label: 'Email Address', val: user.email },
               { icon: Phone, label: 'Phone Number', val: user.phone },
               { icon: Calendar, label: 'Date of Birth', val: formatDate(new Date(user.personalInfo.dateOfBirth)) }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="text-slate-400">
                     <item.icon size={16} />
                  </div>
                  <div>
                     <p className={cn("text-[9px] font-bold uppercase tracking-wider opacity-40", t.text.muted)}>{item.label}</p>
                     <p className={cn("text-xs font-semibold truncate max-w-[180px]", t.text.heading)}>{item.val}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
