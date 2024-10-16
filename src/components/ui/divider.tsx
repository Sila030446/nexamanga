interface DividerProps {
  className?: string;
  title?: string;
}

const Divider = ({ className, title }: DividerProps) => {
  if (!title) {
    return <div className="h-[1px] w-full bg-muted-foreground"></div>;
  }
  return (
    <div className={`w-full flex gap-4 items-center ${className}`}>
      <div className="h-[1px] w-full bg-muted-foreground"></div>
      <p className="text-muted-foreground whitespace-nowrap">{title}</p>
      <div className="h-[1px] w-full bg-muted-foreground"></div>
    </div>
  );
};

export default Divider;
