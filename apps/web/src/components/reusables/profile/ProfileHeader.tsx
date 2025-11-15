import { User as UserIcon, Mail, Phone, Calendar } from 'lucide-react';
import { FinledgerTheme } from '../../../theme';
import { IUser as User } from '@/types/user-account';
import { formatDate } from '@/utils/formats';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
 

  return (
    <div
      className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-8 mb-6 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="relative flex items-start gap-6">
        <div
          className={`w-24 h-24 ${FinledgerTheme.accent.gradient} ${FinledgerTheme.accent.glow} rounded-2xl flex items-center justify-center transition-all hover:scale-105`}
        >
          <UserIcon className="w-12 h-12 text-slate-900" strokeWidth={2.5} />
        </div>

        <div className="flex-1">
          <h1 className={`text-3xl font-bold ${FinledgerTheme.text.primary} mb-2`}>
            {user.personalInfo.firstName} {user.personalInfo.lastName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${FinledgerTheme.card} ${FinledgerTheme.radius.sm} ${FinledgerTheme.border}`}>
                <Mail className={`w-4 h-4 ${FinledgerTheme.text.secondary}`} />
              </div>
              <span className={FinledgerTheme.text.secondary}>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${FinledgerTheme.card} ${FinledgerTheme.radius.sm} ${FinledgerTheme.border}`}>
                <Phone className={`w-4 h-4 ${FinledgerTheme.text.secondary}`} />
              </div>
              <span className={FinledgerTheme.text.secondary}>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${FinledgerTheme.card} ${FinledgerTheme.radius.sm} ${FinledgerTheme.border}`}>
                <Calendar className={`w-4 h-4 ${FinledgerTheme.text.secondary}`} />
              </div>
              <span className={FinledgerTheme.text.secondary}>
                {formatDate(new Date(user.personalInfo.dateOfBirth))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
