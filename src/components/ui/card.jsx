export default function Card({ children, className, glass = true }) {
  return (
    <div className={`${glass ? 'glass-panel' : 'rounded-lg border border-border bg-card'} text-card-foreground shadow-sm ${className || ''}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, right }) {
  return (
    <div className={`flex items-center justify-between p-6 ${className || ''}`}>
      <div className="flex flex-col space-y-1.5">
        {children}
      </div>
      {right}
    </div>
  );
}
export function CardTitle({ children, className }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}>{children}</h3>;
}
export function CardContent({ children, className, contentRef }) {
  return <div ref={contentRef} className={`p-6 pt-0 ${className || ''}`}>{children}</div>;
}
