import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function NotificationBellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.106 2 4.896 5.053 4.702 8.943l-.169 3.378a1.998 1.998 0 0 1-.209.795l-1.133 2.266A1.997 1.997 0 0 0 3 16.191C3 17.19 3.81 18 4.81 18H7.1C7.563 20.282 9.581 22 12 22s4.437-1.718 4.9-4h2.291c1 0 1.809-.81 1.809-1.809a2 2 0 0 0-.191-.809l-1.133-2.266a2.01 2.01 0 0 1-.209-.795l-.169-3.378C19.104 5.053 15.894 2 12 2Zm0 18c-1.306 0-2.417-.835-2.829-2h5.658A3.002 3.002 0 0 1 12 20Z" />
    </svg>
  );
}

export function NotificationBatteryLowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h11a4.001 4.001 0 0 0 3.874-3h.626A2.5 2.5 0 0 0 23 13.5v-3A2.5 2.5 0 0 0 20.5 8h-.626A4.001 4.001 0 0 0 16 5H5Zm15 5v4h.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H20ZM6 9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function NotificationSuccessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm3.559 6.171a1 1 0 0 0-1.388.27l-3.698 5.493-1.766-1.766a1 1 0 0 0-1.414 1.414l2.625 2.625a1 1 0 0 0 1.536-.148l4.375-6.5a1 1 0 0 0-.27-1.388Z" />
    </svg>
  );
}
