import { useState, useEffect, useRef } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = Math.ceil(numericValue / 40);
        const interval = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(current.toString());
          }
        }, 30);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl border border-gray-700/50 hover:border-[#00ff41]/50 transition-all duration-500 group cursor-pointer transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/5 to-[#00ff41]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative">
          <div className="text-5xl md:text-6xl font-bold text-[#00ff41] mb-3 font-mono group-hover:scale-105 transition-transform duration-300">
            {displayValue}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff41] transition-colors duration-300">
            {label}
          </h3>
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-[#00ff41]/10 rounded-full blur-2xl group-hover:bg-[#00ff41]/20 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default function Statistics() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentHeader = headerRef.current;
    if (currentHeader) {
      observer.observe(currentHeader);
    }

    return () => {
      if (currentHeader) {
        observer.unobserve(currentHeader);
      }
    };
  }, []);

  const stats = [
    {
      value: '38',
      label: 'Projects Completed',
      description: "We've successfully completed 38 top-tier projects.",
    },
    {
      value: '97%',
      label: 'Satisfied Customers',
      description: 'We maintain a 97% customer satisfaction rate across all engagements.',
    },
    {
      value: '3h+',
      label: 'Hours Saved Per Day',
      description: 'Our solutions save clients an average of 3 hours of work per day.',
    },
    {
      value: '£42k',
      label: 'Cost Saved Per Month',
      description: 'Our solutions help clients save an average of £42,000 per month.',
    },
  ];

  return (
    <section id="statistics" className="relative py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 transform ${
            isHeaderVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="text-[#00ff41]">Statistics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven results that demonstrate the transformative impact of our AI solutions across diverse industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
