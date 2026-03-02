import { useInView } from '../hooks/useInView';

type Variant = 'fade-up' | 'fade-in' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale-up' | 'zoom-in' | 'rotate-in' | 'flip';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function AnimateOnScroll({ children, variant = 'fade-up', delay, className = '' }: AnimateOnScrollProps) {
  const { ref, isInView } = useInView({ threshold: 0.12 });
  const delayClass = delay !== undefined ? `aos-delay-${delay + 1}` : '';
  return (
    <div
      ref={ref}
      className={`aos-${variant} ${delayClass} ${isInView ? 'aos-animate' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
