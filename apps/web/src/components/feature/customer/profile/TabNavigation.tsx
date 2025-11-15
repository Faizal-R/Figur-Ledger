import { FinledgerTheme } from '@/theme';

export type TabType = 'personal' | 'accounts';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'accounts', label: 'Accounts' },
  ];

  return (
    <div className={`${FinledgerTheme.card} ${FinledgerTheme.cardRounded} ${FinledgerTheme.border} p-2 mb-6`}>
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-3 ${FinledgerTheme.radius.md} font-semibold transition-all ${
              activeTab === tab.id
                ? `${FinledgerTheme.accent.gradient} ${FinledgerTheme.accent.glow} text-slate-900 scale-[1.02]`
                : `${FinledgerTheme.text.secondary} hover:bg-slate-800/50`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
