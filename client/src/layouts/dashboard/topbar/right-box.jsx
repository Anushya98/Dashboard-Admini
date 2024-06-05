import bellIcon from "@/assets/icons/bell-icon.svg";
import msgNotificaitonIcon from "@/assets/icons/msg-notification.svg";

export default function Right() {
  return (
    <div className="flex items-center gap-8 pr-4">
      <img src={bellIcon} alt="icon" />
      <img src={msgNotificaitonIcon} alt="icon" />
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-gray-500"></div>
        <div className="text-center">
          <p>Welcome back!</p>
          <p className="font-bold">John</p>
        </div>
      </div>
    </div>
  );
}
