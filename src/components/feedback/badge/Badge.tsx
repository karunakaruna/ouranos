interface Props {
  variant?: "block" | "inline" | "overlay";
  position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
  children: React.ReactNode;
}

export default function Badge(props: Props) {
  const { variant = "block", position, children } = props;

  const getVariantDisplay = () => {
    switch (variant) {
      case "block":
        return "block";
      case "overlay":
        return "absolute inline-flex items-center justify-center w-4 h-4";
      default:
        return "inline-flex items-center justify-center min-w-4 h-4 px-1";
    }
  };

  const getPosition = () => {
    switch (position) {
      case "topRight":
        return "-top-1 -right-1";
      case "topLeft":
        return "top-0 start-0";
      case "bottomRight":
        return "-bottom-2 -end-3";
      case "bottomLeft":
        return "-bottom-2 start-0";
      default:
        return "top-0 start-0";
    }
  };

  const calculatedVariant = getVariantDisplay();
  const calculatedPosition = getPosition();

  return (
    <div
      className={`${calculatedPosition} ${calculatedVariant} bg-skin-accent text-xs font-medium text-white animate-fade animate-duration-300`}
    >
      {children}
    </div>
  );
}
