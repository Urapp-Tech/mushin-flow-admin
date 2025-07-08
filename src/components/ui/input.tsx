import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

type IconAdornment = {
  type?: 'icon';
  icon: LucideIcon;
};

type ButtonAdornment = {
  type: 'button';
  icon: LucideIcon;
  onClick: () => void;
};

type AdornmentType = IconAdornment | ButtonAdornment;

type InputProps = ComponentProps<'input'> & {
  startAdornment?: AdornmentType;
  endAdornment?: AdornmentType;
};

function Input({
  className,
  type,
  startAdornment,
  endAdornment,
  ...props
}: InputProps) {
  // Helper to render adornment (icon or button)
  const renderAdornment = (
    adornment?: AdornmentType,
    position: 'left' | 'right' = 'left'
  ) => {
    if (!adornment) return null;
    const { type = 'icon' } = adornment;
    if (type === 'button') {
      const { icon: ButtonIcon, onClick } = adornment as ButtonAdornment;
      return (
        <button
          className={cn(
            'tw:absolute tw:top-1/2 tw:m-0 tw:-translate-y-1/2 tw:transform tw:cursor-pointer tw:border-none tw:bg-transparent tw:p-0',
            position === 'left' && 'tw:left-1.5',
            position !== 'left' && 'tw:right-3'
          )}
          onClick={onClick}
          tabIndex={-1}
          type="button"
        >
          <ButtonIcon className="tw:text-muted-foreground" size={18} />
        </button>
      );
    }
    // default to icon
    const { icon: IconOnly } = adornment as IconAdornment;
    return (
      <div
        className={cn(
          'tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:transform',
          position === 'left' && 'tw:left-1.5',
          position !== 'left' && 'tw:right-3'
        )}
      >
        <IconOnly className="tw:text-muted-foreground" size={18} />
      </div>
    );
  };

  return (
    <div className="tw:relative tw:isolate tw:w-auto">
      {renderAdornment(startAdornment, 'left')}
      <input
        className={cn(
          'tw:flex tw:h-9 tw:w-full tw:min-w-0 tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-1 tw:text-base tw:shadow-xs tw:transition-[color,box-shadow] tw:outline-none tw:selection:bg-primary tw:selection:text-primary-foreground tw:file:inline-flex tw:file:h-7 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm tw:dark:bg-input/30',
          'tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50',
          'tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40',
          startAdornment && 'tw:pl-8',
          endAdornment && 'tw:pr-8',
          className
        )}
        data-slot="input"
        type={type}
        {...props}
      />
      {renderAdornment(endAdornment, 'right')}
    </div>
  );
}

export { Input };
