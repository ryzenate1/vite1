import { FC } from 'react';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
  paragraph?: string;
  center?: boolean;
}

const SectionTitle: FC<SectionTitleProps> = ({ label, title, subtitle, paragraph, center = false }) => {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : ''}`}>
      <span className="text-primary font-medium mb-2">{label}</span>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
      {paragraph && <p className="text-gray-600 dark:text-gray-400">{paragraph}</p>}
    </div>
  );
};

export default SectionTitle;
